import { Camera } from '../types/camera';
import client from '../services/api';
import { Review } from '../types/review';

const calculateRating = (reviews: Review[]) =>
  Math.ceil(reviews.reduce((total, review) => total + review.rating, 0) / reviews.length);

const getCamerasWithRating = async (cameras: Camera[], start = 0, end = cameras.length) => {
  const camerasWithRating: Camera[] = [...cameras];

  for (let i = start; i < end; i++) {
    const { data: reviews } = await client.getReviews(cameras[i].id.toString());

    const rating = calculateRating(reviews);

    camerasWithRating[i] = { ...cameras[i], rating: Number.isNaN(rating) ? 0 : rating };
  }

  return camerasWithRating;
};

export { getCamerasWithRating, calculateRating };
