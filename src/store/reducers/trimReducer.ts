import {
  LOAD_TRIM_INFORMATIONS_ERROR_ACTION_TYPE,
  LOAD_TRIM_INFORMATIONS_LOADING_ACTION_TYPE,
  LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE
} from "../actions/trimActions";
import { Action } from "../index";
import { Car } from "../../models/Car";

type trimReducerState = {
  trimList: string[];
  isLoading: boolean;
  error: string;
};

const defaultTrimReducerState: trimReducerState = {
  trimList: [],
  isLoading: false,
  error: ""
};

export const trimReducer = (
  state: trimReducerState = defaultTrimReducerState,
  action: Action
): trimReducerState => {
  switch (action.type) {
    case LOAD_TRIM_INFORMATIONS_LOADING_ACTION_TYPE:
      return { isLoading: true, trimList: [], error: "" };
    case LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE:
      return { isLoading: false, trimList: action.payload, error: "" };
    case LOAD_TRIM_INFORMATIONS_ERROR_ACTION_TYPE:
      return { isLoading: false, trimList: [], error: action.payload };
    default:
      return state;
  }
};
