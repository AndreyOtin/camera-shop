import { Status, StatusCode } from '../consts/enums';

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

export { checkStatus } ;
