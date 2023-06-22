import { Camera } from '../types/camera';
import { SortType } from '../consts/enums';

const sortBy = (type: string, direction: string) => {
  if (type === SortType.Popular || type === SortType.Price) {
    return (a: Camera, b: Camera) => direction === SortType.Up ? a[type] - b[type] : b[type] - a[type];
  }
};

export default sortBy;
