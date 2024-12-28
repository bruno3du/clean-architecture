import { ProductType } from "../../../domain/product/enum/product.type.enum";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const ProductMockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn().mockResolvedValue(Promise.resolve({
            id: "1",
            name: "Product 1",
            price: 100,
        })),
        update: jest.fn(),
    }
}


describe("Update product use case unit tests", () => {
    it("should update a product type b", async () => {
        const productRepository = ProductMockRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const input: InputUpdateProductDto = {
            type: ProductType.B,
            id: "1",
            name: "Product 1 Updated",
        };

        const output: OutputUpdateProductDto = await usecase.execute(input);

        expect(output).toEqual({
            id: "1",
            name: "Product 1 Updated",
            price: 100,
        });
    });

    it("should throw error when product does not exist", async () => {
        const productRepository = ProductMockRepository();
        productRepository.findOne = jest.fn().mockRejectedValue(new Error('Product not found'));
        const usecase = new UpdateProductUseCase(productRepository);


        const input: InputUpdateProductDto = {
            type: ProductType.B,
            id: "2",
            name: "Product 2 Updated",
        };

        await expect(usecase.execute(input)).rejects.toThrowError(new Error('Product not found'));
    });
});
