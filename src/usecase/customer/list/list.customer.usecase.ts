import CustomerRepositoryInterface from "../../../domain/customers/repository/customer.repository";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export class ListCustomerUsecase {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) { }

    async execute(input?: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return {
            customers: customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zipCode: customer.address.zipCode,
                    city: customer.address.city,
                    state: customer.address.state,
                },
            })),
        };
    }
}
