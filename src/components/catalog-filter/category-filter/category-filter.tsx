import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';
import { categoryFilter } from '../../../consts/filter';
import { useSearchParams } from 'react-router-dom';


function CategoryFilter() {
  const { filter, handleFilterChange } = useCheckboxFilter(categoryFilter, SearchParam.Category);
  const [params] = useSearchParams();

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].ruName}
          className="custom-checkbox catalog-filter__item"
        >
          <label>
            <input
              onChange={(evt) => handleFilterChange(evt.target.checked, key, SearchParam.Category)}
              type="checkbox"
              name={filter[key].enName}
              checked={filter[key].checked}
              disabled={!!filter[key].disabledOnParams.length && new RegExp(filter[key].disabledOnParams.join('|')).test(decodeURI(params.toString()))}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">
              {filter[key].ruName === 'Фотоаппарат' ? 'Фотокамера' : filter[key].ruName}
            </span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default CategoryFilter;
