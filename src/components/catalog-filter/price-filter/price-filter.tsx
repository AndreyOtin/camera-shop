import { useSearchParams } from 'react-router-dom';
import { KeyboardEvent, useState } from 'react';
import { EvtChange } from '../../../types/app';
import { priceFilter } from '../../../consts/filter';
import { Code } from '../../../consts/enums';
import { useDebounce } from '../../../utiils/common';
import { DEBOUNCE_TIMEOUT } from '../../../consts/app';

type CatalogFilterProps = {
  max: string;
  min: string;
}

function PriceFilter({ min, max }: CatalogFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, SetMinPrice] = useState(searchParams.get(priceFilter.min.enName) || '');
  const [maxPrice, SetMaxPrice] = useState(searchParams.get(priceFilter.max.enName) || '');

  const debounced = useDebounce(
    () => {
      setSearchParams((prev) => {
        if(minPrice){
          prev.set(priceFilter.min.enName, minPrice);
        } else {
          prev.delete(priceFilter.min.enName);
        }

        if(maxPrice){
          prev.set(priceFilter.max.enName, maxPrice);
        } else {
          prev.delete(priceFilter.max.enName);
        }

        return prev;
      });
    },
    DEBOUNCE_TIMEOUT
  );

  const handleMinPriceChange = (evt: EvtChange) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;

    if (maxPrice && +evt.target.value > +maxPrice) {
      SetMaxPrice(evt.target.value);
      SetMinPrice(evt.target.value);
    } else {
      SetMinPrice(price);
    }

    debounced();
  };

  const handleMaxPriceChange = (evt: EvtChange) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;

    if (price && +price > +max) {
      SetMaxPrice(max);
    } else {
      SetMaxPrice(price);
    }

    debounced();
  };

  const checkMinPrice = () => {
    if (minPrice && +minPrice < +min) {
      SetMinPrice(min);
    }

    if (minPrice && +minPrice > +max) {
      SetMinPrice(max);
    }

    debounced();
  };

  const checkMaxPrice = () => {
    if (maxPrice && +maxPrice < +minPrice) {
      SetMaxPrice(minPrice);
    } else if (maxPrice && +maxPrice < +min) {
      SetMaxPrice(min);
    } else {
      SetMaxPrice(maxPrice);
    }

    debounced();
  };

  const handleMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === Code.Enter) {
      checkMinPrice();
    }
  };

  const handleMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === Code.Enter) {
      checkMaxPrice();
    }
  };

  const handleMinPriceBlur = () => {
    checkMinPrice();
  };

  const handleMaxPriceBlur = () => {
    checkMaxPrice();
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onKeyDown={handleMinPriceKeyDown}
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
              onKeyDown={handleMaxPriceKeyDown}
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
