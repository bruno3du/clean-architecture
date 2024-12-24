import { InputListProductDto, OutputListProductDto } from "./list.product.dto";
import { ListProductUsecase } from "./list.product.usecase";


const MockProductRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockResolvedValue(Promise.resolve([
            { id: "1", name: "Product 1", price: 100, stock: 10 },
            { id: "2", name: "Product 2", price: 200, stock: 20 },
        ])),
        findOne: jest.fn(),
        update: jest.fn(),
    };
};


describe("List product use case unit tests", () => {
    it("should list all products", async () => {
        const productRepository = MockProductRepository();
        const usecase = new ListProductUsecase(productRepository);
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



