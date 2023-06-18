const getObjectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

const getObjectValues = Object.values as <T extends object>(obj: T) => Array<T[keyof T]>;

export { getObjectKeys, getObjectValues };
