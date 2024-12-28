import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUsecase {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll({
            type: input.type,
        });
        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}
