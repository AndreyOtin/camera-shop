import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';
import { categoryFilter, typeFilter } from '../../../consts/filter';
import { ChangeEvent } from 'react';

type CategoryFilterProps = {
  onChange: <T extends keyof typeof typeFilter>(isChecked: boolean, key: T) => void;
}

function CategoryFilter({ onChange }: CategoryFilterProps) {
  const { filter, handleFilterChange } = useCheckboxFilter(categoryFilter, SearchParam.Category);

  const onFilterChange = (key: string | 'video', evt: ChangeEvent<HTMLInputElement>) => {
    if (key === 'video' && evt.target.checked) {
      onChange(false, 'snapshot');
      onChange(false, 'film');
    }

    handleFilterChange(evt.target.checked, key);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].ruName}
          className="custom-checkbox catalog-filter__item"
        >
          <label>
            <input
              onChange={(evt) => onFilterChange(key, evt)}
              type="checkbox"
              name={filter[key].enName}
              checked={filter[key].checked}
              disabled={filter[filter[key].disabled].checked}
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
