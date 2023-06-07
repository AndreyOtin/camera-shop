import { Camera } from './camera';
import { Dispatch, SetStateAction } from 'react';

export type PreviewModal = {
  camera?: Camera;
  isModalOpened: boolean;
}

export type OutletContext = {
  preview: PreviewModal;
  setPreviewDisplay: Dispatch<SetStateAction<PreviewModal>>;
  isReviewOpened: boolean;
  setReviewDisplay: Dispatch<SetStateAction<boolean>>;

}
