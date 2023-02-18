/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImagesState {
  images: string[]
}

const initialState: ImagesState = {
  images: [],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    initImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload;
    },
  },
});

export const { initImages } = imageSlice.actions;
export default imageSlice.reducer;
