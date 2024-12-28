import request from "supertest";
import { app, sequelize } from "../../api/express";

describe("E2E: Product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const product = {
            type: "a",
            name: "Product 1",
            price: 100,
        };

        const response = await request(app).post("/product").send(product);
        expect(response.status).toBe(201);
    });

    it("should list all products", async () => {
        const response = await request(app).get("/product").send();
        expect(response.status).toBe(200);
        expect(response.body.products).toBeDefined();
    });

    it("should find a product by id", async () => {
        const product = {
            type: "a",
            name: "Product 1",
            price: 100,
        };

        const createResponse = await request(app).post("/product").send(product);
        const productId = createResponse.body.id;

        const findResponse = await request(app).get(`/product/${productId}`).send();
        expect(findResponse.status).toBe(200);
        expect(findResponse.body).toEqual({
            id: productId,
            name: "Product 1",
            price: 100,
        });
    });

    it("should update a product", async () => {
        const product = {
            type: "a",
            name: "Product 1",
            price: 100,
        };

        const createResponse = await request(app).post("/product").send(product);
        const productId = createResponse.body.id;

        const updatedProduct = {
            name: "Product 1 Updated",
            price: 150,
        };

        const updateResponse = await request(app).put(`/product/${productId}`).send(updatedProduct);
        
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toEqual({
            id: productId,
            name: "Product 1 Updated",
            price: 150,
        });
    });

});

