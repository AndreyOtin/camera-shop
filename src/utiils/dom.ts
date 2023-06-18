const debounce = <T extends unknown[]>(cb: (...args: T) => void, timeout: number) => {
  let timerId: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => cb(...args), timeout);
  };
};

export { debounce };
