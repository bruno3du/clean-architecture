import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.findOne(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}