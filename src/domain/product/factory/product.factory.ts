import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b.entity";
import Product from "../entity/product.entity";
import { ProductInterface } from "../entity/product.interface";
import { ProductType } from "../enum/product.type.enum";

export default class ProductFactory {
  static create({
    type,
    name,
    price,
  }: {
    type: ProductType;
    name: string;
    price: number;
  }): ProductInterface {
    switch (type) {
      case ProductType.A:
        return new Product({ id: uuid(), name, price });
      case ProductType.B:
        return new ProductB({ id: uuid(), name, price });
      default:
        throw new Error("Invalid product type");
    }
  }
}
