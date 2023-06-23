import { createFakeCamera, createMockStore } from '../../utiils/mock';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utiils/jest';
import { render, screen } from '@testing-library/react';
import Catalog from './catalog';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: Catalog', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={
          <Catalog
            cameras={[createFakeCamera()]}
            filteredCameras={[]}
            bannerPosition={0}
            sortType={'test'}
          />
        }
        />
      </ProviderWrapper>
    );

    expect(screen.getByText('«По вашему запросу ничего не найдено»')).toBeInTheDocument();
  });
});
