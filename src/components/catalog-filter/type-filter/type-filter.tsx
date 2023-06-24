import { getObjectKeys } from '../../../utiils/types';
import { SearchParam } from '../../../consts/enums';
import { useSearchParams } from 'react-router-dom';
import { CheckBoxFilter } from '../../../types/app';

type Props = {
  onChange: (isChecked: boolean, key: string) => void;
  filter: CheckBoxFilter;
}

function TypeFilter({ filter, onChange }: Props) {
  const [searchParam] = useSearchParams();
  const category = searchParam.get(SearchParam.Category);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].enName} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              onChange={(evt) => onChange(evt.target.checked, key)}
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
