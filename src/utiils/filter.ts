import { Camera } from '../types/camera';
import { ParsedQueryString } from '../types/app';
import { getObjectKeys } from './types';

const isPriceInRange = (camera: Camera, minPrice?: string, maxPrice?: string) => {
  if (minPrice && maxPrice) {
    return +minPrice <= camera.price && camera.price <= +maxPrice;
  }

  if (minPrice) {
    return +minPrice <= camera.price;
  }

  if (maxPrice) {
    return +maxPrice >= camera.price;
  }

  return false;
};

const isFilterInCamera = (filter: string | string[] | undefined, cameraValue: string | number) => {
  if (filter && Array.isArray(filter)) {
    return filter.includes(cameraValue.toString());
  }

  return cameraValue === filter;
};

const filterCameras = (cameras: Camera[], parsedQuery: ParsedQueryString) => {
  const parsedQueryKeys = getObjectKeys(parsedQuery);

  return cameras.filter((camera) =>
    parsedQueryKeys.every((key) => {
      const cameraValue = camera[key as keyof typeof camera];
      let isPrice = true;
      let isFilter = true;

      if (parsedQuery['min-price'] || parsedQuery['max-price']) {
        isPrice = isPriceInRange(camera, parsedQuery['min-price'], parsedQuery['max-price']);
      }

      if (cameraValue) {
        isFilter = isFilterInCamera(parsedQuery[key], cameraValue);
      }

      return isFilter && isPrice;
    }));
};

const getMinMax = (cameras: Camera[]) => {
  const prices = cameras.map((camera) => camera.price);
  const min = cameras.length ? Math.min(...prices).toString() : '';
  const max = cameras.length ? Math.max(...prices).toString() : '';

  return { min, max };
};

export { filterCameras, getMinMax };
