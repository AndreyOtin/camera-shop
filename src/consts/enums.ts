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

export enum StatusCode {
  NotFound = '404'
}

export enum SearchParam {
  Page = 'page'
}
