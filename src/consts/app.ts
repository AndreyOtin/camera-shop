import { MainMenu } from './enums';

const DEBOUNCE_TIMEOUT = 300;

const menuNameToRuName: Record<string, string> = {
  [MainMenu.Catalog]: 'Kаталог',
  [MainMenu.Warranties]: 'Гарантии',
  [MainMenu.About]: 'О компании',
  [MainMenu.Delivery]: 'Доставка'
};

export { menuNameToRuName, DEBOUNCE_TIMEOUT };
