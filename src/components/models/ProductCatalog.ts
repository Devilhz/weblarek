import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(private events: EventEmitter) {}

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit("products:changed");
  }
  getProducts(): IProduct[] {
    return this.products || [];
  }

  getProductById(id: string) {
    return this.products.find((product) => product.id === id);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit("selectedProduct:changed");
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
