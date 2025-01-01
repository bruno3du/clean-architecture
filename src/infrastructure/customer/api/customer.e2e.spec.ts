import request from "supertest";
import { app, sequelize } from "../../api/express";
describe("E2E: Customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customer = {
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zipCode: "Zipcode 1",
                city: "City 1",
                state: "State 1",
            },
        };

        const response = await request(app).post("/customer").send(customer);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zipCode: "Zipcode 1",
                city: "City 1",
                state: "State 1",
            },
        });
    });

    it("should not create a customer with invalid data", async () => {
        const customer = {
            name: "",
            address: {
                street: "Street 1",
                number: 1,
                zipCode: "Zipcode 1",
                city: "City 1",
                state: "State 1",
            },
        };

        const response = await request(app).post("/customer").send(customer);
        expect(response.status).toBe(500);
    });

    it("should not create a customer with invalid address", async () => {
        const customer = {
            name: "Customer 1",
            address: {
                street: "",
                number: 1,
                zipCode: "Zipcode 1",
                city: "City 1",
                state: "State 1",
            },
        };

        const response = await request(app).post("/customer").send(customer);
        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        const customer = {
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zipCode: "Zipcode 1",
                city: "City 1",
                state: "State 1",
            },
        };

        const response = await request(app).post("/customer").send(customer);
        expect(response.status).toBe(201);

        const response2 = await request(app).post("/customer").send(customer);
        expect(response2.status).toBe(201);

        const responseList = await request(app).get("/customer").send();

        expect(responseList.status).toBe(200);
        expect(responseList.body.customers).toHaveLength(2);
        expect(responseList.body.customers[0]).toEqual({
            id: expect.any(String),
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zipCode: "Zipcode 1",
                city: "City 1",
                state: "State 1",
            },
        });
    });

    it("should return list using xml format when header request", async () => {
        const customer = {
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zipCode: "Zipcode 1",
                city: "City 1",
                state: "State 1",
            },
        };

        const response = await request(app).post("/customer").send(customer);
        expect(response.status).toBe(201);

        const response2 = await request(app).post("/customer").send(customer);
        expect(response2.status).toBe(201);

        const responseList = await request(app).get("/customer").set("Accept", "application/xml").send();
        expect(responseList.status).toBe(200);
        expect(responseList.headers["content-type"]).toBe("application/xml; charset=utf-8");
        expect(responseList.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(responseList.text).toContain(`<customers>`);
        expect(responseList.text).toContain(`<customer>`);
        expect(responseList.text).toContain(`<id>${response.body.id}</id>`);
        expect(responseList.text).toContain(`<name>${response.body.name}</name>`);
        expect(responseList.text).toContain(`<address>`);
        expect(responseList.text).toContain(`<street>${response.body.address.street}</street>`);
        expect(responseList.text).toContain(`<number>${response.body.address.number}</number>`);
        expect(responseList.text).toContain(`<zipCode>${response.body.address.zipCode}</zipCode>`);
        expect(responseList.text).toContain(`<city>${response.body.address.city}</city>`);
        expect(responseList.text).toContain(`<state>${response.body.address.state}</state>`);
        expect(responseList.text).toContain(`</address>`);
        expect(responseList.text).toContain(`</customer>`);
        expect(responseList.text).toContain(`</customers>`);
    });
});