import { useParams } from 'react-router-dom';

function useCurrentPage() {
  const param = useParams().page as string;
  const [pageNumber] = param.match(/\d/) || [0];

  return `page_${pageNumber}` === param ? Number(pageNumber) : 0;
}

export default useCurrentPage;
