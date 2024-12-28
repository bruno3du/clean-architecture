import ProductB from "../../../domain/product/entity/product-b.entity";
import Product from "../../../domain/product/entity/product.entity";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product.repository";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) { }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const foundProduct = await this.productRepository.findOne(input.id);


        if (!foundProduct) {
            throw new Error("Product not found");
        }

        let product: Product | ProductB


        if (input.type === "b") {
            product = new ProductB(foundProduct);
        } else {
            product = new Product(foundProduct);
        }


        if (input.name) {
            product.changeName(input.name);
        }

        if (input.price !== undefined) {
            product.updatePrice(input.price);
        }

        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}

export default UpdateProductUseCase;

