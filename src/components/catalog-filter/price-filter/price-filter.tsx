import { useSearchParams } from 'react-router-dom';
import { FocusEvent, useState } from 'react';
import { DEBOUNCE_TIMEOUT } from '../../../consts/app';
import { EvtChange } from '../../../types/app';
import queryString from 'query-string';
import { useDebouncedCallback } from 'use-debounce';

const priceFilter = {
  name: 'price',
  min: {
    enName: 'min-price',
    ruName: 'от',
  },
  max: {
    enName: 'max-price',
    ruName: 'до',
  },
};

function PriceFilter() {
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
    SetMinPrice(evt.target.value);
    debounced();

    if (maxPrice && +evt.target.value > +maxPrice) {
      SetMaxPrice(evt.target.value);
      debounced();
    }
  };

  const handleMaxPriceChange = (evt: EvtChange) => {
    const price = evt.target.value;

    if (!price) {
      SetMaxPrice('');
    } else {
      SetMaxPrice(price);
    }
  };

  const handleMaxPriceBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const price = evt.target.value;

    if (price && +price < +minPrice) {
      debounced();
      SetMaxPrice(minPrice);
    } else {
      debounced();
      SetMaxPrice(price);
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onChange={handleMinPriceChange}
              type="number"
              name="price"
              placeholder="от"
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
              placeholder="до"
              value={maxPrice}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}


export default PriceFilter;
