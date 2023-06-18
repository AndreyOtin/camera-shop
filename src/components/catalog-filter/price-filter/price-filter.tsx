import { useSearchParams } from 'react-router-dom';
import { FocusEvent, useRef, useState } from 'react';
import { priceFilter } from '../../../consts/filter';
import { debounce } from '../../../utiils/dom';
import { DEBOUNCE_TIMEOUT } from '../../../consts/app';
import { EvtChange } from '../../../types/app';

function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, SetMinPrice] = useState(searchParams.get(priceFilter.min.enName) || '');
  const [maxPrice, SetMaxPrice] = useState(searchParams.get(priceFilter.max.enName) || '');

  const debouncer = useRef<{ [key: string]: ReturnType<typeof debounce> }>({
    [priceFilter.min.enName]: debounce((event, search) => {
      const evt = event as EvtChange;
      const currentSearchParams = search as URLSearchParams;

      currentSearchParams.delete(priceFilter.min.enName);

      if (evt.target.value) {
        currentSearchParams.append(priceFilter.min.enName, evt.target.value);
      }

      setSearchParams(currentSearchParams.toString());

    }, DEBOUNCE_TIMEOUT),
    [priceFilter.max.enName]: debounce((price, search) => {
      const currentSearchParams = search as URLSearchParams;

      if (typeof price === 'string') {
        currentSearchParams.delete(priceFilter.max.enName);

        if (price) {
          currentSearchParams.append(priceFilter.max.enName, price);
        }

        setSearchParams(currentSearchParams.toString());
      }
    },
    DEBOUNCE_TIMEOUT)
  });

  const handleMinPriceChange = (evt: EvtChange) => {
    const price = +evt.target.value > +maxPrice ? evt.target.value : maxPrice;

    SetMinPrice(evt.target.value);
    debouncer.current[priceFilter.min.enName]?.(evt, searchParams);

    if (maxPrice) {
      SetMaxPrice(price);
      debouncer.current[priceFilter.max.enName]?.(price, searchParams);
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
      debouncer.current[priceFilter.max.enName]?.(minPrice, searchParams);
      SetMaxPrice(minPrice);
    } else {
      debouncer.current[priceFilter.max.enName]?.(price, searchParams);
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
