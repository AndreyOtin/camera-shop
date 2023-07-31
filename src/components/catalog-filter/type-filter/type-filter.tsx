import { getObjectKeys } from '../../../utiils/types';
import { SearchParam } from '../../../consts/enums';
import { useSearchParams } from 'react-router-dom';
import { typeFilter } from '../../../consts/filter';
import UseCheckboxFilter from '../../../hooks/use-checkbox-filter';
import {useEffect} from 'react';

function TypeFilter() {
  const { filter, handleFilterChange } = UseCheckboxFilter(typeFilter, SearchParam.Type);
  const [params] = useSearchParams();

  useEffect(() => {
    const isDisabled = RegExp('Видеокамера').test(decodeURI(params.toString()));

    if(isDisabled){
      handleFilterChange(false, 'film', SearchParam.Type);
      handleFilterChange(false, 'snapshot', SearchParam.Type);
    }

  }, [params]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {getObjectKeys(filter).map((key) => {
        const isDisabled = !!filter[key].disabledOnParams.length &&
           RegExp(filter[key].disabledOnParams.join('|')).test(decodeURI(params.toString()));

        return (
          <div key={filter[key].enName} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={(evt) => handleFilterChange(evt.target.checked, key, SearchParam.Type)}
                checked={!isDisabled && filter[key].checked}
                type="checkbox"
                name={filter[key].enName}
                disabled={isDisabled}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{filter[key].ruName}</span>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default TypeFilter;
