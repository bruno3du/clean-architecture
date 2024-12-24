import Product from "../../../domain/product/entity/product-b.entity";
import { ProductInterface } from "../../../domain/product/entity/product.interface";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository";
import ProductModel from "../sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }
  async findOne(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });

    if (!product) {
      throw new Error("Product not found");
    }

    return new Product({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }
  async findAll(): Promise<ProductInterface[]> {
    const products = await ProductModel.findAll();

    return products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
      };
    });
  }
  async update(entity: ProductInterface): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: { id: entity.id },
      }
    );
  }
}
