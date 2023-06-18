const debounce = <T extends unknown[]>(cb: (...args: T) => void, timeout: number) => {
  let timerId: NodeJS.Timeout;

  return (...args: T) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => cb(...args), timeout);
  };
};

const throttle = <T extends unknown[]>(cb: (...args: T) => void, timeout: number) => {
  let lastCalled = 0;

  return (...args: T) => {
    const now = Date.now();

    if (now - lastCalled > timeout) {
      lastCalled = now;
      cb(...args);
    }
  };
};
export { debounce, throttle };
