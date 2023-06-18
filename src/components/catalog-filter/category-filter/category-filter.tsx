import React, { useRef, useState } from 'react';
import { categoryFilter } from '../../../consts/filter';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../../../utiils/dom';
import { DEBOUNCE_TIMEOUT } from '../../../consts/app';
import { EvtChange } from '../../../types/app';

type Category = [keyof typeof categoryFilter['category']];

function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(() => {
    const initialState = { ...categoryFilter.category };
    const categories = searchParams.getAll(categoryFilter.name);
    const keys = Object.keys(initialState) as Category;

    keys.forEach((key) => {
      if (categories.includes(key)) {
        initialState[key].checked = true;
      }
    });

    return initialState;
  });


  const debouncer = useRef<{ [key: string]: ReturnType<typeof debounce> }>({
    [categoryFilter.name]: debounce((arg) => {
      const filter = arg as string;
      const filters = new Set(searchParams.getAll(categoryFilter.name));

      filters.has(filter) ? filters.delete(filter) : filters.add(filter);

      searchParams.delete(categoryFilter.name);

      filters.forEach((item) => {
        searchParams.append(categoryFilter.name, item);
      });

      setSearchParams(searchParams.toString());
    }, DEBOUNCE_TIMEOUT),
  });

  const handleFilterChange = (evt: EvtChange, filter: keyof typeof category) => {
    setCategory((prevState) => {
      const state = structuredClone(prevState) as typeof prevState;

      state[filter].checked = evt.target.checked;

      return state;
    });

    debouncer.current[categoryFilter.name]?.(filter);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {Object.keys(category).map((key) => {
        const filter = key as keyof typeof category;

        return (
          <div key={category[filter].ruName}
            className="custom-checkbox catalog-filter__item"
          >
            <label>
              <input
                onChange={(evt) => handleFilterChange(evt, filter)}
                type="checkbox"
                name={category[filter].enName}
                checked={category[filter].checked}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">
                {category[filter].ruName}
              </span>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default CategoryFilter;
