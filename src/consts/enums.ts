export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success'
}

export enum SliceNameSpace {
  Catalog = 'catalog',
  Product = 'product',
  Comments = 'comments'
}

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Product = '/catalog/:product'
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
  About = 'about'
}

export enum StatusCode {
  NotFound = '404',
  BadRequest = '400'
}

export enum SearchParam {
  Page = 'page',
  Tab = 'tab'
}

export enum MaxElementCount {
  Reviews = 3,
  ProductCard = 9
}
