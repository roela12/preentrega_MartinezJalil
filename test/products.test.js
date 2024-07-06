import * as chai from "chai";
import supertest from "supertest";
import { entorno } from "../src/config/dotenv.config.js";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest(`http://localhost:${entorno.port}`);
let token;

describe("Test de api products, preentrega coder:", () => {
  before(async function () {
    // saco el token para los endpoints que necesitan autorizacion
    const result = await requester.post("/api/sessions/login").send({
      email: "adminCoder@coder.com",
      password: "adminCod3er123",
    });
    token = result.headers.authorization;
  });

  after(async function () {
    // borro el producto creado para el test
    mongoose.connect(entorno.mongoUrl);
    await mongoose.connection
      .collection("products")
      .deleteMany({ code: "codigoprueba789" });
    await mongoose.connection.close();
    await requester.delete("/api/sessions/logout");
  });

  describe("GET /api/products", () => {
    it("El endpoint debera mostrar los productos", async function () {
      const { statusCode, ok, _body } = await requester.get("/api/products");
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      _body.docs.forEach((element) => {
        expect(element).to.have.property("_id");
        expect(element).to.have.property("title");
        expect(element).to.have.property("description");
        expect(element).to.have.property("code");
        expect(element).to.have.property("category");
        expect(element).to.have.property("brand");
        expect(element).to.have.property("price");
        expect(element).to.have.property("stock");
        expect(element).to.have.property("thumbnails");
        expect(element).to.be.an("object");
      });
      expect(_body.docs).to.be.an("array");
    });
  });

  describe("POST /api/products", () => {
    it("El endpoint debera agregar un producto", async function () {
      const productMock = {
        title: "Producto de prueba",
        description: "Descripcion de prueba",
        code: "codigoprueba789",
        category: "Categoria de prueba",
        brand: "Marca de prueba",
        price: 1000,
        stock: 10,
      };
      const { statusCode, ok, _body } = await requester
        .post("/api/products")
        .set("authorization", token)
        .send(productMock);
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body).to.have.property("_id");
      expect(_body).to.have.property("title");
      expect(_body).to.have.property("description");
      expect(_body).to.have.property("code");
      expect(_body).to.have.property("category");
      expect(_body).to.have.property("brand");
      expect(_body).to.have.property("price");
      expect(_body).to.have.property("stock");
      expect(_body).to.have.property("thumbnails");
      expect(_body).to.be.an("object");
    });
  });

  describe("/api/products/:pid", () => {
    it("El endpoint PUT debera actualizar un producto", async function () {
      // El producto actualizado es exclusivo para pruebas
      const productMock = {
        title: "Producto de prueba actualizado",
        description: "Descripcion de prueba",
        code: "123456",
        category: "Categoria de prueba",
        brand: "Marca de prueba",
        price: 1000,
        stock: 10,
      };
      const { statusCode, ok, _body } = await requester
        .put("/api/products/65fc955aa871cb4361ad5891")
        .set("authorization", token)
        .send(productMock);
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body).to.be.an("object");
      expect(_body).to.have.property("acknowledged");
      expect(_body).to.have.property("modifiedCount");
      expect(_body).to.have.property("upsertedId");
      expect(_body).to.have.property("upsertedCount");
      expect(_body).to.have.property("matchedCount");
    });
  });
});
