import { getObjectKeys } from '../../../utiils/types';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import queryString from 'query-string';
import { DEBOUNCE_TIMEOUT } from '../../../consts/app';
import { EvtChange } from '../../../types/app';
import useCheckboxFilter from '../../../hooks/use-checkbox-filter';

const PARAM_NAME = 'type';

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

type TypeFilterType = typeof typeFilter
type TypeFilterKeys = keyof TypeFilterType

function TypeFilter() {
  const {filter, handleFilterChange} = useCheckboxFilter(typeFilter, PARAM_NAME);
  // const [searchParams, setSearchParams] = useSearchParams();
  //
  // const [type, setType] = useState(() => {
  //   const initialState = structuredClone(typeFilter) as TypeFilterType;
  //   const categories = searchParams.getAll(PARAM_NAME);
  //   const keys = getObjectKeys(initialState);
  //
  //   keys.forEach((key) => {
  //     if (categories.includes(key)) {
  //       initialState[key].checked = true;
  //     }
  //   });
  //
  //   return initialState;
  // });
  //
  // const debounced = useDebouncedCallback(
  //   () => {
  //     setSearchParams((prev) => {
  //       const prevQuery = queryString.parse(prev.toString());
  //       const categoryQuery = getObjectKeys(type)
  //         .reduce<{ [PARAM_NAME]: string[] }>((obj, key) =>
  //           type[key].checked ? { [PARAM_NAME]: [...obj[PARAM_NAME], type[key].ruName] } : obj, { [PARAM_NAME]: [] });
  //
  //       return { ...prevQuery, ...categoryQuery };
  //     });
  //   },
  //   DEBOUNCE_TIMEOUT
  // );
  //
  // const handleFilterChange = (evt: EvtChange, key: TypeFilterKeys) => {
  //   setType((prevState) => {
  //     const currentCategory = structuredClone(prevState) as typeof prevState;
  //
  //     currentCategory[key].checked = evt.target.checked;
  //
  //     debounced();
  //
  //     return currentCategory;
  //   });
  // };

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
