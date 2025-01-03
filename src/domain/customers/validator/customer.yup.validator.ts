import * as yup from "yup";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer.entity";


export class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),

            });

            schema.validateSync({
                name: entity.name,
                id: entity.id,
            }, {
                abortEarly: false
            });

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                error.errors.forEach((error) => {
                    entity.notification.addError({
                        context: "customer",
                        message: error,
                    });
                })
            }
        }
    }

}