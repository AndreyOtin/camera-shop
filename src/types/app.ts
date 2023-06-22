import { Camera } from './camera';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { SearchParam } from '../consts/enums';

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

export type EvtChange = ChangeEvent<HTMLInputElement>

export type ParsedQueryString = {
  [SearchParam.Page]?: string;
  [SearchParam.Category]: string | string[];
  [SearchParam.Level]?: string | string[];
  [SearchParam.Type]?: string | string[];
  [SearchParam.PriceMax]?: string;
  [SearchParam.PriceMin]?: string;
  [SearchParam.SortType]?: string;
  [SearchParam.SortDirection]?: string;
}
