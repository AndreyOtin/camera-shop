import { useSearchParams } from 'react-router-dom';
import { FocusEvent, useState } from 'react';
import { DEBOUNCE_TIMEOUT } from '../../../consts/app';
import { EvtChange } from '../../../types/app';
import queryString from 'query-string';
import { useDebouncedCallback } from 'use-debounce';
import { priceFilter } from '../../../consts/filter';

type CatalogFilterProps = {
  max: string;
  min: string;
}

function PriceFilter({ min, max }: CatalogFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, SetMinPrice] = useState(searchParams.get(priceFilter.min.enName) || '');
  const [maxPrice, SetMaxPrice] = useState(searchParams.get(priceFilter.max.enName) || '');

  const debounced = useDebouncedCallback(
    () => {
      setSearchParams((prev) => {
        const prevQuery = queryString.parse(prev.toString());

        return queryString.stringify({
          ...prevQuery,
          [priceFilter.min.enName]: minPrice || [],
          [priceFilter.max.enName]: maxPrice || [],
        });
      });
    },
    DEBOUNCE_TIMEOUT
  );

  const handleMinPriceChange = (evt: EvtChange) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;

    if (maxPrice && +evt.target.value > +maxPrice) {
      SetMaxPrice(evt.target.value);
      SetMinPrice(evt.target.value);
      debounced();
    } else {
      SetMinPrice(price);
      debounced();
    }
  };

  const handleMaxPriceChange = (evt: EvtChange) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;

    if (price && +price > +max) {
      debounced();
      SetMaxPrice(max);
    } else {
      SetMaxPrice(price);
    }
  };

  const handleMinPriceBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const price = evt.target.value;

    if (price && +price < +min) {
      debounced();
      SetMinPrice(min);
    }

    if (price && +price > +max) {
      debounced();
      SetMinPrice(max);
    }
  };

  const handleMaxPriceBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const price = evt.target.value;

    if (price && +price < +minPrice) {
      debounced();
      SetMaxPrice(minPrice);
      return;
    }

    if (price && +price < +min) {
      debounced();
      SetMaxPrice(min);
      return;
    }

    debounced();
    SetMaxPrice(price);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onBlur={handleMinPriceBlur}
              onChange={handleMinPriceChange}
              type="number"
              name="price"
              placeholder={min.toString()}
              value={minPrice}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              onBlur={handleMaxPriceBlur}
              onChange={handleMaxPriceChange}
              type="number"
              name="priceUp"
              placeholder={max.toString()}
              value={maxPrice}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}


export default PriceFilter;
