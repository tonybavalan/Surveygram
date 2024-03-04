import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./Reducers/workspace";
import teamWorkspaceReducer from "./Reducers/teamWorkspace";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    teamWorkspace: teamWorkspaceReducer,
  },
  // middleware: () => new Tuple(thunkMiddleware),
});
