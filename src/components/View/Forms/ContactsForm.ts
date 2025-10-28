import { ensureElement } from "../../../utils/utils.ts";
import { IEvents } from "../../base/Events";
import { Buyer } from "../../models/Buyer.ts";
import { Form } from "./Form.ts";

export class ContactsForm extends Form {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement, private buyer: Buyer) {
    super(events, container, "contacts");

    this._emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this._phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );

    this._emailInput.addEventListener("input", () => {
      this.events.emit("contacts:email", { email: this._emailInput.value });
    });

    this._phoneInput.addEventListener("input", () => {
      this.events.emit("contacts:phone", { phone: this._phoneInput.value });
    });
  }

  set email(value: string) {
    this._emailInput.value = value;
  }

  set phone(value: string) {
    this._phoneInput.value = value;
  }

  setErrors(errors: string[]): void {
    this.errors = errors.join(", ");
  }

  setValid(valid: boolean): void {
    this.valid = valid;
  }
}