import { CDN_URL } from "../../../utils/constants.ts";
import { ensureElement } from "../../../utils/utils.ts";
import { Card, ICardActions } from "./Card.ts";

interface ICardPreview {
    image: string;
    description: string;
    buttonText: string;
    category: string;
    title: string;
    price: string | number | null;
}

export class CardPreview extends Card<ICardPreview> {
    protected _cardImage: HTMLImageElement;
    protected _cardText: HTMLElement;
    protected _cardButton: HTMLButtonElement;
    protected _category: HTMLElement;

    constructor(protected container: HTMLElement,protected actions?: ICardActions) {
        super(container);
        
        this._cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
        this._cardText = ensureElement<HTMLElement>('.card__text', this.container);
        this._cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this._category = ensureElement<HTMLElement>('.card__category', this.container);
        
        if (actions?.onClick) {
            this._cardButton.addEventListener('click', actions.onClick);
        }
    }

   set image(value: string) {
      this._cardImage.src = `${CDN_URL}${value}`;
      this._cardImage.alt = "Product image";
    }

    set description(value: string) {
        this._cardText.textContent = value;
    }

    set buttonText(value: string) {
        this._cardButton.textContent = value;
    }

    set category(value: string) {
        this._category.textContent = value;
    }
}