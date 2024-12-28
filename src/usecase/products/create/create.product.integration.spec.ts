import { Sequelize } from "sequelize-typescript";
import { ProductType } from "../../../domain/product/enum/product.type.enum";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";

describe("Create product use case integration tests", () => {
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

    it("should create a product type b", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input: InputCreateProductDto = {
            type: ProductType.B,
            name: "Product 1",
            price: 100,
        };

        const output: OutputCreateProductDto = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100,
        });

        const productModel = await ProductModel.findOne({ where: { id: output.id } });

        expect(productModel.id).toBe(output.id);
        expect(productModel.name).toBe("Product 1");
        expect(productModel.price).toBe(100);
    });

    it("should create a product type a", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input: InputCreateProductDto = {
            type: ProductType.A,
            name: "Product 1",
            price: 100,
        };

        const output: OutputCreateProductDto = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 100,
        });

        const productModel = await ProductModel.findOne({ where: { id: output.id } });

        expect(productModel.id).toBe(output.id);
        expect(productModel.name).toBe("Product 1");
        expect(productModel.price).toBe(100);
    });

    it("should throw error when type is invalid", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = {
            type: "c" as const,
            name: "Product 1",
            price: 100,
        };


        // @ts-expect-error - This is an invalid type
        await expect(createProductUseCase.execute(input)).rejects.toThrow("Invalid product type");

        const productModel = await ProductModel.findOne({ where: { name: "Product 1" } });

        expect(productModel).toBeNull();
    });

    it("should throw error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = {
            type: ProductType.B,
            name: "",
            price: 100,
        };

        await expect(createProductUseCase.execute(input)).rejects.toThrow("product: Name is required");

        const productModel = await ProductModel.findOne({ where: { price: 100 } });

        expect(productModel).toBeNull();
    });


});
