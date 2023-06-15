import { render, screen } from '@testing-library/react';
import { ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import PreviewModal from './preview-modal';

describe('Component: PreviewModal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <RoutesWrapper jsxElement={<PreviewModal/>}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
