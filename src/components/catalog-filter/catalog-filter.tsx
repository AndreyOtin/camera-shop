import CategoryFilter from './category-filter/category-filter';
import PriceFilter from './price-filter/price-filter';
import TypeFilter from './type-filter/type-filter';
import LevelFilter from './level-filter/level-filter';


function CatalogFilter() {
  return (
    <div className="catalog__aside">
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
