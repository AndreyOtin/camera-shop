import { Camera } from './camera';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { SearchParam } from '../consts/enums';
import { categoryFilter, levelFilter, typeFilter } from '../consts/filter';

export type PreviewModal = {
  camera?: Camera;
  isModalOpened: boolean;
}

export type OutletContext = {
  preview: PreviewModal;
  setPreviewDisplay: Dispatch<SetStateAction<PreviewModal>>;
  isReviewOpened: boolean;
  setReviewDisplay: Dispatch<SetStateAction<boolean>>;
  isAddItemSuccessOpened: boolean;
  setAddItemSuccessDisplay: Dispatch<SetStateAction<boolean>>;
  isBuySuccessOpened: boolean;
  setBuySuccessDisplay: Dispatch<SetStateAction<boolean>>;
  isBuyErrorOpened: boolean;
  setBuyErrorDisplay: Dispatch<SetStateAction<boolean>>;
}

export type EvtChange = ChangeEvent<HTMLInputElement>

export type ParsedQueryString = {
  [SearchParam.Page]?: string;
  [SearchParam.Category]: string | Array<string>;
  [SearchParam.Level]?: string | Array<string>;
  [SearchParam.Type]?: Array<string> | string;
  [SearchParam.PriceMax]?: string;
  [SearchParam.PriceMin]?: string;
  [SearchParam.SortType]?: string;
  [SearchParam.SortDirection]?: string;
  [SearchParam.Tab]?: string;
}

export type CheckBoxFilter = Record< keyof typeof levelFilter | keyof typeof typeFilter | keyof typeof categoryFilter, {
  enName: string;
  ruName: string;
  checked: boolean;
  disabledOnParams: string[];
}>
