import { Status } from '../../consts/enums';
import productSlice, { fetchProduct, fetchSimilarProducts, initialState } from './product-slice';
import { createFakeCamera } from '../../utiils/mock';

describe('Slice: product', () => {
  it('without additional parameters should return initial state', () => {
    expect(productSlice(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should update product upon loading from the server', () => {
    const product = createFakeCamera();

    expect(productSlice(initialState, {
      type: fetchProduct.fulfilled.type,
      payload: product
    }))
      .toEqual(
        {
          ...initialState,
          productStatus: {
            code: '',
            status: Status.Success
          },
          product
        });
  });

  it('should set productStatus to loading', () => {
    expect(productSlice(initialState, { type: fetchProduct.pending.type }))
      .toEqual({ ...initialState, productStatus: { status: Status.Loading, code: '' } });
  });

  it('should set productStatus to error', () => {
    expect(productSlice(initialState, { type: fetchProduct.rejected.type }))
      .toEqual({ ...initialState, productStatus: { status: Status.Error, code: '' } });
  });

  it('should update similarProducts upon loading from the server', () => {
    const products = [createFakeCamera()];

    expect(productSlice(initialState, {
      type: fetchSimilarProducts.fulfilled.type,
      payload: products
    }))
      .toEqual(
        {
          ...initialState,
          similarProductStatus: {
            code: '',
            status: Status.Success
          },
          similarProducts: products
        });
  });

  it('should set similarProductStatus to loading', () => {
    expect(productSlice(initialState, { type: fetchSimilarProducts.pending.type }))
      .toEqual({ ...initialState, similarProductStatus: { status: Status.Loading, code: '' } });
  });

  it('should set similarProductStatus to error', () => {
    expect(productSlice(initialState, { type: fetchSimilarProducts.rejected.type }))
      .toEqual({ ...initialState, similarProductStatus: { status: Status.Error, code: '' } });
  });
});
