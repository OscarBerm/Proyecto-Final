import request from "supertest";
import app from "../server.js";

describe("Operaciones CRUD de productos", () => {

  describe("GET /products/", () => {
    it("should return status 200", async () => {
      const res = await request(app).get("/products");
      expect(res.status).toBe(200);
    });

    it("should return an array with at least one object", async () => {
      const res = await request(app).get("/products");
      expect(Array.isArray(res.body.product)).toBe(true);
      expect(res.body.product.length).toBeGreaterThan(0);
    });
  });

  describe("GET /products/:id", () => {
    it("should return status 404 when the product does not exist", async () => {
      const fakeId = "00000000-0000-0000-0000-000000000000"; // UUID inválido
      const res = await request(app).get(`/products/${fakeId}`);
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Product not found");
    });
  });

  describe("PUT /products/:id", () => {
    it("should return status 404 when the id is not valid", async () => {
      const fakeId = "00000000-0000-0000-0000-000000000000";
      const updateData = {
        nombre: "Producto Actualizado",
        precio: 20
      };
      const res = await request(app)
        .put(`/products/${fakeId}`)
        .send(updateData);

      expect(res.status).toBe(404);
    });
  });

});
