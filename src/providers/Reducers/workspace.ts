import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES } from "@/lib/constants";
import { commonService } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllWorkspace = createAsyncThunk(
  "workspace/getAllWorkspace",
  async (_, thunkAPI) => {
    try {
      const response = await commonService(
        API_ROUTES.GET_ALL_WORKSPACES,
        API_TYPES.GET
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWorkspace.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllWorkspace.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workspaceSlice.reducer;
