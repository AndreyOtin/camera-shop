import { useAppSelector } from '../../../hooks/store-hooks';
import { selectProduct } from '../../../store/product-slice/product-slice';
import clsx from 'clsx';

type DescriptionTabProps = {
  isActive: boolean;
}

function DescriptionTab({ isActive }: DescriptionTabProps) {
  const product = useAppSelector(selectProduct);

  if (!product) {
    return null;
  }

  return (
    <div className={clsx('tabs__element', isActive && 'is-active')}>
      <div className="product__tabs-text">
        <p>
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default DescriptionTab;
