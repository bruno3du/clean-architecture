import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Product from "../entity/product.entity";
import { ProductYupValidator } from "../validator/product.yup.validator";

export class ProductValidatorFactory {
    static create<T = Product>(): ValidatorInterface<T | Product> {
        return new ProductYupValidator();
    }
}
