import { MainMenu } from './enums';

const menuNameToRuName: Record<string, string> = {
  [MainMenu.Catalog]: 'Kаталог',
  [MainMenu.Warranties]: 'Гарантии',
  [MainMenu.About] : 'О компании',
  [MainMenu.Delivery]: 'Доставка'
};

export { menuNameToRuName };
