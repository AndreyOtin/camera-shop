import axios, { AxiosError } from 'axios';
import { Camera, Promo } from '../types/camera';
import { NewReview, Review } from '../types/review';
import { NewOrder } from '../types/order';
import { ApiRoute } from '../consts/enums';

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
    api.get<Camera[]>(`${ApiRoute.Cameras}`),
  fetchCamera: (cameraId: string) =>
    api.get<Camera>(`${ApiRoute.Cameras}/${cameraId}`),
  fetchSimilarCameras: (cameraId: string) =>
    api.get<Camera[]>(`${ApiRoute.Cameras}/${cameraId}/similar`),
  getPromo: () =>
    api.get<Promo>(`${ApiRoute.Promo}`),
  getReviews: (cameraId: string) =>
    api.get<Review[]>(`${ApiRoute.Cameras}/${cameraId}/reviews`),
  postReview: (body: NewReview) =>
    api.post<Review>(ApiRoute.Reviews, body),
  checkCoupon: (coupon: string) =>
    api.post<string>(ApiRoute.Coupons, { coupon }),
  postOrder: (body: NewOrder) =>
    api.post(ApiRoute.Orders, body),
};

export default client;
export { api };
