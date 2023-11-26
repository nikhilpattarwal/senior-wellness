import { configureStore } from '@reduxjs/toolkit';
import { medicationReducer } from '../redux/reducer/medicationReducer';
export const store = configureStore({
  reducer: {
    medicationReducer
  },
});
