import type { Reducer } from "react";
import { Experience } from "@/src/types/ExperienceProps";

export type State = {
  experience: Experience[];
  loading: boolean;
  error: string | null;
};

export const initialState: State = {
  experience: [],
  loading: true,
  error: null,
};

export type Action =
  | { type: "FETCH_SUCCESS"; payload: Experience[] }
  | { type: "FETCH_ERROR"; payload: string };

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        experience: action.payload,
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
}
