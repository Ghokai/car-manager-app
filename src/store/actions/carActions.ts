import { Dispatch } from "redux";
import { getApolloClient } from "../../graphqlClient";
import { getUpdateCarMutation } from "../../graphqlClient/mutations";
import { getCarDetailsQuery } from "../../graphqlClient/queries";
import { Car, CarInput } from "../../models/Car";

export const LOAD_CAR_DETAILS_LOADING_ACTION_TYPE =
  "LOAD_CAR_DETAILS_LOADING_ACTION";
export const LOAD_CAR_DETAILS_SUCCESS_ACTION_TYPE =
  "LOAD_CAR_DETAILS_SUCCESS_ACTION";
export const LOAD_CAR_DETAILS_ERROR_ACTION_TYPE =
  "LOAD_CAR_DETAILS_ERROR_ACTION";

export type LOAD_CAR_DETAILS_LOADING_ACTION = {
  type: string;
};

export type LOAD_CAR_DETAILS_SUCCESS_ACTION = {
  type: string;
  payload: Car;
};

export type LOAD_CAR_DETAILS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export type CAR_ACTIONS =
  | LOAD_CAR_DETAILS_LOADING_ACTION
  | LOAD_CAR_DETAILS_SUCCESS_ACTION
  | LOAD_CAR_DETAILS_ERROR_ACTION;

export const loadCarDetailsAction = (carId: string) => async (
  dispatch: Dispatch
) => {
  const loadCarDetailsLoading: LOAD_CAR_DETAILS_LOADING_ACTION = {
    type: LOAD_CAR_DETAILS_LOADING_ACTION_TYPE
  };
  dispatch(loadCarDetailsLoading);

  try {
    const response = await getApolloClient().query(getCarDetailsQuery(carId));

    const loadCarDetailsSuccess: LOAD_CAR_DETAILS_SUCCESS_ACTION = {
      type: LOAD_CAR_DETAILS_SUCCESS_ACTION_TYPE,
      payload: response.data.car
    };
    dispatch(loadCarDetailsSuccess);
  } catch (error) {
    console.log(error);
    const loadCarDetailsError: LOAD_CAR_DETAILS_ERROR_ACTION = {
      type: LOAD_CAR_DETAILS_ERROR_ACTION_TYPE,
      payload: "HATAA!!!"
    };
    dispatch(loadCarDetailsError);
  }
};

export const updateCarAction = (carInput: CarInput) => async (
  dispatch: Dispatch
) => {
  const loadCarDetailsLoading: LOAD_CAR_DETAILS_LOADING_ACTION = {
    type: LOAD_CAR_DETAILS_LOADING_ACTION_TYPE
  };
  dispatch(loadCarDetailsLoading);

  try {
    const response = await getApolloClient().mutate(
      getUpdateCarMutation(carInput)
    );

    const loadCarDetailsSuccess: LOAD_CAR_DETAILS_SUCCESS_ACTION = {
      type: LOAD_CAR_DETAILS_SUCCESS_ACTION_TYPE,
      payload: response.data.updateCar
    };
    dispatch(loadCarDetailsSuccess);
  } catch (error) {
    console.log(error);
    const loadCarDetailsError: LOAD_CAR_DETAILS_ERROR_ACTION = {
      type: LOAD_CAR_DETAILS_ERROR_ACTION_TYPE,
      payload: "Error!!!"
    };
    dispatch(loadCarDetailsError);
  }
};
