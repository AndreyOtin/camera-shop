import CategoryFilter from './category-filter/category-filter';
import PriceFilter from './price-filter/price-filter';
import TypeFilter from './type-filter/type-filter';
import LevelFilter from './level-filter/level-filter';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectCamerasFullLoadStatus } from '../../store/catalog-slice/catalog-slice';
import { Status } from '../../consts/enums';

function CatalogFilter() {
  const status = useAppSelector(selectCamerasFullLoadStatus);

  return (
    <div
      style={status.status === Status.Loading ? {
        opacity: 0.4,
        pointerEvents: 'none'
      } : {}}
      className="catalog__aside"
    >
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <PriceFilter/>
          <CategoryFilter/>
          <TypeFilter/>
          <LevelFilter/>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>);
}

export default CatalogFilter;
