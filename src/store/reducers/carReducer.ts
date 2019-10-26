import {
  LOAD_CAR_DETAILS_ERROR_ACTION_TYPE,
  CAR_ACTIONS,
  LOAD_CAR_DETAILS_LOADING_ACTION_TYPE,
  LOAD_CAR_DETAILS_SUCCESS_ACTION_TYPE
} from "../actions/carActions";
import { Action } from "../index";
import { Car } from "../../models/Car";

type carReducerState = { car: Car | null; isLoading: boolean; error: string };

const defaultCarReducerState: carReducerState = {
  car: null,
  isLoading: false,
  error: ""
};

export const carReducer = (
  state: carReducerState = defaultCarReducerState,
  action: Action
): carReducerState => {
  switch (action.type) {
    case LOAD_CAR_DETAILS_LOADING_ACTION_TYPE:
      return { isLoading: true, car: null, error: "" };
    case LOAD_CAR_DETAILS_SUCCESS_ACTION_TYPE:
      return { isLoading: false, car: action.payload, error: "" };
    case LOAD_CAR_DETAILS_ERROR_ACTION_TYPE:
      return { isLoading: false, car: null, error: action.payload };
    default:
      return state;
  }
};
