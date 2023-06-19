import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';

const typeFilter = {
  digital: {
    enName: 'digital',
    ruName: 'Цифровая',
    checked: false
  },
  collection: {
    enName: 'collection',
    ruName: 'Коллекционная',
    checked: false
  },
  snapshot: {
    enName: 'snapshot',
    ruName: 'Моментальная',
    checked: false
  },
  film: {
    enName: 'film',
    ruName: 'Плёночная',
    checked: false
  }
};

function TypeFilter() {
  const { filter, handleFilterChange } = useCheckboxFilter(typeFilter, SearchParam.Type);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].enName} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              onChange={(evt) => handleFilterChange(evt, key)}
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

export default TypeFilter;
