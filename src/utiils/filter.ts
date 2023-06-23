import { Camera } from '../types/camera';
import { ParsedQueryString } from '../types/app';
import { getObjectKeys } from './types';

const getMinMax = (cameras: Camera[]) => {
  const prices = cameras.map((camera) => camera.price);
  const min = cameras.length ? Math.min(...prices).toString() : '';
  const max = cameras.length ? Math.max(...prices).toString() : '';

  return { min, max };
};

const isCameraPriceInRange = (camera: Camera, minPrice?: string, maxPrice?: string) => {
  if (minPrice && maxPrice) {
    return +minPrice <= camera.price && camera.price <= +maxPrice;
  }

  if (minPrice) {
    return +minPrice <= camera.price;
  }

  if (maxPrice) {
    return +maxPrice >= camera.price;
  }

  return true;
};

const isFilterInCamera = (filter: string | string[] | undefined, cameraValue: string | number | undefined) => {
  if (filter && cameraValue && Array.isArray(filter)) {
    return filter.includes(cameraValue.toString());
  }

  if (cameraValue) {
    return cameraValue === filter;
  }

  return true;
};

const filterCameras = (cameras: Camera[], parsedQuery: ParsedQueryString) => {
  const parsedQueryKeys = getObjectKeys(parsedQuery);

  const filteredCameras = cameras.filter((camera) =>
    parsedQueryKeys.every((key) =>
      isFilterInCamera(parsedQuery[key], camera[key as keyof typeof camera])));

  const filteredCamerasWithPrice = filteredCameras.filter((camera) =>
    isCameraPriceInRange(camera, parsedQuery['min-price'], parsedQuery['max-price']));

  const { min, max } = getMinMax(filteredCameras);

  return { filteredCamerasWithPrice, min, max };
};

const filterCamerasBySearch = (cameras: Camera[], search: string) => {
  if (!search) {
    return [];
  }

  return cameras.filter((camera) =>
    camera.name.toLowerCase().replaceAll(' ', '')
      .includes(search && search.replaceAll(' ', '').toLowerCase()));
};

export { filterCameras, filterCamerasBySearch };
