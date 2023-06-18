import { Status, StatusCode } from '../consts/enums';

type UseStatusData = {
  status: {
    [key: string]: Status;
  };
  code?: {
    [key: string]: string;
  };
}

const checkStatus = ({ status, code = {} }: UseStatusData) => {
  const isLoading = Object.values(status).some((value) => value === Status.Loading || value === Status.Idle);
  const isError = Object.values(status).some((value) => value === Status.Error);
  const isNotFound = Object.values(code).some((value) => value === StatusCode.NotFound);

  return { isLoading, isError, isNotFound };
};

export { checkStatus } ;
