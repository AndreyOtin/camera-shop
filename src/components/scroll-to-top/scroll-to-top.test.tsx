import { render } from '@testing-library/react';
import ScrollToTop from './scroll-to-top';
import { ProviderWrapper } from '../../utiils/jest';

describe('Component: ScrollToTop', () => {
  it('should work correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <ProviderWrapper>
        <ScrollToTop/>
      </ProviderWrapper>
    );

    expect(window.scrollTo).toBeCalledTimes(1);
  });
});
