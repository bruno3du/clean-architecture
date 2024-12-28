import { ProductType } from "../../../domain/product/enum/product.type.enum";
import { CreateProductUseCase } from "./create.product.usecase";

const MockProductRespository = () => {
    return {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Test create product use case", () => {
    it("should create a product type b", async () => {
        const productRepository = MockProductRespository();
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            type: ProductType.B,
            name: "Product 1",
            price: 100,
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100,
        });
    });

    it("should create a product type a", async () => {
        const productRepository = MockProductRespository();
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            type: ProductType.A,
            name: "Product 1",
            price: 100,
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100,
        });
    });

    it("should throw error when type is invalid", async () => {
        const productRepository = MockProductRespository();
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            type: "c" as const,
            name: "Product 1",
            price: 100,
        };


        // @ts-expect-error - This is an invalid type
        await expect(usecase.execute(input)).rejects.toThrowError("Invalid product type");
    });

    it("should throw error when name is missing", async () => {
        const productRepository = MockProductRespository();
        const usecase = new CreateProductUseCase(productRepository);
        const input = {
            type: ProductType.A,
            name: "",
            price: 100,
        };

        await expect(usecase.execute(input)).rejects.toThrowError("Name is required");
    });
});
