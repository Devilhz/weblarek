import { IProduct } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants.ts";
import { ensureElement } from "../../../utils/utils.ts";
import { Card, ICardActions } from "./Card";


type CategoryKey = keyof typeof categoryMap;
export type TCardCatalog = Pick<IProduct, "image" | "category">;

export class CardCatalog extends Card<TCardCatalog> {
  protected imgElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions: ICardActions) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );

    this.imgElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set image(value: string) {
    this.imgElement.src = `${CDN_URL}${value}`;
    this.imgElement.alt = "Product image";
  }
}