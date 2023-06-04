import { Camera } from './camera';

export type OutletContext = {
  preview: Camera | null;
  handlePreviewModalShow: (camera: Camera | null) => void;
}
