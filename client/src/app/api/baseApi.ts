import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";

type ErrorResponse = string | { title: string } | { errors: string[] };

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
    const originalStatus =
      result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

    console.log(result.error);

    const responseData = result.error.data as ErrorResponse;

    switch (originalStatus) {
      case 400:
        if (typeof responseData === "string") toast.error(responseData);
        else if ("errors" in responseData) {
          toast.error("validation error");
        } else {
          toast.error(responseData.title);
        }
        break;
      case 401:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;

      case 404:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;

      case 500:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;

      default:
        toast.error("Something went wrong");
        break;
    }
  }
  return result;
};
