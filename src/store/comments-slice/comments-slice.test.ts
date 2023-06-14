import { createFakeComment } from '../../utiils/mock';
import { Status } from '../../consts/enums';
import commentsSlice, { changePostStatus, fetchComments, initialState, postComment } from './comments-slice';

describe('Slice: comments', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsSlice(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should update comments upon loading from the server', () => {
    const comments = [createFakeComment(), createFakeComment()];

    expect(commentsSlice(initialState, {
      type: fetchComments.fulfilled.type,
      payload: comments
    }))
      .toEqual(
        {
          ...initialState,
          commentsStatus: {
            code: '',
            status: Status.Success
          },
          comments
        });
  });

  it('should set commentStatus to loading', () => {
    expect(commentsSlice(initialState, { type: fetchComments.pending.type }))
      .toEqual({ ...initialState, commentsStatus: { status: Status.Loading, code: '' } });
  });

  it('should set commentStatus to error', () => {
    expect(commentsSlice(initialState, { type: fetchComments.rejected.type }))
      .toEqual({ ...initialState, commentsStatus: { status: Status.Error, code: '' } });
  });

  it('should set postStatus to success', () => {
    expect(commentsSlice(initialState, changePostStatus(Status.Success)))
      .toEqual({ ...initialState, postStatus: Status.Success });
  });

  it('should add a new comment', () => {
    const comment = createFakeComment();

    expect(commentsSlice(initialState, { type: postComment.fulfilled.type, payload: comment }))
      .toEqual({ ...initialState, comments: [comment]});
  });
});
