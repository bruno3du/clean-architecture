import { ProductType } from "../enum/product.type.enum";
import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create({
      type: ProductType.A,
      name: "Product 1",
      price: 100,
    });
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create({
      type: ProductType.B,
      name: "Product 1",
      price: 100,
    });
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw error when type is invalid", () => {
    expect(() => {
      ProductFactory.create({
        // @ts-expect-error - This is an invalid type
        type: "c",
        name: "Product 1",
        price: 100,
      });
    }).toThrowError("Invalid product type");
  });
});
