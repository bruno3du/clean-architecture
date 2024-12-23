import CreateCustomerUseCase from "./create.customer.usecase"

const customer = {
    name: "John doe",
    address: {
        street: "street",
        number: 123,
        zipCode: "123456",
        city: "city",
        state: "state",
    },
}

const CustomerMockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = CustomerMockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);
        const output = await usecase.execute(customer);

        expect(output).toEqual({
            id: expect.anything(),
            name: "John doe",
            address: {
                street: "street",
                number: 123,
                zipCode: "123456",
                city: "city",
                state: "state",
            },
        });
    })

    it("should throw an error when name is missing", async () => {
        const customerRepository = CustomerMockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);


        await expect(usecase.execute({
            name: "",
            address: customer.address,
        })).rejects.toThrow("Name is required");

    })
})

