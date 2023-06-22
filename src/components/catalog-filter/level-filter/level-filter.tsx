import { getObjectKeys } from '../../../utiils/types';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';
import { SearchParam } from '../../../consts/enums';
import { ChangeEvent } from 'react';

const levelFilter = {
  zero: {
    enName: 'zero',
    ruName: 'Нулевой',
    checked: false,
    disabled: ''
  },
  nonProfessional: {
    enName: 'non-professional',
    ruName: 'Любительский',
    checked: false,
    disabled: ''
  },
  professional: {
    enName: 'professional',
    ruName: 'Профессиональный',
    checked: false,
    disabled: ''
  }
};

type TypeFilterProps = {
  onChange: () => void;
}

function LevelFilter({ onChange }: TypeFilterProps) {
  const { filter, handleFilterChange } = useCheckboxFilter(levelFilter, SearchParam.Level);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, key: string) => {
    handleFilterChange(evt, key);
    onChange();
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {getObjectKeys(filter).map((key) => (
        <div key={filter[key].enName} className="custom-checkbox catalog-filter__item">
          <label>
            <input
              onChange={(evt) => handleChange(evt, key)}
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
