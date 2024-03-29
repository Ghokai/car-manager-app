import { MAKE_INFORMATIONS_ERROR_ACTION_TYPE, MAKE_INFORMATIONS_LOADING_ACTION_TYPE, MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE } from "../actions/makeActions";
import { Action } from "../index";

type makeReducerState = { makeList: []; isLoading: boolean; error: string };

const defaultMakeReducerState: makeReducerState = {
  makeList: [],
  isLoading: false,
  error: ""
};

export const makeReducer = (
  state: makeReducerState = defaultMakeReducerState,
  action: Action
): makeReducerState => {
  switch (action.type) {
    case MAKE_INFORMATIONS_LOADING_ACTION_TYPE:
      return { isLoading: true, makeList: [], error: "" };
    case MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE:
      return { isLoading: false, makeList: action.payload, error: "" };
    case MAKE_INFORMATIONS_ERROR_ACTION_TYPE:
      return { isLoading: false, makeList: [], error: action.payload };
    default:
      return state;
  }
};
