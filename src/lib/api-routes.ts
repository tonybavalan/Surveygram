export const API_ROUTES = {
  AUTH_LOGIN: "auth/login",
  AUTH_REGISTER: "/auth/signup",
  AUTH_GOOGLE_LOGIN: "/auth/socialLogin",
  GET_ALL_WORKSPACES: "/surveyServices/getAllWorkspaces",
  GET_ALL_TEAM_WORKSPACES: "/surveyServices/getAllTeamWorkspaces",
  SEND_RESET_MAIL: "/auth/sendForgotPasswordEmail",
  CREATE_WORKSPACE: "/surveyServices/createWorkSpace",
  CREATE_TEAM_WORKSPACE: "/surveyServices/createTeamWorkSpace",
  VERIFY_ACCOUNT: "/auth/activate",
  RENAME_WORKSPACE: (workspaceId: any, email: string) =>
    `/surveyServices/${workspaceId}/renameWorkSpace/${email}`,
  RENAME_TEAM_WORKSPACE: (workspaceId: any, email: string) =>
    `/surveyServices/${workspaceId}/renameTeamWorkSpace/${email}`,
  DELETE_WORKSPACE: "/surveyServices/deleteWorkspace/",
  DELETE_TEAM_WORKSPACE: "/surveyServices/deleteTeamWorkspace/",
  SHARE_WORKSPACE: (workspaceName: string | null, email: string) =>
    `/surveyServices/${workspaceName}/shareWorkSpace/${email}`,
  JOIN_WORKSPACE: (teamWorkspaceName: string | null, email: string) =>
    `/surveyServices/${teamWorkspaceName}/joinTeamWorkSpace/${email}`,
  CREATE_SURVEY: (workspaceId: string | null) =>
    `/surveyRecord/${workspaceId}/createNewSurvey`,
  GET_ALL_SURVEYS: (
    workspaceId: string | null,
    pageNo: number | null,
    count: number | null
  ) =>
    `/surveyRecord/${workspaceId}/getAllSurveyRecordsOfWorkSpace?pageNo=${pageNo}&count=${count}`,
  RENAME_SURVEY: (
    workspaceId: string | null,
    surveyId: string | null,
    newSurveyName: string
  ) =>
    `/surveyRecord/${workspaceId}/renameNewSurvey/${surveyId}/${newSurveyName}`,
  DELETE_SURVEY: (workspaceId: string | null, surveyId: string | null) =>
    `/surveyRecord/${workspaceId}/deleteSurverRecord/${surveyId}`,
  CREATE_DUPLICATE_SURVEY: (
    workspaceId: string | null,
    surveyId: string | null
  ) => `/surveyRecord/${workspaceId}/duplicateSurveyRecord/${surveyId}`,
  MOVE_SURVEY: (
    sourceWorkspaceId: string | null,
    surveyId: string | null,
    destinationWorkspaceId: string | null
  ) =>
    `/surveyRecord/${sourceWorkspaceId}/${surveyId}/surveyRecordMoveToWorkSpace/${destinationWorkspaceId}`,
};
