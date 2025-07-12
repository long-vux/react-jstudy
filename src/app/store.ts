import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/user-slice';
import lessonsReducer from '../features/lesson/lesson-slice';
import exerciseReducer from '../features/exercise/exercise-slice';
import commentReducer from '../features/comment/comment-slice';

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
