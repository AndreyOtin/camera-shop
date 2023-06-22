import { useState } from 'react';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectCamerasFullLoadStatus } from '../../store/catalog-slice/catalog-slice';
import { SearchParam, SortType, Status } from '../../consts/enums';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from '../../consts/app';
import queryString from 'query-string';

function CatalogSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState(searchParams.get(SearchParam.SortType));
  const [sortDirection, setSortDirection] = useState(searchParams.get(SearchParam.SortDirection));
  const status = useAppSelector(selectCamerasFullLoadStatus);

  const debounced = useDebouncedCallback(() => {
    const prevParams = queryString.parse(searchParams.toString());
    const newParams = queryString.stringify({
      ...prevParams,
      [SearchParam.SortType]: sortType,
      [SearchParam.SortDirection]: sortDirection
    });

    setSearchParams(newParams);
  }, DEBOUNCE_TIMEOUT);

  const handleTypeChange = (type: SortType) => {
    if (!sortDirection) {
      setSortDirection(SortType.Up);
      setSortType(type);
    } else {
      setSortType(type);
    }

    debounced();
  };

  const handleDirectionChange = (direction: SortType) => {
    if (!sortType) {
      setSortDirection(direction);
      setSortType(SortType.Price);
    } else {
      setSortDirection(direction);
    }

    debounced();
  };

  return (
    <div
      style={status.status === Status.Loading ? {
        opacity: 0.4,
        pointerEvents: 'none'
      } : {}}
      className="catalog-sort"
    >
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                onChange={() => handleTypeChange(SortType.Price)}
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === SortType.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onChange={() => handleTypeChange(SortType.Popular)}
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === SortType.Popular}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                onChange={() => handleDirectionChange(SortType.Up)}
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={sortDirection === SortType.Up}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                onChange={() => handleDirectionChange(SortType.Down)}
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortDirection === SortType.Down}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
