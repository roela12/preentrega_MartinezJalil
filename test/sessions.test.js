import * as chai from "chai";
import supertest from "supertest";
import { entorno } from "../src/config/dotenv.config.js";
import mongoose from "mongoose";
import { validateToken } from "../src/utils.js";

mongoose.connect(entorno.mongoUrl);
const expect = chai.expect;
const requester = supertest(`http://localhost:${entorno.port}/api/sessions`);

describe("Test de api sessions, preentrega coder:", () => {
  after(async function () {
    mongoose.connect(entorno.mongoUrl);
    const user = await mongoose.connection
      .collection("users")
      .findOne({ email: "test@test.com" });
    // borro el carrito del usuario creado en el test
    await mongoose.connection
      .collection("carts")
      .deleteMany({ _id: user.cart });
    // borro el usuario creado para el test
    await mongoose.connection
      .collection("users")
      .deleteMany({ email: "test@test.com" });
    await mongoose.connection.close();
  });

  describe("POST /api/sessions/login", () => {
    it("El test debera iniciar sesion correctamente", async function () {
      const userMock = {
        email: "rodri@mail.com",
        password: "12345",
      };
      const { statusCode, ok, _body } = await requester
        .post("/login")
        .send(userMock);
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body.status).to.equal("success");
      expect(_body.payload).to.have.property("first_name");
      expect(_body.payload).to.have.property("last_name");
      expect(_body.payload).to.have.property("email");
      expect(_body.payload).to.have.property("age");
      expect(_body.payload).to.have.property("role");
      expect(_body.payload).to.be.an("object");
      const result = await requester.post("/login").send({
        email: "rodri@mail.com",
        password: "12345",
      });
      const decoded = validateToken(result.headers.authorization);
      expect(decoded.item.email).to.equal(userMock.email);
      expect(decoded.item).to.have.property("first_name");
      expect(decoded.item).to.have.property("last_name");
      expect(decoded.item).to.have.property("email");
      expect(decoded.item).to.have.property("age");
      expect(decoded.item).to.have.property("role");
      expect(decoded.item).to.be.an("object");
    });
  });

  describe("DELETE /api/sessions/logout", () => {
    it("El test debera cerrar la sesion correctamente", async function () {
      const { statusCode, ok, _body } = await requester.delete("/logout");
      expect(statusCode).to.equal(200);
      expect(ok).to.equal(true);
      expect(_body.status).to.equal("success");
    });
  });

  describe("POST /api/sessions/register", () => {
    it("El test debera registrar un usuario correctamente", async function () {
      const userMock = {
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        age: 21,
        password: "12345",
      };
      const { statusCode, ok, _body } = await requester
        .post("/register")
        .send(userMock);
      expect(statusCode).to.equal(201);
      expect(ok).to.equal(true);
      expect(_body.status).to.equal("success");
    });
  });
});
