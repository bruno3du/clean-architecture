import { ProductType } from "../../../domain/product/enum/product.type.enum";

export interface InputListProductDto {
    type: ProductType
}

export interface OutputListProductDto {
    products: {
        id: string;
        name: string;
        price: number;
    }[]
}
