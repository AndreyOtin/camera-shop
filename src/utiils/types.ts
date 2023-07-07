const getObjectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export { getObjectKeys };
