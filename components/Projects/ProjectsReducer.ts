import type { Reducer } from "react";
import { Project } from "@/src/types/ProjectProps";

export type State = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

export const initialState: State = {
  projects: [],
  loading: true,
  error: null,
};

export type Action =
  | { type: "FETCH_SUCCESS"; payload: Project[] }
  | { type: "FETCH_ERROR"; payload: string };

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        projects: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};