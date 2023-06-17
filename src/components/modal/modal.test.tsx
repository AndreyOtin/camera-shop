import { render, screen } from '@testing-library/react';
import { ProviderWrapper } from '../../utiils/jest';
import Modal from './modal';

describe('Component: Modal', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Modal isOpened onClickOutside={jest.fn}>
          <h1>modal</h1>
        </Modal>
      </ProviderWrapper>
    );


    expect(screen.getByText('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});