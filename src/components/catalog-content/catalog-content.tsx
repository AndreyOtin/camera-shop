import React from 'react';
import CatalogFilter from '../catalog-filter/catalog-filter';
import Catalog from '../catalog/catalog';
import { Camera } from '../../types/camera';
import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { ParsedQueryString } from '../../types/app';
import { SearchParam } from '../../consts/enums';
import { filterCameras } from '../../utiils/filter';
import getPaginationVariables from '../../utiils/pagination';
import sortBy from '../../utiils/sort';

type CatalogContentProps = {
  cameras: Camera[];
  bannerPosition: number;
}

function CatalogContent({ bannerPosition, cameras }: CatalogContentProps) {
  const [searchParams] = useSearchParams();
  const parsedQuery = queryString.parse(searchParams.toString()) as ParsedQueryString;
  const sortType = parsedQuery[SearchParam.SortType];
  const sortDirection = parsedQuery[SearchParam.SortDirection];
  const page = parsedQuery.page;

  const { filteredCamerasWithPrice, max, min } = filterCameras(cameras, parsedQuery);

  if (sortType && sortDirection) {
    filteredCamerasWithPrice.sort(sortBy(sortType, sortDirection));
  }

  const {
    sliceStart,
    sliceEnd,
  } = getPaginationVariables(filteredCamerasWithPrice.length, page);

  const slicedCameras = filteredCamerasWithPrice.slice(sliceStart, sliceEnd);

  return (
    <div className="page-content__columns" data-testid='catalog-content'>
      <CatalogFilter minPrice={min} maxPrice={max}/>
      <Catalog
        filteredCameras={filteredCamerasWithPrice}
        cameras={slicedCameras}
        bannerPosition={bannerPosition}
        sortType={sortType}
      />
    </div>
  );
}

export default CatalogContent;
