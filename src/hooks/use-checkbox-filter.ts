import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getObjectKeys } from '../utiils/types';
import queryString from 'query-string';
import { SearchParam } from '../consts/enums';
import { CheckBoxFilter, ParsedQueryString } from '../types/app';
import { typeFilter } from '../consts/filter';

const deleteParamValueFromParam = (parsedQuery: ParsedQueryString, searchParam: SearchParam, paramValues: string[]) => {
  let paramValue = parsedQuery[searchParam];

  if (paramValue) {
    if (Array.isArray(paramValue)) {
      paramValue = paramValue.filter((item) => !paramValues.includes(item));
    } else {
      paramValue = paramValues.includes(paramValue) ? [] : paramValue;
    }
  }

  return paramValue;
};

const createCheckBoxQuery = (checkedState: boolean, activeBoxKey: string, state: CheckBoxFilter, paramName: string) =>
  getObjectKeys(state)
    .reduce<{ [paramName: string]: string[] }>((obj, key) => {
      if (key === activeBoxKey && checkedState) {
        return { [paramName]: [...obj[paramName], state[key].ruName] };
      }

      if (key === activeBoxKey && !checkedState) {
        return obj;
      }

      if (state[key].checked) {
        return { [paramName]: [...obj[paramName], state[key].ruName] };
      }

      return obj;
    }, { [paramName]: [] });


function UseCheckboxFilter(initialState: CheckBoxFilter, paramName: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState(() => {
    const state = JSON.parse(JSON.stringify(initialState)) as CheckBoxFilter;
    const filters = searchParams.getAll(paramName);
    const keys = getObjectKeys(state);

    keys.forEach((key) => {
      if (filters.includes(state[key].ruName)) {
        state[key].checked = true;
      }
    });

    return state;
  });

  const changeParams = (field: string, isChecked: boolean, activeBoxKey: string) => {
    setSearchParams((prev) => {
      const prevQuery = queryString.parse(prev.toString()) as ParsedQueryString;

      if (field === typeFilter.film.disabled) {
        prevQuery[SearchParam.Type] =
          deleteParamValueFromParam(prevQuery, SearchParam.Type, [typeFilter.film.ruName, typeFilter.snapshot.ruName]);
      }

      const checkBoxQuery = createCheckBoxQuery(isChecked, activeBoxKey, filter, paramName);

      return queryString.stringify({
        ...prevQuery, ...checkBoxQuery, [SearchParam.Page]: '1'
      });
    });
  };

  const handleFilterChange = (isChecked: boolean, key: string) => {
    setFilter((prevState) => {
      const currentCategory = JSON.parse(JSON.stringify(prevState)) as typeof prevState;

      currentCategory[key].checked = isChecked;

      return currentCategory;
    });

    changeParams(filter[key].ruName, isChecked, key);
  };

  const resetState = () => {
    const iState = JSON.parse(JSON.stringify(initialState)) as CheckBoxFilter;
    setFilter(iState);
  };

  return { handleFilterChange, filter, resetState };
}

export default UseCheckboxFilter;
