import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";
export class Cart {
  static getItemsCount(): number {
    throw new Error("Method not implemented.");
  }
 
  private items: IProduct[];

  constructor(private events: EventEmitter) {
    this.items = [];
  }
  getItems(): IProduct[] {
    return [...this.items];
  }

  isProductInCart(productId: string): boolean {
    return this.items.some((item) => item.id === productId);
  }

  addItem(product: IProduct): void {
    if (!this.isProductInCart(product.id)) {
      this.items.push(product);
      this.events.emit("cart:changed", {
        items: this.items,
        total: this.getTotalPrice(),
      });
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.id !== productId);
    this.events.emit("cart:changed", {
      items: this.items,
      total: this.getTotalPrice(),
    });
  }

  clear(): void {
    this.items = [];
    this.events.emit("cart:cleared");
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price || 0), 0);
  }

  getItemsCount(): number {
    return this.items.length;
  }
}