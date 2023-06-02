import { useState } from 'react';
import CharacteristicTab from './characteristic-tab/characteristic-tab';
import DescriptionTab from './description-tab/description-tab';
import clsx from 'clsx';

enum Tab {
  Characteristics = 'Характеристики',
  Descrtiption = 'Описание'
}


function ProductTabs() {
  const [activeTab, setActiveTab] = useState(Tab.Characteristics);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {Object.values(Tab)
          .map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx('tabs__control', tab === activeTab && 'is-active')}
              type="button"
            >
              {tab}
            </button>
          ))}
      </div>
      <div className="tabs__content">
        {activeTab === Tab.Characteristics && <CharacteristicTab/>}
        {activeTab === Tab.Descrtiption && <DescriptionTab/>}
      </div>
    </div>
  );
}

export default ProductTabs;