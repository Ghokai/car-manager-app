import { Car } from "../../models/Car";
import { CAR_INFORMATIONS_LOADING_ACTION_TYPE, CAR_INFORMATIONS_LOADING_ERROR_ACTION_TYPE, CAR_INFORMATIONS_LOADING_SUCCESS_ACTION_TYPE } from "../actions/carActions";
import { Action } from "../index";

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
    case CAR_INFORMATIONS_LOADING_ACTION_TYPE:
      return { isLoading: true, car: null, error: "" };
    case CAR_INFORMATIONS_LOADING_SUCCESS_ACTION_TYPE:
      return { isLoading: false, car: action.payload, error: "" };
    case CAR_INFORMATIONS_LOADING_ERROR_ACTION_TYPE:
      return { isLoading: false, car: null, error: action.payload };
    default:
      return state;
  }
};
