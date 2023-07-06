import { BasketCamera, Camera, Promo } from '../types/camera';
import * as faker from 'faker';
import { NewReview, Review } from '../types/review';
import { RootState } from '../types/store';
import { SliceNameSpace, Status } from '../consts/enums';

import { createEntityAdapter } from '@reduxjs/toolkit';

const productsAdapter = createEntityAdapter<BasketCamera>();

const createFakeCamera = (): Camera => ({
  type: faker.lorem.word(1),
  name: faker.lorem.word(1),
  category: faker.lorem.word(1),
  vendorCode: faker.lorem.word(1),
  previewImg2x: faker.lorem.word(1),
  previewImg: faker.lorem.word(1),
  previewImgWebp2x: faker.lorem.word(1),
  previewImgWebp: faker.lorem.word(1),
  level: faker.lorem.word(1),
  description: faker.lorem.word(1),
  price: faker.datatype.number(3),
  id: faker.datatype.number(3),
  reviewCount: faker.datatype.number(3),
  rating: 3
});

const createFakePromo = (): Promo => ({
  name: faker.lorem.word(1),
  previewImg2x: faker.lorem.word(1),
  previewImg: faker.lorem.word(1),
  previewImgWebp2x: faker.lorem.word(1),
  previewImgWebp: faker.lorem.word(1),
  id: faker.datatype.number(3),
});

const createFakeComment = (): Review => ({
  createAt: faker.lorem.word(1),
  id: faker.lorem.word(1),
  review: faker.lorem.word(1),
  disadvantage: faker.lorem.word(1),
  advantage: faker.lorem.word(1),
  userName: faker.lorem.word(1),
  rating: faker.datatype.number(3),
  cameraId: faker.datatype.number(3)
});

const createFakeNewCommentBody = (): NewReview => ({
  review: faker.lorem.word(1),
  disadvantage: faker.lorem.word(1),
  advantage: faker.lorem.word(1),
  userName: faker.lorem.word(1),
  rating: faker.datatype.number(3),
  cameraId: faker.datatype.number(3)
});


const createMockStore = (): RootState => ({
  [SliceNameSpace.Comments]: {
    commentsStatus: {
      status: Status.Success,
      code: ''
    },
    comments: [createFakeComment()],
    postStatus: Status.Success
  },
  [SliceNameSpace.Product]: {
    product: createFakeCamera(),
    similarProducts: [createFakeCamera()],
    similarProductStatus: {
      status: Status.Success,
      code: ''
    },
    productStatus: {
      status: Status.Success,
      code: ''
    }
  },
  [SliceNameSpace.Catalog]: {
    camerasStatus: Status.Success,
    promoStatus: Status.Success,
    fullLoadStatus: {
      status: Status.Success,
      page: 1
    },
    cameras: [createFakeCamera()],
    promo: createFakePromo()
  },
  [SliceNameSpace.Basket]: {
    ...productsAdapter.getInitialState(),
    totalCount: 0,
    total: 0,
    totalWithCoupon: 0,
    couponStatus: Status.Success,
    coupon: 0,
    couponPercent: 0,
    couponName: ''
  }
});

export { createFakeCamera, createFakePromo, createFakeComment, createFakeNewCommentBody, createMockStore };
