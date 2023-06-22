import React from 'react';
import CatalogFilter from '../catalog-filter/catalog-filter';
import Catalog from '../catalog/catalog';
import { Camera } from '../../types/camera';
import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { ParsedQueryString } from '../../types/app';
import { SearchParam } from '../../consts/enums';
import { filterCameras, getMinMax } from '../../utiils/filter';
import sortBy from '../../utiils/sort';
import getPaginationVariables from '../../utiils/pagination';

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

  const filteredCameras = filterCameras(cameras, parsedQuery);
  const { min, max } = getMinMax(filteredCameras);

  if (sortType && sortDirection) {
    filteredCameras.sort(sortBy(sortType, sortDirection));
  }

  const {
    sliceStart,
    sliceEnd,
  } = getPaginationVariables(filteredCameras.length, page);

  const slicedCameras = filteredCameras.slice(sliceStart, sliceEnd);

  return (
    <div className="page-content__columns">
      <CatalogFilter minPrice={min} maxPrice={max}/>
      <Catalog
        filteredCameras={filteredCameras}
        cameras={slicedCameras}
        bannerPosition={bannerPosition}
        sortType={sortType}
      />
    </div>
  );
}

export default CatalogContent;
