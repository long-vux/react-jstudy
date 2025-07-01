import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import lessonsReducer from '../features/lesson/lessonSlice';
import exerciseReducer from '../features/exercise/exerciseSlice';
import commentReducer from '../features/comment/commentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,  
    lessons: lessonsReducer,
    exercise: exerciseReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
