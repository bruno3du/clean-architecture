import { ProductType } from "../../../domain/product/enum/product.type.enum";

export interface InputUpdateProductDto {
    type: ProductType;
    id: string;
    name?: string;
    price?: number;
}

export interface OutputUpdateProductDto {
    id: string;
    name: string;
    price: number;
}
