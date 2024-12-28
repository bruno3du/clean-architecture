export class InputCreateCustomerDto {
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
        state: string;
    };

    constructor(name: string, address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
        state: string;
    }) {
        this.name = name;
        this.address = address;
    }
}

export interface OutputCreateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
        state: string;
    };
}