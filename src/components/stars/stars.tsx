type StarsProps = {
  rating: number;
}

function Stars({ rating }: StarsProps) {
  return (
    <>
      {Array(5).fill('').map((_, index) => (
        <svg key={`${index.toString()}`} width="17" height="16" aria-hidden="true">
          <use data-testid={'star'} xlinkHref={`${index + 1 <= rating ? '#icon-full-star' : '#icon-star'}`}></use>
        </svg>))}
    </>
  );
}

export default Stars;
