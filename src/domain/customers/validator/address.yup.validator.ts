import * as yup from "yup";
import NotificationError from "../../@shared/notification/notification.error";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Address from "../value-object/address";

export class AddressYupValidator implements ValidatorInterface<Address> {
    validate(address: Address): void {
        try {
            const schema = yup.object().shape({
                street: yup.string().required("Street is required"),
                number: yup.number().required("Number is required"),
                zipCode: yup.string().required("Zip code is required"),
                city: yup.string().required("City is required"),
                state: yup.string().required("State is required"),
            });

            schema.validateSync(address, {
                abortEarly: false,
            });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                throw new NotificationError(error.errors.map(
                    (error) => ({
                        context: "address",
                        message: error,
                    })
                ));
            }

        }
    }
}
