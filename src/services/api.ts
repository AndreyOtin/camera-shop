import axios, { AxiosError } from 'axios';
import { Camera, Promo } from '../types/camera';
import { NewReview, Review } from '../types/review';
import { Coupon } from '../types/coupon';
import { NewOrder } from '../types/order';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
const REQUEST_TIMEOUT = 5000;

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT
});

api.interceptors.response.use((response) => response, (error: AxiosError) => {
  throw error.response?.status;
});

const client = {
  fetchCameras: () =>
    api.get<Camera[]>('/cameras'),
  fetchCamera: (cameraId: string) =>
    api.get<Camera>(`/cameras/${cameraId}`),
  fetchSimilarCameras: (cameraId: string) =>
    api.get<Camera[]>(`/cameras/${cameraId}/similar`),
  getPromo: () =>
    api.get<Promo>('/promo'),
  getReviews: (cameraId: string) =>
    api.get<Review[]>(`/cameras/${cameraId}/reviews`),
  postReview: (body: NewReview) =>
    api.post<Review>('/reviews', body),
  checkCoupon: (body: Coupon) =>
    api.post<number>('/coupons', body),
  postOrder: (body: NewOrder) =>
    api.post('/orders', body),
};

export default client;
export { api };
