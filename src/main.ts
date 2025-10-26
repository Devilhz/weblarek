import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/services/ApiClient";
import { ProductCatalog } from "./components/models/ProductCatalog.ts";
import { CardCatalog } from "./components/View/Cards/CardCatalog.ts";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Gallery } from "./components/View/Gallery.ts";
import { EventEmitter } from "./components/base/Events";
import { Modal } from "./components/View/Modal.ts";
import { IProduct, TPayment } from "./types";
import { CardPreview } from "./components/View/Cards/CardPreview.ts";
import { Basket } from "./components/View/Basket.ts";
import { Cart } from "./components/models/ShoppingCart.ts";
import { Header } from "./components/View/Header";
import { CardBasket } from "./components/View/Cards/CardBasket.ts";
import { OrderForm } from "./components/View/Forms/OrderForm.ts";
import { Buyer } from "./components/models/Buyer";
import { ContactsForm } from "./components/View/Forms/ContactsForm.ts";
import { OrderModalSuccess } from "./components/View/OrderSuccess.ts";

const events = new EventEmitter();
const apiClient = new ApiClient(API_URL);
const productsModel = new ProductCatalog(events);
const gallery = new Gallery(events, ensureElement(".page"));
const modal = new Modal(events, ensureElement("#modal-container"));
const header = new Header(events, ensureElement(".header"));
const cart = new Cart(events);
const buyer = new Buyer(events);
const basket = new Basket(
  events,
  cloneTemplate(ensureElement<HTMLTemplateElement>("#basket"))
);
const orderForm = new OrderForm(
  events,
  cloneTemplate(ensureElement<HTMLTemplateElement>("#order")),
  buyer
);
const contactsForm = new ContactsForm(
  events,
  cloneTemplate(ensureElement<HTMLTemplateElement>("#contacts")),
  buyer
);
const orderSuccess = new OrderModalSuccess(
  events,
  cloneTemplate(ensureElement<HTMLTemplateElement>("#success"))
);

events.on("cart:changed", () => {
  header.counter = cart.getItemsCount();
});

events.on("basket:open", () => {
  const items = cart.getItems();

  if (items.length === 0) {
    basket.render({
      items: [],
      total: 0,
      disabled: true,
    });
  } else {
    const basketItems = items.map((item, index) => {
      const cardBasket = new CardBasket(
        cloneTemplate(ensureElement<HTMLTemplateElement>("#card-basket")),
        {
          onClick: () => events.emit("basket:remove", item),
        }
      );

      return cardBasket.render({
        title: item.title,
        price: item.price || 0,
        index: index + 1,
      });
    });

    basket.render({
      items: basketItems,
      total: cart.getTotalPrice(),
      disabled: false,
    });
  }

  modal.content = basket.render();
  modal.isOpen = true;
});
events.on("modal:close", () => {
  modal.isOpen = false;
});

events.on("basket:remove", (item: IProduct) => {
  cart.removeItem(item.id);
});

events.on("products:changed", () => {
  gallery.render({
    items: productsModel.getProducts().map((item) =>
      new CardCatalog(
        cloneTemplate(ensureElement<HTMLTemplateElement>("#card-catalog")),
        {
          onClick: () => events.emit("card:select", item),
        }
      ).render(item)
    ),
  });
});

events.on("card:select", (item: IProduct) => {
  productsModel.setSelectedProduct(item);
});

events.on("selectedProduct:changed", () => {
  const selectedProduct = productsModel.getSelectedProduct();

  if (selectedProduct) {
    const cardPreview = new CardPreview(
      cloneTemplate(ensureElement<HTMLTemplateElement>("#card-preview")),
      {
        onClick: () => {
          if (cart.isProductInCart(selectedProduct.id)) {
            events.emit("basket:remove", selectedProduct);
            modal.isOpen = false;
          } else {
            events.emit("product:addToCart", selectedProduct);
          }
        },
      }
    );

    modal.content = cardPreview.render({
      title: selectedProduct.title,
      price: selectedProduct.price || 0,
      category: selectedProduct.category || "",
      image: selectedProduct.image || "",
      description: selectedProduct.description || "",
      buttonText: cart.isProductInCart(selectedProduct.id)
        ? "Удалить из корзины"
        : "В корзину",
    });

    modal.isOpen = true;
  }
});

events.on("product:addToCart", (item: IProduct) => {
  cart.addItem(item);
  modal.isOpen = false;
});

events.on("basket:order", () => {
  modal.content = orderForm.render();
  modal.isOpen = true;
});

events.on("order:submit", () => {
  modal.content = contactsForm.render();
  modal.isOpen = true;
});

events.on("contacts:submit", () => {
  const orderData = {
    ...buyer.getData(),
    items: cart.getItems().map((item) => item.id),
    total: cart.getTotalPrice(),
  };

  apiClient
    .createOrder(orderData)
    .then(() => {
      modal.content = orderSuccess.render({
        total: cart.getTotalPrice(),
      });

      cart.clear();
      buyer.clear();
    })
    .catch((error) => {
      console.error("Ошибка оформления заказа:", error);
    });
});

apiClient
  .getProducts()
  .then((products) => productsModel.setProducts(products))
  .catch((error) => console.error("Ошибка загрузки:", error));

events.on("orderSuccess:close", () => {
  modal.isOpen = false;
  header.counter = 0;
});

events.on("order:payment", (data: { payment: TPayment }) => {
  buyer.setData({ payment: data.payment });
});

events.on("order:address", (data: { address: string }) => {
  buyer.setData({ address: data.address });
});

events.on("contacts:email", (data: { email: string }) => {
  buyer.setData({ email: data.email });
});

events.on("contacts:phone", (data: { phone: string }) => {
  buyer.setData({ phone: data.phone });
});

events.on("BuyerData:changed", () => {
  buyer.getData();
  orderForm.render();
  contactsForm.render();
});
