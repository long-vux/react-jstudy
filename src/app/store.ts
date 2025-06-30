import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import lessonsReducer from '../features/lesson/lessonSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,  
    lessons: lessonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
