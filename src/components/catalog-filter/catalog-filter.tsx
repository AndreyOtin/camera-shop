import CategoryFilter from './category-filter/category-filter';
import PriceFilter from './price-filter/price-filter';
import TypeFilter from './type-filter/type-filter';
import LevelFilter from './level-filter/level-filter';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectCamerasFullLoadStatus } from '../../store/catalog-slice/catalog-slice';
import { Status } from '../../consts/enums';
import Spinner from '../spinner/spinner';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type CatalogFilterProps = {
  maxPrice: string;
  minPrice: string;
}

function CatalogFilter({ maxPrice, minPrice }: CatalogFilterProps) {
  const status = useAppSelector(selectCamerasFullLoadStatus);
  const [, setSearchParams] = useSearchParams();
  const [reset, setReset] = useState({
    price: 1,
    category: 2,
    level: 3,
    type: 4
  });

  const handleReset = () => {
    setReset({
      price: ++reset.price,
      category: ++reset.price,
      level: ++reset.price,
      type: ++reset.price
    });
    setSearchParams();
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
          <CategoryFilter key={reset.category}/>
          <TypeFilter key={reset.type}/>
          <LevelFilter key={reset.level}/>
          <button
            onClick={handleReset}
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
