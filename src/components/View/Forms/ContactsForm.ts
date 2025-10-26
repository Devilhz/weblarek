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

    events.on("BuyerData:changed", () => {
      this.updateFormState();
    });
  }

  private updateFormState(): void {
    const errors = this.buyer.validate();

    const contactErrors: string[] = [];
    if (errors.email) contactErrors.push(errors.email);
    if (errors.phone) contactErrors.push(errors.phone);

    this.errors = contactErrors.join(", ");
    this.valid = contactErrors.length === 0;
  }

  set email(value: string) {
    this._emailInput.value = value;
    this.events.emit("contacts:email", { email: value });
  }

  set phone(value: string) {
    this._phoneInput.value = value;
    this.events.emit("contacts:phone", { phone: value });
  }
}