import * as yup from "yup";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Product from "../entity/product.entity";

export class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().required("Price is required").min(0, "Price must be greater than 0"),
            });

            schema.validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price,
            }, {
                abortEarly: false
            });

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                error.errors.forEach((error) => {
                    entity.notification.addError({
                        context: "product",
                        message: error,
                    });
                })
            }
        }
    }
}
