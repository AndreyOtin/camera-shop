import { useAppSelector } from '../../../hooks/store-hooks';
import { selectProduct } from '../../../store/product-slice/product-slice';

function DescriptionTab() {
  const product = useAppSelector(selectProduct);

  if (!product) {
    return null;
  }

  return (
    <div className="tabs__element is-active">
      <div className="product__tabs-text">
        <p>
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default DescriptionTab;
