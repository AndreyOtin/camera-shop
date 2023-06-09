import { useEffect } from 'react';
import CharacteristicTab from './characteristic-tab/characteristic-tab';
import DescriptionTab from './description-tab/description-tab';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { SearchParam } from '../../consts/enums';
import { makeFirstLetterUpCase } from '../../utiils/formaters';

enum Tab {
  Characteristics = 'характеристики',
  Description = 'описание'
}

function ProductTabs() {
  const [params, setParams] = useSearchParams();
  const activeTab = params.get(SearchParam.Tab);

  useEffect(() => {
    const urlTab = Object.values(Tab).find((value) => value === activeTab);

    if (!urlTab) {
      setParams({ [SearchParam.Tab]: Tab.Description });
    }

  }, [activeTab, setParams]);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {Object.values(Tab)
          .map((tab) => (
            <button
              key={tab}
              onClick={() => setParams({ [SearchParam.Tab]: tab })}
              className={clsx('tabs__control', tab === activeTab && 'is-active')}
              type="button"
            >
              {makeFirstLetterUpCase(tab)}
            </button>
          ))}
      </div>
      <div className="tabs__content">
        <CharacteristicTab isActive={activeTab === Tab.Characteristics}/>
        <DescriptionTab isActive={activeTab === Tab.Description}/>
      </div>
    </div>
  );
}

export default ProductTabs;
