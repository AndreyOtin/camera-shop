export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success'
}

export enum SliceNameSpace {
  Catalog = 'catalog',
}

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/:page'
}
