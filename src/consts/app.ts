import { MainMenu } from './enums';

const DEBOUNCE_TIMEOUT = 300;
const LOCAL_STORAGE_BASKET = 'LOCAL_STORAGE_BASKET';
const MAX_BASKET_PRODUCTS = 99;
const MIN_BASKET_PRODUCTS = 1;

const menuNameToRuName: Record<string, string> = {
  [MainMenu.Catalog]: 'Kаталог',
  [MainMenu.Warranties]: 'Гарантии',
  [MainMenu.About]: 'О компании',
  [MainMenu.Delivery]: 'Доставка',
  [MainMenu.Basket]: 'Корзина'
};

export { menuNameToRuName, DEBOUNCE_TIMEOUT, LOCAL_STORAGE_BASKET, MIN_BASKET_PRODUCTS, MAX_BASKET_PRODUCTS };
