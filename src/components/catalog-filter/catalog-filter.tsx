import CategoryFilter from './category-filter/category-filter';
import PriceFilter from './price-filter/price-filter';


function CatalogFilter() {
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <PriceFilter/>
          <CategoryFilter/>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital"/>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film"/>
                <span className="custom-checkbox__icon">
                </span>
                <span className="custom-checkbox__label">
                            Плёночная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot"/>
                <span className="custom-checkbox__icon"></span>
                <span
                  className="custom-checkbox__label"
                >Моментальная
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection"/>
                <span
                  className="custom-checkbox__icon"
                >
                </span>
                <span
                  className="custom-checkbox__label"
                >Коллекционная
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="zero"
                />
                <span className="custom-checkbox__icon">
                </span>
                <span
                  className="custom-checkbox__label"
                >
                            Нулевой
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional"/>
                <span className="custom-checkbox__icon"> </span>
                <span className="custom-checkbox__label">
                          Любительский
                </span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional"/>
                <span
                  className="custom-checkbox__icon"
                >
                </span>
                <span
                  className="custom-checkbox__label"
                >Профессиональный
                </span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>);
}

export default CatalogFilter;
