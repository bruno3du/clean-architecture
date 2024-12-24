export interface InputListProductDto {
    name?: string;
    price?: number;
    stock?: number;
}

export interface OutputListProductDto {
    products: {
        id: string;
        name: string;
        price: number;
    }[]
}
