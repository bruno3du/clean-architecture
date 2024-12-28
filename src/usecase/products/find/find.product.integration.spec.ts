import { Sequelize } from "sequelize-typescript";
import ProductB from "../../../domain/product/entity/product-b.entity";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import { FindProductUseCase } from "./find.product.usecase";


describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new ProductB({
            id: "1",
            name: "Product 1",
            price: 100,
        });

        ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        });

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: product.id,
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
    });

    it("should throw error when product is not found", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "2",
        };

        await expect(usecase.execute(input)).rejects.toThrowError(new Error("Product not found"));
    });
});
