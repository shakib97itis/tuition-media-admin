import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import {
  adminUsersApiSlice,
  authApiSlice,
  jobApiSlice,
  jobApplicationApiSlice,
  leadApiSlice,
  teacherApiSlice,
} from "../api/httpSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const rootReducers = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [leadApiSlice.reducerPath]: leadApiSlice.reducer,
  [jobApiSlice.reducerPath]: jobApiSlice.reducer,
  [adminUsersApiSlice.reducerPath]: adminUsersApiSlice.reducer,
  [teacherApiSlice.reducerPath]: teacherApiSlice.reducer,
  [jobApplicationApiSlice.reducerPath]: jobApplicationApiSlice.reducer,
  auth: persistedAuthReducer,
});

export const rootMiddlewares = [
  authApiSlice.middleware,
  leadApiSlice.middleware,
  jobApiSlice.middleware,
  adminUsersApiSlice.middleware,
  teacherApiSlice.middleware,
  jobApplicationApiSlice.middleware,
];
