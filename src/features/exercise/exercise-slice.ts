import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    return res;
  }
);

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    current: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExerciseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExerciseById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getExerciseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching exercise';
      })

      .addCase(submitCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.loading = false;
        state.current.results = action.payload;
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error submitting code';
      });
  },
});

export default exerciseSlice.reducer;