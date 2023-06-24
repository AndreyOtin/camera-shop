import { CheckBoxFilter } from '../types/app';

const typeFilter:CheckBoxFilter = {
  digital: {
    enName: 'digital',
    ruName: 'Цифровая',
    checked: false,
    disabled: ''
  },
  snapshot: {
    enName: 'snapshot',
    ruName: 'Моментальная',
    checked: false,
    disabled: 'Видеокамера'
  },
  film: {
    enName: 'film',
    ruName: 'Плёночная',
    checked: false,
    disabled: 'Видеокамера'
  },
  collection: {
    enName: 'collection',
    ruName: 'Коллекционная',
    checked: false,
    disabled: ''
  },
};

const categoryFilter:CheckBoxFilter = {
  photo: {
    enName: 'photo-camera',
    ruName: 'Фотоаппарат',
    checked: false,
    disabled: 'video'
  },
  video: {
    enName: 'video-camera',
    ruName: 'Видеокамера',
    checked: false,
    disabled: 'photo'
  }
};

const levelFilter:CheckBoxFilter = {
  zero: {
    enName: 'zero',
    ruName: 'Нулевой',
    checked: false,
    disabled: ''
  },
  nonProfessional: {
    enName: 'non-professional',
    ruName: 'Любительский',
    checked: false,
    disabled: ''
  },
  professional: {
    enName: 'professional',
    ruName: 'Профессиональный',
    checked: false,
    disabled: ''
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
