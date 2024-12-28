import { CustomersFactory } from "../../../domain/customers/factory/customers.factory";
import CustomerRepositoryInterface from "../../../domain/customers/repository/customer.repository";
import Address from "../../../domain/customers/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export default class CreateCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) { }

    async execute(input?: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomersFactory.create({
            name: input.name,
            address: new Address({
                city: input.address.city,
                number: input.address.number,
                state: input.address.state,
                street: input.address.street,
                zipCode: input.address.zipCode,
            })
        })

        await this.customerRepository.create(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address.city,
                number: customer.address.number,
                state: customer.address.state,
                street: customer.address.street,
                zipCode: customer.address.zipCode,
            }
        }
    }
}