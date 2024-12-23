import CustomerRepositoryInterface from "../../../domain/customers/repository/customer.repository";
import Address from "../../../domain/customers/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export class UpdateCustomerUsecase {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) { }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.findOne(input.id);

        if (!input.address) {
            throw new Error("Address is required");
        }

        customer.changeAddress(new Address(input.address));
        customer.changeName(input.name);

        await this.customerRepository.update(customer);

        const userUpdated = await this.customerRepository.findOne(input.id);

        return {
            id: userUpdated.id,
            name: userUpdated.name,
            address: {
                street: userUpdated.address.street,
                number: userUpdated.address.number,
                zipCode: userUpdated.address.zipCode,
                city: userUpdated.address.city,
                state: userUpdated.address.state,
            },
        };
    }
}