import { IProduct } from "../../types/index";

// Класс корзины
export class ShoppingCart {
    private items: IProduct[] = [];

    // Получение товаров в корзине
    getItems(): IProduct[] {
        return this.items;
    }

    // Добавление товара в корзину
    addItem(product: IProduct): void {
        this.items.push(product);
    }

    // Удаление товара из корзины
    removeItem(product: IProduct): void {
        const index = this.items.findIndex(item => item.id === product.id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    // Очистка корзины
    clear(): void {
        this.items = [];
    }

    // Получение общей стоимости
    getTotalPrice(): number {
        return this.items.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);
    }

    // Получение количества товаров
    getItemsCount(): number {
        return this.items.length;
    }

    // Проверка наличия товара по id
    hasItem(productId: string): boolean {
        return this.items.some(item => item.id === productId);
    }
}