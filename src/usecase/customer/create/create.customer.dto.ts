export interface InputCreateCustomerDto {
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
        state: string;
    };
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