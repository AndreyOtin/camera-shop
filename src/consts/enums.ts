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
  Catalog = '/catalog/:page',
  Product = '/catalog/product/:id'
}

export enum StatusCode {
  NotFound = '404'
}
