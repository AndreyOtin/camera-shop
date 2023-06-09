import { createFakeCamera, createFakeComment, createFakeNewCommentBody, createFakePromo } from '../utiils/mock';
import { createMockStoreWithAPI } from '../utiils/jest';
import { ApiRoute } from '../consts/enums';
import { getCameras, getCamerasFull, getPromo, initPage } from '../store/catalog-slice/catalog-slice';
import { fetchComments, postComment } from '../store/comments-slice/comments-slice';
import { fetchProduct } from '../store/product-slice/product-slice';
import { checkCoupon, postOrder } from '../store/basket-slice/basket-slice';

const { fakeStore: store, mockAPI } = createMockStoreWithAPI({});

describe('Async actions', () => {
  it('should dispatch getCameras when GET /cameras', async () => {
    const fakeCameras = [createFakeCamera()];

    mockAPI
      .onAny()
      .reply(200, fakeCameras);

    store.clearActions();

    await store.dispatch(getCameras());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getCameras.pending.type,
      getCamerasFull.pending.type,
      initPage.type,
      getCameras.fulfilled.type
    ]);
  });

  it('should dispatch getCamerasFull when GET /cameras', async () => {
    const fakeCameras = [createFakeCamera()];

    mockAPI
      .onAny()
      .reply(200, fakeCameras);

    store.clearActions();

    await store.dispatch(getCamerasFull());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getCamerasFull.pending.type,
      getCamerasFull.fulfilled.type
    ]);
  });

  it('should dispatch getPromo when GET /promo', async () => {
    const fakePromo = [createFakePromo()];

    mockAPI
      .onGet(ApiRoute.Promo)
      .reply(200, fakePromo);

    store.clearActions();

    await store.dispatch(getPromo());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getPromo.pending.type,
      getPromo.fulfilled.type
    ]);
  });


  it('should dispatch fetchComments when GET /cameras/id/reviews', async () => {
    const fakeComment = [createFakeComment()];
    const fakeId = '1';

    mockAPI
      .onGet(`${ApiRoute.Cameras}/${fakeId}/reviews`)
      .reply(200, fakeComment);

    store.clearActions();

    await store.dispatch(fetchComments(fakeId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchComments.pending.type,
      fetchComments.fulfilled.type
    ]);
  });

  it('should dispatch postComment when Post /reviews', async () => {
    const fakeComment = [createFakeComment()];
    const body = createFakeNewCommentBody();

    mockAPI
      .onPost(ApiRoute.Reviews)
      .reply(200, fakeComment);

    store.clearActions();

    await store.dispatch(postComment(body));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postComment.pending.type,
      getCamerasFull.pending.type,
      postComment.fulfilled.type
    ]);
  });

  it('should dispatch fetchProduct when GET /cameras/id', async () => {
    const fakeCamera = createFakeCamera();
    const fakeId = '1';

    mockAPI
      .onGet(`${ApiRoute.Cameras}/${fakeId}`)
      .reply(200, fakeCamera);

    store.clearActions();

    await store.dispatch(fetchProduct(fakeId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchProduct.pending.type,
      fetchProduct.rejected.type
    ]);
  });

  it('should dispatch postOrder when post /order', async () => {
    mockAPI
      .onPost(ApiRoute.Orders)
      .reply(200);

    store.clearActions();

    await store.dispatch(postOrder({
      camerasIds: [1],
      coupon: 'test'
    }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postOrder.pending.type,
      postOrder.fulfilled.type
    ]);
  });

  it('should dispatch checkCoupon when post /coupon', async () => {
    mockAPI
      .onPost(ApiRoute.Coupons)
      .reply(200);

    store.clearActions();

    await store.dispatch(checkCoupon('test'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkCoupon.pending.type,
      checkCoupon.fulfilled.type
    ]);
  });
});
