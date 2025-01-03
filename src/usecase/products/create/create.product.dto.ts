import { ProductType } from "../../../domain/product/enum/product.type.enum";

export interface InputCreateProductDto {
    type: ProductType;
    name: string;
    price: number;
}

export interface OutputCreateProductDto {
    id: string;
    name: string;
    price: number;
}
