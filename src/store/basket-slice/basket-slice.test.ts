import { createFakeCamera } from '../../utiils/mock';
import { Status } from '../../consts/enums';
import basketSlice, {
  addCameraToBasket,
  changeCount,
  changePromoStatus,
  checkCoupon,
  decreaseCount,
  increaseCount,
  initialState,
  productsAdapter,
  removeCameraFromBasket,
  resetBasket
} from './basket-slice';


const camera = createFakeCamera();
const mockState = productsAdapter.addOne(productsAdapter.getInitialState({
  ...initialState,
  total: 1,
  totalCount: 1,
  totalWithCoupon: 1,
  couponStatus: Status.Success
}), {
  ...camera,
  count: 1,
  totalPrice: 1
});

describe('Slice: basket', () => {
  it('without additional parameters should return initial state', () => {
    expect(basketSlice(mockState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(mockState);
  });

  it('should get coupon upon loading from the server', () => {
    expect(basketSlice(mockState, {
      type: checkCoupon.fulfilled.type,
      payload: {
        couponPercent: '15',
        coupon: 'test'
      }
    }))
      .toEqual(
        {
          ...mockState,
          couponPercent: 15,
          couponName: 'test',
          couponStatus: Status.Success,
        });
  });

  it('should reject coupon upon loading from the server', () => {
    expect(basketSlice(mockState, {
      type: checkCoupon.rejected.type,
    }))
      .toEqual(
        {
          ...mockState,
          couponStatus: Status.Error,
        });
  });


  it('should add camera to basket when dispatch addCameraToBasket', () => {
    const product = createFakeCamera();
    product.id = 2;
    const newState = productsAdapter.addOne(mockState, { ...product, count: 1, totalPrice: camera.price });

    expect(basketSlice(mockState, addCameraToBasket(product)))
      .toEqual({ ...newState, total: 2, totalCount: 2, totalWithCoupon: 2 });
  });

  it('should increase product count on dispatch increaseCount', () => {
    const newState = productsAdapter.upsertOne(mockState, { ...camera, count: 2, totalPrice: 2 });

    expect(basketSlice(mockState, increaseCount(camera)))
      .toEqual({ ...newState, total: 2, totalCount: 2, totalWithCoupon: 2 });
  });

  it('should decrease product count on dispatch decreaseCount', () => {
    const newState = productsAdapter.upsertOne(mockState, { ...camera, count: 0, totalPrice: 0 });

    expect(basketSlice(mockState, decreaseCount(camera)))
      .toEqual({ ...newState, total: 0, totalCount: 0, totalWithCoupon: 0 });
  });

  it('should change product count on dispatch changeCount', () => {
    const newState = productsAdapter.upsertOne(mockState, { ...camera, count: 5, totalPrice: 5 });

    expect(basketSlice(mockState, changeCount({ id: 1, count: 5 })))
      .toEqual({ ...newState, total: 5, totalCount: 5, totalWithCoupon: 5 });
  });

  it('should remove product count on dispatch removeCameraFromBasket', () => {
    const newState = productsAdapter.removeOne(mockState, 1);

    expect(basketSlice(mockState, removeCameraFromBasket(camera)))
      .toEqual({ ...newState, total: 0, totalCount: 0, totalWithCoupon: 0 });
  });

  it('should reset state', () => {
    const newState = productsAdapter.removeOne(mockState, 1);

    expect(basketSlice(mockState, resetBasket()))
      .toEqual({ ...newState, total: 0, totalCount: 0, totalWithCoupon: 0, couponStatus:  Status.Idle });
  });

  it('should change coupon status', () => {
    expect(basketSlice(mockState, changePromoStatus()))
      .toEqual({ ...mockState, couponStatus: Status.Idle });
  });
});
