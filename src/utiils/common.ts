import { Status, StatusCode } from '../consts/enums';
import { useEffect, useRef } from 'react';

type StatusData = {
  status: {
    [key: string]: Status;
  };
  code?: {
    [key: string]: string;
  };
}

const checkStatus = ({ status, code = {} }: StatusData) => {
  const isLoading = Object.values(status).some((value) => value === Status.Loading || value === Status.Idle);
  const isError = Object.values(status).some((value) => value === Status.Error);
  const isNotFound = Object.values(code).some((value) => value === StatusCode.NotFound);

  return { isLoading, isError, isNotFound };
};

export const useDebounce = (cb: (...args: unknown[]) => void, delay: number) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const func = useRef(cb);

  useEffect(() => {
    func.current = cb;
  }, [cb]);

  return (...args: unknown[]) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      func.current(...args);
    }, delay);
  };
};


export { checkStatus } ;
