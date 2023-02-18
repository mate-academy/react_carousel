/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  shift: 0,
  animationDuration: 1000,
  infinite: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setFrameSize: (state, action: PayloadAction<number>) => {
      state.frameSize = action.payload;
    },
    setItemWidth: (state, action: PayloadAction<number>) => {
      state.itemWidth = action.payload;
    },
    setShift: (state, action: PayloadAction<number>) => {
      state.shift = action.payload;
    },
    setAnimationDuration: (state, action: PayloadAction<number>) => {
      state.animationDuration = action.payload;
    },
    setInfinite: (state) => {
      state.infinite = !state.infinite;
    },
  },
});

export const {
  setStep,
  setItemWidth,
  setFrameSize,
  setShift,
  setAnimationDuration,
  setInfinite,
} = formSlice.actions;

export default formSlice.reducer;
