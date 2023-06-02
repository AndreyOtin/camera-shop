import { Review } from '../../types/review';
import { SliceNameSpace, Status } from '../../consts/enums';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, ThunkConfig } from '../../types/store';

type InitialState = {
  comments: Review[];
  commentsStatus: {
    status: Status;
    code: string;
  };
}

const initialState: InitialState = {
  comments: [],
  commentsStatus: {
    status: Status.Idle,
    code: ''
  }
};

const fetchComments = createAsyncThunk<Review[], number, ThunkConfig>(
  `${SliceNameSpace.Comments}/fetchComments`,
  async (cameraId, { extra: api }) => {
    const { data } = await api.getReviews(cameraId);

    return data;
  }
);

const commentsSlice = createSlice({
  initialState,
  name: SliceNameSpace.Comments,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.commentsStatus.status = Status.Loading;

      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus.status = Status.Error;

        if (action.error.message) {
          state.commentsStatus.code = action.error.message;
        }
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus.status = Status.Success;
        state.comments = action.payload;
      });
  }
});

const selectComments = (state: RootState) => state[SliceNameSpace.Comments].comments;
const selectCommentsStatus = (state: RootState) => state[SliceNameSpace.Comments].commentsStatus;

export default commentsSlice.reducer;
export { selectComments, selectCommentsStatus, fetchComments };
