export interface InputListCustomerDto {
}

export interface OutputListCustomerDto {
    customers: {
        id: string;
        name: string;
        address: {
            street: string;
            number: number;
            zipCode: string;
            city: string;
            state: string;
        }
    }[];
}
