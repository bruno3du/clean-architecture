import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";
import { ListProductUsecase } from "./list.product.usecase";




describe("List product use case unit tests", () => {
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


    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUsecase(productRepository);


        await ProductModel.create({
            id: "1",
            name: "Product 1",
            price: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            price: 200,
        });

        const input: InputListProductDto = {};

        const output: OutputListProductDto = await usecase.execute(input);

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe("1");
        expect(output.products[0].name).toBe("Product 1");
        expect(output.products[0].price).toBe(100);
        expect(output.products[1].id).toBe("2");
        expect(output.products[1].name).toBe("Product 2");
        expect(output.products[1].price).toBe(200);
    });
});



