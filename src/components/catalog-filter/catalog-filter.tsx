import CategoryFilter from './category-filter/category-filter';
import PriceFilter from './price-filter/price-filter';
import TypeFilter from './type-filter/type-filter';
import LevelFilter from './level-filter/level-filter';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectCamerasFullLoadStatus } from '../../store/catalog-slice/catalog-slice';
import { SearchParam, Status } from '../../consts/enums';
import Spinner from '../spinner/spinner';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useCheckboxFilter from '../../hooks/use-checkbox-filter';
import { typeFilter } from '../../consts/filter';

type CatalogFilterProps = {
  maxPrice: string;
  minPrice: string;
}

function CatalogFilter({ maxPrice, minPrice }: CatalogFilterProps) {
  const status = useAppSelector(selectCamerasFullLoadStatus);
  const [, setSearchParams] = useSearchParams();
  const { filter, handleFilterChange, resetState} = useCheckboxFilter(typeFilter, SearchParam.Type);
  const [reset, setReset] = useState({
    price: 1,
    category: 2,
    level: 3,
    type: 4
  });

  const handleAllReset = () => {
    setReset({
      price: --reset.price,
      category: ++reset.price,
      level: ++reset.price,
      type: ++reset.price
    });
    setSearchParams();
    resetState();
  };

  return (
    <div
      style={status.status === Status.Loading ? {
        opacity: 0.4,
        pointerEvents: 'none'
      } : {}}
      className="catalog__aside"
    >
      <div className="catalog-filter">
        <form action="#" style={{ position: 'relative' }}>
          {status.status === Status.Loading &&
            <Spinner
              style={{
                position: 'absolute'
              }}
              isActive
              variant="small"
            />}
          <h2 className="visually-hidden">Фильтр</h2>
          <PriceFilter key={reset.price} min={minPrice} max={maxPrice}/>
          <CategoryFilter onChange={handleFilterChange} key={reset.category}/>
          <TypeFilter filter={filter} onChange={handleFilterChange} key={reset.type}/>
          <LevelFilter key={reset.level}/>
          <button
            onClick={handleAllReset}
            className="btn catalog-filter__reset-btn"
            type="reset"
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>);
}

export default CatalogFilter;
