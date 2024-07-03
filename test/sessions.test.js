import * as chai from "chai";
import supertest from "supertest";
import { entorno } from "../src/config/dotenv.config.js";
import mongoose from "mongoose";

mongoose.connect(entorno.mongoUrl);
const expect = chai.expect;
const requester = supertest(`http://localhost:${entorno.port}/api/sessions`);

describe("Test de api sessions, preentrega coder:", () => {
  beforeEach(function () {
    this.timeout(5000);
  });

  it("El test debera iniciar sesion correctamente", async function () {
    const { statusCode, ok, _body } = await requester.post("/login").send({
      email: "adminCoder@coder.com",
      password: "adminCod3er123",
    });
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body.status).to.equal("success");
    expect(_body.payload).to.have.property("first_name");
    expect(_body.payload).to.have.property("last_name");
    expect(_body.payload).to.have.property("email");
    expect(_body.payload).to.have.property("age");
    expect(_body.payload).to.have.property("role");
  });

  it("El test debera cerrar la sesion correctamente", async function () {
    const { statusCode, ok, _body } = await requester.delete("/logout");
    expect(statusCode).to.equal(200);
    expect(ok).to.equal(true);
    expect(_body.status).to.equal("success");
  });

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

  after(async function () {
    const user = await mongoose.connection
      .collection("users")
      .findOne({ email: "test@test.com" });
    await mongoose.connection
      .collection("carts")
      .deleteMany({ _id: user.cart });
    await mongoose.connection
      .collection("users")
      .deleteMany({ email: "test@test.com" });
  });
});
