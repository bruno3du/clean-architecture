import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer.entity";
import { CustomerYupValidator } from "../validator/customer.yup.validator";

export class CustomerValidatorFactory {
    static create = (): ValidatorInterface<Customer> => new CustomerYupValidator();
}
