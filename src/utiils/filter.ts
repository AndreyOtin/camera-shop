import { Camera } from '../types/camera';
import { QueryParseResult } from '../types/app';
import queryString from 'query-string';
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

const isQueryValueInCamera = (queryValue: string | string[] | undefined, cameraValue: string | number) => {
  if (queryValue && Array.isArray(queryValue)) {
    return queryValue.includes(cameraValue.toString());
  }

  return cameraValue === queryValue;
};

const filterCameras = (cameras: Camera[], query: string) => {
  const parsedQuery = queryString.parse(query) as QueryParseResult;
  const parsedQueryKeys = getObjectKeys(parsedQuery);

  return cameras.filter((camera) => {
    const isKey = parsedQueryKeys.every((key) => {
      const cameraValue = camera[key as keyof typeof camera];
      const queryValue = parsedQuery[key];
      let isPrice = true;
      let isFilter = true;

      if (parsedQuery['min-price'] || parsedQuery['max-price']) {
        isPrice = isPriceInRange(camera, parsedQuery['min-price'], parsedQuery['max-price']);
      }

      if (cameraValue) {
        isFilter = isQueryValueInCamera(queryValue, cameraValue);
      }

      return isFilter && isPrice;
    });

    return isKey;
  });
};

export { filterCameras };
