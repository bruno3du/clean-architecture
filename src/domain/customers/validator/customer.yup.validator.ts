import * as yup from "yup";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer.entity";


export class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                address: yup.object().shape({
                    street: yup.string().required("Street is required"),
                    number: yup.number().required("Number is required"),
                    zipCode: yup.string().required("Zip code is required"),
                    city: yup.string().required("City is required"),
                    state: yup.string().required("State is required"),
                })
            });

            schema.validateSync({
                name: entity.name,
                id: entity.id,
                address: {
                    street: entity.address.street,
                    number: entity.address.number,
                    zipCode: entity.address.zipCode,
                    city: entity.address.city,
                    state: entity.address.state,
                }
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