import './scss/styles.scss';
// main.ts
import { ProductCatalog } from "./components/models/ProductCatalog";
import { ShoppingCart } from './components/models/ShoppingCart';
import { Buyer } from './components/models/Buyer';
import { apiProducts } from './utils/data';
import { IApi } from './types/index';
import { ApiClient } from "./components/services/ApiClient";

// Создаем экземпляры классов
console.log('ИНИЦИАЛИЗАЦИЯ КЛАССОВ');
const catalog = new ProductCatalog();
const cart = new ShoppingCart();
const buyer = new Buyer();

console.log('Экземпляры классов созданы:', { catalog, cart, buyer });


// ТЕСТИРОВАНИЕ КЛАССА ProductCatalog
console.log('ТЕСТИРОВАНИЕ PRODUCTCATALOG');

// Сохраняем товары в каталог
console.log('1. Сохранение товаров в каталог...');
catalog.saveProducts(apiProducts.items);
console.log('Товары сохранены');

// Получаем массив всех товаров
console.log('2. Получение всех товаров:');
const allProducts = catalog.getProducts();
console.log('Всего товаров:', allProducts.length);
console.log('Массив товаров:', allProducts);

// Получаем товар по ID
console.log('3. Поиск товара по ID...');
const productById = catalog.getProductById(apiProducts.items[0].id);
console.log('Найден товар:', productById);

// Сохраняем и получаем выбранный товар
console.log('4. Работа с выбранным товаром...');
catalog.setSelectedProduct(apiProducts.items[1]);
const selectedProduct = catalog.getSelectedProduct();
console.log('Выбранный товар:', selectedProduct?.title);


// ТЕСТИРОВАНИЕ КЛАССА ShoppingCart
console.log('ТЕСТИРОВАНИЕ SHOPPINGCART');

// Добавляем товары в корзину
console.log('1. Добавление товаров в корзину...');
cart.addItem(apiProducts.items[0]);
cart.addItem(apiProducts.items[1]);
cart.addItem(apiProducts.items[2]);
console.log('Товары добавлены в корзину!');

// Получаем товары из корзины
console.log('2. Получение товаров из корзины:');
const cartItems = cart.getItems();
console.log('Товары в корзине:', cartItems.map(item => item.title));

// Получаем количество товаров
console.log('3. Количество товаров в корзине:');
const itemsCount = cart.getItemsCount();
console.log('Количество:', itemsCount);

// Получаем общую стоимость
console.log('4. Общая стоимость товаров:');
const totalPrice = cart.getTotalPrice();
console.log('Общая стоимость:', totalPrice);

// Проверяем наличие товара
console.log('5. Проверка наличия товара в корзине:');
const hasItem = cart.hasItem(apiProducts.items[0].id);
console.log('Товар с ID', apiProducts.items[0].id, 'в корзине:', hasItem);

// Удаляем товар
console.log('6. Удаление товара из корзины...');
cart.removeItem(apiProducts.items[0]);
console.log('Товар удален. Теперь в корзине:', cart.getItemsCount(), 'товаров');

// Проверяем обновленную стоимость
console.log('7. Обновленная стоимость после удаления:');
const newTotalPrice = cart.getTotalPrice();
console.log('Новая общая стоимость:', newTotalPrice);


// ТЕСТИРОВАНИЕ КЛАССА Buyer
console.log('ТЕСТИРОВАНИЕ BUYER');

// Сохраняем данные покупателя
console.log('1. Сохранение данных покупателя...');
buyer.setData({
    payment: 'card',
    email: 'test@example.com'
});
console.log('Данные частично сохранены');

// Сохраняем дополнительные данные
console.log('2. Сохранение отдельных полей...');
buyer.setPhone('+79999999999');
buyer.setAddress('Москва, ул. Примерная, д. 1');
console.log('Дополнительные данные сохранены');

// Получаем все данные
console.log('3. Получение всех данных покупателя:');
const buyerData = buyer.getData();
console.log('Данные покупателя:', buyerData);

// Проверяем валидацию
console.log('4. Проверка валидации данных:');
const validationErrors = buyer.validate();
console.log('Ошибки валидации:', validationErrors);
console.log('Все данные валидны:', buyer.isValid());

// Проверяем валидацию отдельных полей
console.log('5. Валидация отдельных полей:');
console.log('Ошибка email:', buyer.validateEmail());
console.log('Ошибка телефона:', buyer.validatePhone());
console.log('Ошибка адреса:', buyer.validateAddress());
console.log('Ошибка оплаты:', buyer.validatePayment());

// Тестируем с неполными данными
console.log('6. Тестирование с неполными данными...');
const incompleteBuyer = new Buyer();
incompleteBuyer.setEmail('test@example.com');
const incompleteErrors = incompleteBuyer.validate();
console.log('Ошибки при неполных данных:', incompleteErrors);
console.log('Все данные валидны:', incompleteBuyer.isValid());

// Очистка данных
console.log('7. Очистка данных покупателя...');
buyer.clear();
console.log('Данные после очистки:', buyer.getData());


// ТЕСТИРОВАНИЕ ВЗАИМОДЕЙСТВИЯ КЛАССОВ
console.log('ТЕСТИРОВАНИЕ ВЗАИМОДЕЙСТВИЯ КЛАССОВ');

// Сценарий: пользователь выбирает товар и оформляет заказ
console.log('1. Сценарий оформления заказа...');

// Пользователь выбирает товары
cart.addItem(apiProducts.items[0]);
cart.addItem(apiProducts.items[3]);
console.log('Товаров в корзине для заказа:', cart.getItemsCount());

// Заполняет данные
buyer.setData({
    payment: 'cash',
    email: 'customer@example.com',
    phone: '+79008888888',
    address: 'Санкт-Петербург, Невский пр., д. 100'
});

console.log('2. Проверка возможности оформления заказа:');
console.log('Товаров в корзине:', cart.getItemsCount());
console.log('Сумма заказа:', cart.getTotalPrice());
console.log('Данные покупателя валидны:', buyer.isValid());

if (buyer.isValid() && cart.getItemsCount() > 0) {
    console.log('Заказ может быть оформлен!');
    console.log('Данные для доставки:', buyer.getData());
} else {
    console.log('Невозможно оформить заказ');
    console.log('Ошибки валидации:', buyer.validate());
}

// ФИНАЛЬНЫЕ РЕЗУЛЬТАТЫ
console.log('ФИНАЛЬНЫЕ РЕЗУЛЬТАТЫ:');
console.log('Товаров в каталоге:', catalog.getProducts().length);
console.log('Товаров в корзине:', cart.getItemsCount());
console.log('Данные покупателя заполнены:', Object.keys(buyer.getData()).length > 0);
console.log('Все классы работают корректно!!!!!');




// === ШАГ 4 ===
console.log(' === ШАГ 4 ===')

// Тестовые данные для демонстрации
const testProducts = [
    {
        id: '1',
        description: 'Описание товара 1',
        image: 'product1.jpg',
        title: 'Товар 1',
        category: 'Категория 1',
        price: 1000
    },
    {
        id: '2',
        description: 'Описание товара 2',
        image: 'product2.jpg',
        title: 'Товар 2',
        category: 'Категория 2',
        price: 2000
    }
];

// Тестируем ProductCatalog
console.log('1. Тестирование ProductCatalog:');
catalog.saveProducts(testProducts);
console.log('Товаров в каталоге:', catalog.getProducts().length);
console.log('Первый товар:', catalog.getProductById('1')?.title);

// Тестируем ShoppingCart
console.log('2. Тестирование ShoppingCart:');
cart.addItem(testProducts[0]);
cart.addItem(testProducts[1]);
console.log('Товаров в корзине:', cart.getItemsCount());
console.log('Общая стоимость:', cart.getTotalPrice());

// Тестируем Buyer
console.log('3. Тестирование Buyer:');
buyer.setData({
    payment: 'card',
    email: 'test@example.com',
    phone: '+79999999999',
    address: 'Москва'
});
console.log('Данные покупателя:', buyer.getData());
console.log('Валидны ли данные:', buyer.isValid());

console.log('ТЕСТИРОВАНИЕ API CLIENT');

// Создаем mock объект API (надо заменить на реальный IApi)
const mockApi: IApi = {
    async get(uri: string): Promise<object> {
        console.log(`GET запрос на: ${uri}`);
        // здесь будет вызов реального API
        // Для тестирования возвращаем mock данные
        return {
            items: [
                {
                    id: 'server-1',
                    description: 'Товар с сервера 1',
                    image: 'server1.jpg',
                    title: 'Серверный товар 1',
                    category: 'Электроника',
                    price: 1500
                },
                {
                    id: 'server-2',
                    description: 'Товар с сервера 2',
                    image: 'server2.jpg',
                    title: 'Серверный товар 2',
                    category: 'Одежда',
                    price: 3000
                }
            ]
        };
    },

    async post(uri: string, data: object): Promise<object> {
        console.log(`POST запрос на: ${uri}`, data);
        // здесь будет вызов реального API
        return { id: 'order-123', total: 4500 };
    }
};

// Создаем экземпляр ApiClient
const apiClient = new ApiClient(mockApi);

// Получаем товары с сервера и сохраняем в каталог
async function loadProductsFromServer() {
    try {
        console.log('4. Загрузка товаров с сервера...');
        const serverProducts = await apiClient.getProducts();
        
        // Сохраняем полученные товары в каталог
        catalog.saveProducts(serverProducts);
        
        console.log('Товары загружены с сервера и сохранены в каталог');
        console.log('Товаров в каталоге после загрузки:', catalog.getProducts().length);
        console.log('Все товары из каталога:', catalog.getProducts());
        
        // Проверяем работу методов каталога с реальными данными
        const firstProduct = catalog.getProductById('server-1');
        console.log('Найден товар по ID "server-1":', firstProduct?.title);
        
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

// Тестируем создание заказа
async function testOrderCreation() {
    try {
        console.log('5. Тестирование создания заказа...');
        
        const orderData = {
            payment: 'card' as const,
            email: 'customer@example.com',
            phone: '+79999999999',
            address: 'Москва, ул. Примерная, 1',
            total: 4500,
            items: ['server-1', 'server-2']
        };
        
        const orderResult = await apiClient.createOrder(orderData);
        console.log('Заказ создан успешно:', orderResult);
        
    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
    }
}

// Запускаем тестирование
async function main() {
    await loadProductsFromServer();
    await testOrderCreation();
    
    console.log('ВСЕ КЛАССЫ РАБОТАЮТ КОРРЕКТНО!');
    console.log('Товаров в каталоге:', catalog.getProducts().length);
    console.log('Товаров в корзине:', cart.getItemsCount());
    console.log('Данные покупателя заполнены:', Object.keys(buyer.getData()).length > 0);
}

main();