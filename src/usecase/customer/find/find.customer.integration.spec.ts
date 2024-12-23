import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import Customer from "../../../domain/customers/entity/customer.entity";
import Address from "../../../domain/customers/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer.model";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
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
});
