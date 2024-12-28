import ProductB from "../../../domain/product/entity/product-b.entity";
import Product from "../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository";
import ProductModel from "../sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {

  async create(entity: Product | ProductB): Promise<void> {
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
  async findAll({ type = "a" }: { type?: "a" | "b" }): Promise<Product[] | ProductB[]> {
    const products = await ProductModel.findAll();

    if (type === "a") {
      return products.map((product) => {
        return new Product({
          id: product.id,
          name: product.name,
          price: product.price,
        });
      });
    }

    return products.map((product) => {
      return new ProductB({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    });
  }
  async update(entity: Product | ProductB): Promise<void> {
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
