import { MaxElementCount } from '../consts/enums';

const getPaginationVariables = (arrayLength: number, currentPage: string | undefined) => {
  const totalPages = Math.ceil(arrayLength / MaxElementCount.ProductCard);
  const page = +(currentPage || 1) > totalPages ? 1 : +(currentPage || 1);

  const sliceStart = (page - 1) * MaxElementCount.ProductCard;
  const leftCameras = arrayLength - sliceStart;
  const maxElementsCount = Math.min(leftCameras, arrayLength, MaxElementCount.ProductCard);
  const sliceEnd = sliceStart + maxElementsCount;
  return { totalPages, currentPage: page, sliceEnd, maxElementsCount, sliceStart };
};

export default getPaginationVariables;
