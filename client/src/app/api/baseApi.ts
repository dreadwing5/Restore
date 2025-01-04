import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  //start loading
  api.dispatch(startLoading());

  await sleep(1000);
  //api args give access to redux store
  const result = await customBaseQuery(args, api, extraOptions);

  //stop loading
  api.dispatch(stopLoading());
  if (result.error) {
    const { status, data } = result.error;
    console.log(status, data);
  }
  return result;
};
