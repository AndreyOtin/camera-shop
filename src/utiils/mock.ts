import { Camera, Promo } from '../types/camera';
import * as faker from 'faker';
import { Review } from '../types/review';

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
  reviewCount: faker.datatype.number(3)
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

export { createFakeCamera, createFakePromo, createFakeComment };
