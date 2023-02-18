import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../features/imagesSlice';
import formReducer from '../features/formSlice';

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
