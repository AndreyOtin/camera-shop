import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(
      <Spinner isActive/>
    );

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('shouldn\'t render', () => {
    render(
      <Spinner isActive={false}/>
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
