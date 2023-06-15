import { createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import ErrorScreen from './error-screen';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Screen: Error', () => {
  it('should render error correctly', () => {

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ErrorScreen variant="error"/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Ошибка загрузки данных')).toBeInTheDocument();
  });

  it('should render 404 correctly', () => {

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ErrorScreen variant="404"/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
