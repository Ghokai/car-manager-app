import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { getApolloClient } from "../../graphqlClient";
import { getUpdateCarMutation } from "../../graphqlClient/mutations";
import { getCarDetailsQuery } from "../../graphqlClient/queries";
import { Car, CarInput } from "../../models/Car";

export const CAR_INFORMATIONS_LOADING_ACTION_TYPE =
  "CAR_INFORMATIONS_LOADING_ACTION";
export const CAR_INFORMATIONS_LOADING_SUCCESS_ACTION_TYPE =
  "CAR_INFORMATIONS_LOADING_SUCCESS_ACTION";
export const CAR_INFORMATIONS_LOADING_ERROR_ACTION_TYPE =
  "CAR_INFORMATIONS_LOADING_SUCCESS_ACTION";

export type CAR_INFORMATIONS_LOADING_ACTION = {
  type: string;
};

export type CAR_INFORMATIONS_LOADING_SUCCESS_ACTION = {
  type: string;
  payload: Car;
};

export type CAR_INFORMATIONS_LOADING_ERROR_ACTION = {
  type: string;
  payload: string;
};

export const loadCarInformationsAction = (carId: string) => async (
  dispatch: Dispatch
) => {
  const carInformationsLoading: CAR_INFORMATIONS_LOADING_ACTION = {
    type: CAR_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(carInformationsLoading);

  try {
    const response = await getApolloClient().query(getCarDetailsQuery(carId));

    const carInformationsLoadingSuccess: CAR_INFORMATIONS_LOADING_SUCCESS_ACTION = {
      type: CAR_INFORMATIONS_LOADING_SUCCESS_ACTION_TYPE,
      payload: response.data.car
    };
    dispatch(carInformationsLoadingSuccess);
  } catch (error) {
    console.log(error);
    const carInformationsLoadingError: CAR_INFORMATIONS_LOADING_ERROR_ACTION = {
      type: CAR_INFORMATIONS_LOADING_ERROR_ACTION_TYPE,
      payload: "Car Informations Error!"
    };
    dispatch(carInformationsLoadingError);
    toast.error("Error occured while car informations fetching!");
  }
};

export const updateCarInformationsAction = (carInput: CarInput) => async (
  dispatch: Dispatch
) => {
  const carInformationsLoading: CAR_INFORMATIONS_LOADING_ACTION = {
    type: CAR_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(carInformationsLoading);

  try {
    const response = await getApolloClient().mutate(
      getUpdateCarMutation(carInput)
    );

    const loadCarDetailsSuccess: CAR_INFORMATIONS_LOADING_SUCCESS_ACTION = {
      type: CAR_INFORMATIONS_LOADING_SUCCESS_ACTION_TYPE,
      payload: response.data.updateCar
    };
    dispatch(loadCarDetailsSuccess);
    toast.success("Car informations updated!");
  } catch (error) {
    console.log(error);
    const loadCarDetailsError: CAR_INFORMATIONS_LOADING_ERROR_ACTION = {
      type: CAR_INFORMATIONS_LOADING_ERROR_ACTION_TYPE,
      payload: "Car Update Error"
    };
    dispatch(loadCarDetailsError);
    toast.error("Error occured while car informations updating!");
  }
};
