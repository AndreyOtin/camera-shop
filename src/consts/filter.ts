const typeFilter = {
  digital: {
    enName: 'digital',
    ruName: 'Цифровая',
    checked: false,
    disabledOnParams: []
  },
  snapshot: {
    enName: 'snapshot',
    ruName: 'Плёночная',
    checked: false,
    disabledOnParams:['Видеокамера']
  },
  film: {
    enName: 'film',
    ruName: 'Моментальная',
    checked: false,
    disabledOnParams: ['Видеокамера']
  },
  collection: {
    enName: 'collection',
    ruName: 'Коллекционная',
    checked: false,
    disabledOnParams: []
  },
};

const categoryFilter = {
  photo: {
    enName: 'photo-camera',
    ruName: 'Фотоаппарат',
    checked: false,
    disabledOnParams: ['Видеокамера']
  },
  video: {
    enName: 'video-camera',
    ruName: 'Видеокамера',
    checked: false,
    disabledOnParams:['Фотоаппарат']
  }
};

const levelFilter = {
  zero: {
    enName: 'zero',
    ruName: 'Нулевой',
    checked: false,
    disabledOnParams: []
  },
  nonProfessional: {
    enName: 'non-professional',
    ruName: 'Любительский',
    checked: false,
    disabledOnParams: []
  },
  professional: {
    enName: 'professional',
    ruName: 'Профессиональный',
    checked: false,
    disabledOnParams: []
  }
};

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

export { priceFilter, levelFilter, typeFilter, categoryFilter };
