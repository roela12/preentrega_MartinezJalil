import * as chai from "chai";
import supertest from "supertest";
import { entorno } from "../src/config/dotenv.config.js";

const expect = chai.expect;
const requester = supertest(`http://localhost:${entorno.port}/api/cart`);

describe("Test de api carts, preentrega coder", () => {
  beforeEach(function () {
    this.timeout(5000);
  });

  it("El endpoint GET /api/cart/:cid debera mostrar un carrito", async function () {
    const { statusCode, ok, _body } = await requester.get(
      "/664c125ada0e1750a05f0dcd"
    );
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body).to.have.property("_id");
    expect(_body).to.have.property("products");
  });

  it("El endpoint DELETE /api/cart/:cid debera borrar todos los productos de un carrito", async function () {
    const { statusCode, ok, _body } = await requester.delete(
      "/664c125ada0e1750a05f0dcd"
    );
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body).to.have.property("products").with.lengthOf(0);
  });

  it("El endpoint PUT /api/cart/:cid debera actualizar todos los productos de un carrito", async function () {
    const newProducts = [];
    const { statusCode, ok, _body } = await requester
      .put("/664c125ada0e1750a05f0dcd")
      .send(newProducts);
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body)
      .to.have.property("products")
      .with.lengthOf(newProducts.length);
  });
});
