import ProductB from "../../../domain/product/entity/product-b.entity";
import { FindProductUseCase } from "./find.product.usecase";

const ProductMockRepository = () => {
    return {
        findOne: jest.fn().mockResolvedValue(Promise.resolve({
            id: "1",
            name: "Product 1",
            price: 100,
        })),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    };
}

describe("Test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = ProductMockRepository();
        const product = new ProductB({
            id: "1",
            name: "Product 1",
            price: 100,
        });
        productRepository.findOne = jest.fn().mockResolvedValue(product);

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "1",
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
    });

    it("should throw error when product is not found", async () => {
        const productRepository = ProductMockRepository();
        productRepository.findOne = jest.fn().mockRejectedValue(new Error("Product not found"));

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "2",
        };

        await expect(usecase.execute(input)).rejects.toThrowError(new Error("Product not found"));
    });
});
