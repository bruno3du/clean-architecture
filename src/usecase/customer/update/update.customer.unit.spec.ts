import Customer from "../../../domain/customers/entity/customer.entity";
import { CustomersFactory } from "../../../domain/customers/factory/customers.factory";
import Address from "../../../domain/customers/value-object/address";
import { UpdateCustomerUsecase } from "./update.customer.usecase";

const customer = CustomersFactory.create({
    name: "John doe",
    address: new Address({
        street: "street",
        number: 123,
        zipCode: "123456",
        city: "city",
        state: "state",
    })
})

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "street updated",
        number: 1234,
        zipCode: "123456",
        city: "city updated",
        state: "state updated",
    },
}

const output = new Customer({
    id: customer.id,
    name: "John Updated",
    address: new Address({
        street: "street updated",
        number: 1234,
        zipCode: "123456",
        city: "city updated",
        state: "state updated",
    })
})

const CustomerMockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn().mockResolvedValue(Promise.resolve(output)),
        update: jest.fn(),
    }
}

describe("Test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = CustomerMockRepository();
        await customerRepository.create(customer);
        const usecase = new UpdateCustomerUsecase(customerRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: customer.id,
            name: "John Updated",
            address: {
                street: "street updated",
                number: 1234,
                zipCode: "123456",
                city: "city updated",
                state: "state updated",
            },
        });
    })

    it("should throw an error when name is missing", async () => {
        const customerRepository = CustomerMockRepository();
        const usecase = new UpdateCustomerUsecase(customerRepository);

        await expect(usecase.execute({
            id: customer.id,
            name: "",
            address: input.address,
        })).rejects.toThrow("Name is required");

    })

    it("should throw an error when address is missing", async () => {
        const customerRepository = CustomerMockRepository();
        const usecase = new UpdateCustomerUsecase(customerRepository);

        await expect(usecase.execute({
            id: customer.id,
            name: input.name,
            address: undefined,
        })).rejects.toThrow("Address is required");
    })

    it("should throw an error when customer does not exist", async () => {
        const customerRepository = CustomerMockRepository();
        customerRepository.findOne = jest.fn().mockRejectedValue(new Error("Customer not found"));
        const usecase = new UpdateCustomerUsecase(customerRepository);
        input.id = "10"

        await expect(usecase.execute(input)).rejects.toThrow("Customer not found");
    })
})