import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES } from "@/lib/constants";
import { commonService } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTeamWorkspaces = createAsyncThunk(
  "teamWorkspace/getTeamWorkspace",
  async (_, thunkAPI) => {
    try {
      const response = await commonService(
        API_ROUTES.GET_ALL_TEAM_WORKSPACES,
        API_TYPES.GET
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const teamWorkspaceSlice = createSlice({
  name: "teamWorkspace",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamWorkspaces.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchTeamWorkspaces.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamWorkspaceSlice.reducer;
