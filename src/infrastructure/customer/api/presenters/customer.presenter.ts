import { toXML, XmlOptions } from "jstoxml";
import { OutputListCustomerDto } from "../../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static toXML(data: OutputListCustomerDto): string {
        const xmlOptions: XmlOptions = {
            header: true,
            indent: "  ",
            _selfCloseTag: true,
        };

        return toXML({
            customers: {
                customer: data.customers.map((customer) => ({
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zipCode: customer.address.zipCode,
                        city: customer.address.city,
                        state: customer.address.state,
                    },
                }))
            },
        }, xmlOptions);
    }
}