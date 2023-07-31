import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';
import { levelFilter } from '../../../consts/filter';

function LevelFilter() {
  const { filter, handleFilterChange } = useCheckboxFilter(levelFilter, SearchParam.Level);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].enName} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              onChange={(evt) => handleFilterChange(evt.target.checked, key, SearchParam.Level)}
              checked={filter[key].checked}
              type="checkbox"
              name={filter[key].enName}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{filter[key].ruName}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default LevelFilter;
