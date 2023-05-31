import { useParams } from 'react-router-dom';

function useCurrentPage() {
  const param = useParams().page as string;
  const [pageNumber] = param.match(/\d/) as RegExpMatchArray;

  return Number(pageNumber);
}

export default useCurrentPage;
