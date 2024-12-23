import Customer from "../../../domain/customers/entity/customer.entity";
import Address from "../../../domain/customers/value-object/address";
import { ListCustomerUsecase } from "./list.customer.usecase";

const customer01 = new Customer({
    id: "1",
    name: "Customer 1",
    address: new Address({
        street: "Street 1",
        number: 1,
        zipCode: "Zipcode 1",
        city: "City 1",
        state: "State 1",
    }),
});

const customer02 = new Customer({
    id: "2",
    name: "Customer 2",
    address: new Address({
        street: "Street 2",
        number: 2,
        zipCode: "Zipcode 2",
        city: "City 2",
        state: "State 2",
    }),
});

const CustomerMockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockResolvedValue(Promise.resolve([customer01, customer02])),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test list customer use case", () => {
    it("should list all customers", async () => {
        const customerRepository = CustomerMockRepository();

        const usecase = new ListCustomerUsecase(customerRepository);
        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe("1");
        expect(output.customers[0].name).toBe("Customer 1");
        expect(output.customers[0].address.street).toBe("Street 1");
        expect(output.customers[0].address.number).toBe(1);
        expect(output.customers[0].address.zipCode).toBe("Zipcode 1");
        expect(output.customers[0].address.city).toBe("City 1");
        expect(output.customers[0].address.state).toBe("State 1");
        expect(output.customers[1].id).toBe("2");
        expect(output.customers[1].name).toBe("Customer 2");
        expect(output.customers[1].address.street).toBe("Street 2");
        expect(output.customers[1].address.number).toBe(2);
        expect(output.customers[1].address.zipCode).toBe("Zipcode 2");
        expect(output.customers[1].address.city).toBe("City 2");
        expect(output.customers[1].address.state).toBe("State 2");
    });
});
