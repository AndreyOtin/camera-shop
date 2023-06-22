import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

const typeFilter = {
  digital: {
    enName: 'digital',
    ruName: 'Цифровая',
    checked: false,
    disabled: ''
  },
  snapshot: {
    enName: 'snapshot',
    ruName: 'Моментальная',
    checked: false,
    disabled: 'Видеокамера'
  },
  film: {
    enName: 'film',
    ruName: 'Плёночная',
    checked: false,
    disabled: 'Видеокамера'
  },
  collection: {
    enName: 'collection',
    ruName: 'Коллекционная',
    checked: false,
    disabled: ''
  },
};

type TypeFilterProps = {
  onChange: () => void;
}

function TypeFilter({ onChange }: TypeFilterProps) {
  const { filter, handleFilterChange } = useCheckboxFilter(typeFilter, SearchParam.Type);
  const [searchParam] = useSearchParams();
  const category = searchParam.get(SearchParam.Category);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, key: string) => {
    handleFilterChange(evt, key);
    onChange();
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].enName} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              onChange={(evt) => handleChange(evt, key)}
              checked={filter[key].checked}
              type="checkbox"
              name={filter[key].enName}
              disabled={filter[key].disabled === category}
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
