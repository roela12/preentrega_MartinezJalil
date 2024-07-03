import * as chai from "chai";
import supertest from "supertest";
import { entorno } from "../src/config/dotenv.config.js";

const expect = chai.expect;
const requester = supertest(`http://localhost:${entorno.port}`);

describe("Test de api products, preentrega coder:", () => {
  beforeEach(function () {
    this.timeout(5000);
  });

  before(async function () {
    await requester.post("/api/sessions/login").send({
      email: "adminCoder@coder.com",
      password: "adminCod3er123",
    });
  });

  after(async function () {
    await requester.delete("/api/sessions/logout");
  });

  it("El endpoint GET /api/products debera mostrar los productos", async function () {
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
    });
  });

  it("El endpoint POST /api/products debera agregar un producto", async function () {
    const productMock = {
      title: "Producto de prueba",
      description: "Descripcion de prueba",
      code: "123456789",
      category: "Categoria de prueba",
      brand: "Marca de prueba",
      price: 1000,
      stock: 10,
    };
    const { statusCode, ok, _body } = await requester
      .post("/api/products")
      .send(productMock);
    // expect(statusCode).to.equal(200);
    // expect(ok).to.equal(true);
    console.log(statusCode);
    console.log(ok);
    console.log(_body);
  });

  it("El endpoint PUT /api/products/:pid debera actualizar un producto", async function () {
    const productMock = {
      title: "Producto de prueba",
      description: "Descripcion de prueba",
      code: "123456789",
      category: "Categoria de prueba",
      brand: "Marca de prueba",
      price: 1000,
      stock: 10,
    };
    const { statusCode, ok, _body } = await requester
      .post("/api/products/66060255baff25d3cedca2f4")
      .send(productMock);
    // expect(statusCode).to.equal(200);
    // expect(ok).to.equal(true);
    console.log(statusCode);
    console.log(ok);
    console.log(_body);
  });
});
