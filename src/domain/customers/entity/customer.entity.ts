import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import { CustomerValidatorFactory } from "../factory/customer.validator.factory";
import Address from "../value-object/address";

interface CustomerProps {
  id: string;
  name: string;
  address: Address;
}

export default class Customer extends Entity {
  private _name: string;
  private _address: Address;
  private _active = false;
  private _rewardPoints = 0;

  constructor(props: CustomerProps) {
    super();
    this._id = props.id;
    this._name = props.name;
    this._address = props.address;

    this.validate();
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get isActive(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set address(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      this.notification.addError({
        message: "Address is mandatory to activate a customer",
        context: "customer"
      })

      throw new NotificationError(this.notification.errors)
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
