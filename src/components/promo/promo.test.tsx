import { createFakePromo } from '../../utiils/mock';
import { render, screen } from '@testing-library/react';
import Promo from './promo';
import { ProviderWrapper } from '../../utiils/jest';

const fakePromo = createFakePromo();

describe('Component: Promo', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Promo promo={fakePromo} description="test" setBannerPosition={jest.fn}/>
      </ProviderWrapper>
    );


    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
