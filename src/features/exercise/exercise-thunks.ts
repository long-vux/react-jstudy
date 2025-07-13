import { createAsyncThunk } from '@reduxjs/toolkit';
import exerciseAPI from './exercise-api';

export const getExerciseById = createAsyncThunk(
  'exercise/fetchById',
  async (id: string) => {
    const res = await exerciseAPI.fetchExerciseById(id);
    console.log('exercise: ', res.data)
    return res.data;
  }
);

export const submitCode = createAsyncThunk(
  'exercise/submitCode',
  async ({ exerciseId, userCode }: { exerciseId: string; userCode: string }) => {
    const res = await exerciseAPI.submitCode(exerciseId, userCode);
    return res.data;
  }
);