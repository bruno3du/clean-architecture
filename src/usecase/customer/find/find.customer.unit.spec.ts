import Customer from "../../../domain/customers/entity/customer.entity";
import Address from "../../../domain/customers/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = {
  id: "123",
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
    findOne: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}


describe("Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = CustomerMockRepository();
    customerRepository.create(
      new Customer({
        id: "123",
        name: "John doe",
        address: new Address({
          city: "city",
          street: "street",
          number: 123,
          state: "state",
          zipCode: "123456",
        }),
      })
    );

    const input = {
      id: "123",
    };

    const usecase = new FindCustomerUseCase(customerRepository);
    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: "123",
      name: "John doe",
      address: {
        street: "street",
        number: 123,
        zipCode: "123456",
        city: "city",
        state: "state",
      },
    });
  });

  it("should throw error when customer is not found", async () => {
    const customerRepository = CustomerMockRepository();

    customerRepository.findOne.mockImplementation(() => {
      throw new Error("Customer not found");
    })

    const input = {
      id: "321",
    };

    const usecase = new FindCustomerUseCase(customerRepository);

    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  }
  )
});
