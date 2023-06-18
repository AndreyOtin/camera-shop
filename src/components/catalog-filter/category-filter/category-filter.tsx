import { useRef, useState } from 'react';
import { categoryFilter } from '../../../consts/filter';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../../../utiils/dom';
import { DEBOUNCE_TIMEOUT } from '../../../consts/app';
import { EvtChange } from '../../../types/app';
import { getObjectKeys } from '../../../utiils/types';
import queryString from 'query-string';

type Category = typeof categoryFilter.category
type CategoryKeys = keyof Category

function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(() => {
    const initialState = structuredClone(categoryFilter.category) as Category;
    const categories = searchParams.getAll(categoryFilter.name);
    const keys = getObjectKeys(initialState);

    keys.forEach((key) => {
      if (categories.includes(key)) {
        initialState[key].checked = true;
      }
    });

    return initialState;
  });

  const debouncer = useRef<{ [key: string]: ReturnType<typeof debounce> }>({
    [categoryFilter.name]: debounce((state, search) => {

      const currentCategory = state as Category;
      const currentSearchParams = search as URLSearchParams;
      const prevQuery = queryString.parse(currentSearchParams.toString());

      const categoryQuery = getObjectKeys(currentCategory)
        .reduce<{ category: CategoryKeys[] }>((obj, key) =>
          currentCategory[key].checked ? { category: [...obj.category, key] } : obj, { category: [] });

      setSearchParams({ ...prevQuery, ...categoryQuery });
    }, DEBOUNCE_TIMEOUT),
  });

  const handleFilterChange = (evt: EvtChange, key: CategoryKeys) => {
    setCategory((prevState) => {
      const currentCategory = structuredClone(prevState) as typeof prevState;

      currentCategory[key].checked = evt.target.checked;

      debouncer.current[categoryFilter.name](currentCategory, searchParams);

      return currentCategory;
    });
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {getObjectKeys(category).map((key) => (
        <div key={category[key].ruName}
          className="custom-checkbox catalog-filter__item"
        >
          <label>
            <input
              onChange={(evt) => handleFilterChange(evt, key)}
              type="checkbox"
              name={category[key].enName}
              checked={category[key].checked}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">
              {category[key].ruName}
            </span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default CategoryFilter;
