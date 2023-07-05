export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success'
}

export enum SliceNameSpace {
  Catalog = 'catalog',
  Product = 'product',
  Comments = 'comments',
  Basket = 'basket'
}

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Product = '/catalog/:product',
  Basket = '/catalog/basket'
}

export enum ApiRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders'
}

export enum MainMenu {
  Catalog = 'catalog',
  Delivery = 'delivery',
  Warranties = 'warranties',
  About = 'about',
  Basket = 'basket'
}

export enum StatusCode {
  NotFound = '404',
  BadRequest = '400'
}

export enum SearchParam {
  Page = 'page',
  Tab = 'tab',
  Category = 'category',
  Level = 'level',
  Type = 'type',
  SortType = 'sort-type',
  SortDirection = 'sort-direction',
  PriceMin = 'min-price',
  PriceMax = 'max-price'
}

export enum SortType {
  Popular = 'rating',
  Price = 'price',
  Up = 'up',
  Down = 'down'
}

export enum MaxElementCount {
  Reviews = 3,
  ProductCard = 9
}

export enum Code {
  ShiftLeft = 'ShiftLeft',
  Tab = 'Tab',
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape'
}
