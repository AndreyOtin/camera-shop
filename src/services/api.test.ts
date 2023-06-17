import { createFakeCamera, createFakeComment, createFakeNewCommentBody, createFakePromo } from '../utiils/mock';
import { createMockStoreWithAPI } from '../utiils/jest';
import { ApiRoute } from '../consts/enums';
import { getCameras, getPromo } from '../store/catalog-slice/catalog-slice';
import { fetchComments, postComment } from '../store/comments-slice/comments-slice';
import { fetchProduct, fetchSimilarProducts } from '../store/product-slice/product-slice';

const { fakeStore: store, mockAPI } = createMockStoreWithAPI({});

describe('Async actions', () => {
  it('should dispatch getCameras when GET /cameras', async () => {
    const fakeCameras = [createFakeCamera()];

    mockAPI
      .onGet(ApiRoute.Cameras)
      .reply(200, fakeCameras);

    store.clearActions();

    await store.dispatch(getCameras());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      getCameras.pending.type,
      getCameras.fulfilled.type
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
      fetchProduct.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarProducts when GET /cameras/id/similar', async () => {
    const similarProducts = [createFakeCamera()];
    const fakeId = '2';

    mockAPI
      .onGet(`${ApiRoute.Cameras}/${fakeId}/similar`)
      .reply(200, similarProducts);

    store.clearActions();

    await store.dispatch(fetchSimilarProducts(fakeId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarProducts.pending.type,
      fetchSimilarProducts.fulfilled.type
    ]);
  });
});