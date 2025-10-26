import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _content: HTMLElement;
  protected modalCloseButton: HTMLButtonElement;
  protected _isOpen: boolean = false;

  constructor(protected events: IEvents, protected container: HTMLElement) {
    super(container);

    this._content = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );
    this.modalCloseButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );

    this.modalCloseButton.addEventListener("click", () => {
      this.events.emit("modal:close");
    });

    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.isOpen = false;
      }
    });
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  set isOpen(value: boolean) {
    this._isOpen = value;
    this.container.classList.toggle("modal_active", value);
  }
}
