import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getObjectKeys } from '../utiils/types';
import { CheckBoxFilter } from '../types/app';
import { SearchParam } from '../consts/enums';

function UseCheckboxFilter(initialState: Partial<CheckBoxFilter>, paramName: string) {
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

  const changeParams = (param: string, paramValue:string, isChecked:boolean) => {
    setSearchParams((prev) => {
      let values = prev.getAll(param);

      if(isChecked){
        values.push(paramValue);
      }else{
        values = values.filter((el)=>el !== paramValue);
      }

      prev.delete(param);
      prev.set(SearchParam.Page, '1');

      values.forEach((value)=>{
        prev.append(param, value);
      });

      return prev;
    });
  };

  const handleFilterChange = (isChecked: boolean, key: keyof CheckBoxFilter, param:string) => {
    setFilter((prevState) => {
      const currentFilter = JSON.parse(JSON.stringify(prevState)) as typeof prevState;

      currentFilter[key].checked = isChecked;

      return currentFilter;
    });

    changeParams(param, filter[key].ruName, isChecked);
  };

  const resetState = () => {
    const iState = JSON.parse(JSON.stringify(initialState)) as CheckBoxFilter;
    setFilter(iState);
  };

  return { handleFilterChange, filter, resetState };
}

export default UseCheckboxFilter;
