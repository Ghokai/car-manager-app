import {
  MODEL_INFORMATIONS_LOADING_ACTION_TYPE,
  MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE,
  MODEL_INFORMATIONS_ERROR_ACTION_TYPE
} from "../actions/modelActions";
import { Action } from "../index";

type modelReducerState = { modelList: []; isLoading: boolean; error: string };

const defaultModelReducerState: modelReducerState = {
  modelList: [],
  isLoading: false,
  error: ""
};

export const modelReducer = (
  state: modelReducerState = defaultModelReducerState,
  action: Action
): modelReducerState => {
  switch (action.type) {
    case MODEL_INFORMATIONS_LOADING_ACTION_TYPE:
      return { isLoading: true, modelList: [], error: "" };
    case MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE:
      return { isLoading: false, modelList: action.payload, error: "" };
    case MODEL_INFORMATIONS_ERROR_ACTION_TYPE:
      return { isLoading: false, modelList: [], error: action.payload };
    default:
      return state;
  }
};
