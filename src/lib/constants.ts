export const API_TYPES = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

export const REGEX = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z!@#$%^&*]).{8,}$/,
};

export const tabOptions = [
  {
    name: "I'm a creator",
    key: "creator",
  },
  {
    name: "I'm a participant",
    key: "participant",
  },
];

export const surveyTypeList = [
  "EMAIL",
  "CONTACT_INFO",
  "ADDRESS",
  "PHONE_NUMBER",
  "WEBSITE",
  "MATRIX",
  "RANKING",
];

export const SURVEY_TAB_LIST = [
  {
    type: "ALL",
    name: "All",
  },
  {
    type: "DRAFT",
    name: "Draft",
  },
  {
    type: "RUNNING",
    name: "Running",
  },
  {
    type: "COMPLETED",
    name: "Completed",
  },
  {
    type: "DELETED",
    name: "Deleted",
  },
];
