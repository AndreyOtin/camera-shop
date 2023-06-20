import { useState } from 'react';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectCamerasFullLoadStatus } from '../../store/catalog-slice/catalog-slice';
import { Status } from '../../consts/enums';

enum SortType {
  Popular = 'popular',
  Price = 'price',
  Up = 'up',
  Down = 'down'
}

function CatalogSort() {
  const [sortType, setSortType] = useState(SortType.Price);
  const [sortDirection, setSortDirection] = useState(SortType.Down);
  const status = useAppSelector(selectCamerasFullLoadStatus);

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
                onChange={() => setSortType(SortType.Price)}
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === SortType.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onChange={() => setSortType(SortType.Popular)}
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
                onChange={() => setSortDirection(SortType.Up)}
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
                onChange={() => setSortDirection(SortType.Down)}
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
