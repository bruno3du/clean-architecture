import ProductFactory from "../../../domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create({
            type: input.type,
            name: input.name,
            price: input.price,
        });



        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
