import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';
import { ChangeEvent } from 'react';

const categoryFilter = {
  photo: {
    enName: 'photo-camera',
    ruName: 'Фотоаппарат',
    checked: false,
    disabled: 'video'
  },
  video: {
    enName: 'video-camera',
    ruName: 'Видеокамера',
    checked: false,
    disabled: 'photo'
  }
};

type CategoryFilterProps = {
  onChange: () => void;
}

function CategoryFilter({ onChange }: CategoryFilterProps) {
  const { filter, handleFilterChange } = useCheckboxFilter(categoryFilter, SearchParam.Category);
  const filterKeys = getObjectKeys(filter);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, key: string) => {
    handleFilterChange(evt, key);
    onChange();
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {filterKeys.map((key) => (
        <div key={filter[key].ruName}
          className="custom-checkbox catalog-filter__item"
        >
          <label>
            <input
              onChange={(evt) => handleChange(evt, key)}
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
