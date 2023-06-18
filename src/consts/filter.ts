const categoryFilter = {
  name: 'category',
  category: {
    photo: {
      enName: 'photo-camera',
      ruName: 'Фотокамера',
      checked: false
    },
    video: {
      enName: 'video-camera',
      ruName: 'Видеокамера',
      checked: false
    }
  }
};

const typeFilter = {
  digital: {
    enName: 'digital',
    ruName: 'Цифровая',
    checked: false
  },
  collection: {
    enName: 'collection',
    ruName: 'Коллекционная',
    checked: false
  },
  snapshot: {
    enName: 'snapshot',
    ruName: 'Моментальная',
    checked: false
  },
  film: {
    enName: 'film',
    ruName: 'Плёночная',
    checked: false
  }
};

const levelFilter = {
  zero: {
    enName: 'zero',
    ruName: 'Нулевой',
    checked: false
  },
  nonProfessional: {
    enName: 'non-professional',
    ruName: 'Любительский',
    checked: false
  },
  professional: {
    enName: 'professional',
    ruName: 'Профессиональный',
    checked: false
  }
};

const priceFilter = {
  min: {
    enName: 'min-price',
    ruName: 'от',
    value: ''
  },
  max: {
    enName: 'max-price',
    ruName: 'до',
    value: ''
  },
};

export { priceFilter, levelFilter, typeFilter, categoryFilter };
