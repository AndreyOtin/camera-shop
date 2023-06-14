import catalogSlice, { getCameras, getPromo, initialState } from './catalog-slice';
import { createFakeCamera, createFakePromo } from '../../utiils/mock';
import { Status } from '../../consts/enums';

describe('Slice: catalog', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogSlice(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should update cameras upon loading from the server', () => {
    const cameras = [createFakeCamera(), createFakeCamera()];

    expect(catalogSlice(initialState, {
      type: getCameras.fulfilled.type,
      payload: cameras
    }))
      .toEqual(
        {
          ...initialState,
          camerasStatus: Status.Success,
          cameras
        });
  });

  it('should update promo upon loading from the server', () => {
    const promo = [createFakePromo()];

    expect(catalogSlice(initialState, {
      type: getPromo.fulfilled.type,
      payload: promo
    }))
      .toEqual(
        {
          ...initialState,
          promoStatus: Status.Success,
          promo
        });
  });

  it('should set camerasStatus to loading', () => {
    expect(catalogSlice(initialState, { type: getCameras.pending.type }))
      .toEqual({ ...initialState, camerasStatus: Status.Loading });
  });

  it('should set camerasStatus to error', () => {
    expect(catalogSlice(initialState, { type: getCameras.rejected.type }))
      .toEqual({ ...initialState, camerasStatus: Status.Error });
  });

  it('should set promoStatus to loading', () => {
    expect(catalogSlice(initialState, { type: getPromo.pending.type }))
      .toEqual({ ...initialState, promoStatus: Status.Loading });
  });

  it('should set promoStatus to error', () => {
    expect(catalogSlice(initialState, { type: getPromo.rejected.type }))
      .toEqual({ ...initialState, promoStatus: Status.Error });
  });
});
