import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';

const categoryFilter = {
  photo: {
    enName: 'photo-camera',
    ruName: 'Фотоаппарат',
    checked: false
  },
  video: {
    enName: 'video-camera',
    ruName: 'Видеокамера',
    checked: false
  }
};

function CategoryFilter() {
  const { filter, handleFilterChange } = useCheckboxFilter(categoryFilter, SearchParam.Category);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].ruName}
          className="custom-checkbox catalog-filter__item"
        >
          <label>
            <input
              onChange={(evt) => handleFilterChange(evt, key)}
              type="checkbox"
              name={filter[key].enName}
              checked={filter[key].checked}
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
