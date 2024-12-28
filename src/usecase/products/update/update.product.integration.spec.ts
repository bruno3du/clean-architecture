import { Sequelize } from "sequelize-typescript";
import { ProductType } from "../../../domain/product/enum/product.type.enum";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";


describe("Update product use case unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product type b", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const input: InputUpdateProductDto = {
            type: ProductType.B,
            id: "1",
            name: "Product 1 Updated",
            price: 100,
        };

        await ProductModel.create({
            id: input.id,
            name: input.name,
            price: input.price,
        });

        const output: OutputUpdateProductDto = await usecase.execute(input);

        expect(output).toEqual({
            id: "1",
            name: "Product 1 Updated",
            price: 100,
        });
    });

    it("should throw error when product does not exist", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const input: InputUpdateProductDto = {
            type: ProductType.B,
            id: "2",
            name: "Product 2 Updated",
        };

        await expect(usecase.execute(input)).rejects.toThrowError(new Error('Product not found'));
    });
});
