import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getObjectKeys } from '../utiils/types';
import { useDebouncedCallback } from 'use-debounce';
import queryString from 'query-string';
import { DEBOUNCE_TIMEOUT } from '../consts/app';
import { EvtChange } from '../types/app';

type FilterConfig = Record<string, {
  enName: string;
  ruName: string;
  checked: boolean;
}>
type FilterConfigKeys = keyof FilterConfig

function UseCheckboxFilter(filterConfig: FilterConfig, paramName: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState(() => {
    const initialState = structuredClone(filterConfig) as FilterConfig;
    const categories = searchParams.getAll(paramName);
    const keys = getObjectKeys(initialState);

    keys.forEach((key) => {
      if (categories.includes(initialState[key].ruName)) {
        initialState[key].checked = true;
      }
    });

    return initialState;
  });

  const debounced = useDebouncedCallback(
    () => {
      setSearchParams((prev) => {
        const prevQuery = queryString.parse(prev.toString());
        const categoryQuery = getObjectKeys(filter)
          .reduce<{ [paramName: string]: string[] }>((obj, key) =>
            filter[key].checked ? { [paramName]: [...obj[paramName], filter[key].ruName] } : obj, { [paramName]: [] });

        return queryString.stringify({ ...prevQuery, ...categoryQuery });
      });
    },
    DEBOUNCE_TIMEOUT
  );

  const handleFilterChange = (evt: EvtChange, key: FilterConfigKeys) => {
    setFilter((prevState) => {
      const currentCategory = structuredClone(prevState) as typeof prevState;

      currentCategory[key].checked = evt.target.checked;

      debounced();

      return currentCategory;
    });
  };

  return { handleFilterChange, filter };
}

export default UseCheckboxFilter;
