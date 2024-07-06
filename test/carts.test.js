import * as chai from "chai";
import supertest from "supertest";
import { entorno } from "../src/config/dotenv.config.js";

const expect = chai.expect;
const requester = supertest(`http://localhost:${entorno.port}/api/cart`);

// El carrito usado en estos test es un carrito exclusivo para pruebas

describe("Test de api carts, preentrega coder", () => {
  describe("GET /api/cart/:cid", () => {
    it("El endpoint debera mostrar un carrito", async function () {
      const { statusCode, ok, _body } = await requester.get(
        "/664c125ada0e1750a05f0dcd"
      );
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body).to.have.property("_id");
      expect(_body).to.have.property("products");
      expect(_body).to.be.an("object");
      expect(_body.products).to.be.an("array");
      expect(_body._id).to.be.a("string");
    });
  });

  describe("DELETE /api/cart/:cid", () => {
    it("El endpoint debera borrar todos los productos de un carrito", async function () {
      const { statusCode, ok, _body } = await requester.delete(
        "/664c125ada0e1750a05f0dcd"
      );
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body).to.have.property("products").with.lengthOf(0);
      expect(_body).to.be.an("object");
      expect(_body.products).to.be.an("array");
      expect(_body._id).to.be.a("string");
    });
  });

  describe("PUT /api/cart/:cid", () => {
    it("El endpoint debera actualizar todos los productos de un carrito", async function () {
      const newProducts = [
        {
          product: "65fc9530a871cb4361ad5880",
          quantity: 3,
          _id: "6688465107bd1db7c87ae8ec",
        },
        {
          product: "65fc8e66aa2f5f6dcef524f8",
          quantity: 2,
          _id: "6688466307bd1db7c87ae8f9",
        },
      ];
      const { statusCode, ok, _body } = await requester
        .put("/664c125ada0e1750a05f0dcd")
        .send(newProducts);
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body)
        .to.have.property("products")
        .with.lengthOf(newProducts.length);
      expect(_body).to.be.an("object");
      expect(_body.products).to.be.an("array");
      expect(_body._id).to.be.a("string");
    });
  });
});
