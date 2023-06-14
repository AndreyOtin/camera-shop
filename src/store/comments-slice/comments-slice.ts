import { NewReview, Review } from '../../types/review';
import { SliceNameSpace, Status } from '../../consts/enums';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, ThunkConfig } from '../../types/store';

type InitialState = {
  comments: Review[];
  commentsStatus: {
    status: Status;
    code: string;
  };
  postStatus: Status;
}

const initialState: InitialState = {
  comments: [],
  commentsStatus: {
    status: Status.Idle,
    code: ''
  },
  postStatus: Status.Idle
};

const fetchComments = createAsyncThunk<Review[], string, ThunkConfig>(
  `${SliceNameSpace.Comments}/fetchComments`,
  async (cameraId, { extra: api }) => {
    const { data } = await api.getReviews(cameraId);

    return data;
  }
);

const postComment = createAsyncThunk<Review, NewReview, ThunkConfig>(
  `${SliceNameSpace.Comments}/postComment`,
  async (newComment, { extra: api }) => {
    const { data } = await api.postReview(newComment);

    return data;
  }
);

const commentsSlice = createSlice({
  initialState,
  name: SliceNameSpace.Comments,
  reducers: {
    changePostStatus(state, action: PayloadAction<Status>) {
      state.postStatus = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.commentsStatus.status = Status.Loading;

      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus.status = Status.Error;

        if (action.error?.message) {
          state.commentsStatus.code = action.error.message;
        }
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus.status = Status.Success;
        state.comments = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  }
});

const selectComments = (state: RootState) => state[SliceNameSpace.Comments].comments;
const selectCommentsStatus = (state: RootState) => state[SliceNameSpace.Comments].commentsStatus;
const selectPostStatus = (state: RootState) => state[SliceNameSpace.Comments].postStatus;

export default commentsSlice.reducer;
export { selectComments, selectCommentsStatus, fetchComments, postComment, selectPostStatus, initialState };
export const { changePostStatus } = commentsSlice.actions;
