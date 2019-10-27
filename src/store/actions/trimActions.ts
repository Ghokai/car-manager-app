import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { getApolloClient } from "../../graphqlClient";
import { getTrimQuery } from "../../graphqlClient/queries";

export const TRIM_INFORMATIONS_LOADING_ACTION_TYPE =
  "TRIM_INFORMATIONS_LOADING_ACTION";
export const TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE =
  "TRIM_INFORMATIONS_SUCCESS_ACTION";
export const TRIM_INFORMATIONS_ERROR_ACTION_TYPE =
  "TRIM_INFORMATIONS_ERROR_ACTION";

export type TRIM_INFORMATIONS_LOADING_ACTION = {
  type: string;
};

export type TRIM_INFORMATIONS_SUCCESS_ACTION = {
  type: string;
  payload: string[];
};

export type TRIM_INFORMATIONS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export const clearTrimInformations = () => ({
  type: TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE,
  payload: []
});

export const loadTrimInformations = (make: string, model: string) => async (
  dispatch: Dispatch
) => {
  const trimInformatiosLoadingAction: TRIM_INFORMATIONS_LOADING_ACTION = {
    type: TRIM_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(trimInformatiosLoadingAction);
  try {
    const response = await getApolloClient().query(getTrimQuery(make, model));

    const trimInformationSuccessAction: TRIM_INFORMATIONS_SUCCESS_ACTION = {
      type: TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE,
      payload: response.data.trim
    };
    dispatch(trimInformationSuccessAction);
  } catch (error) {
    console.log(error);
    const trimInformationsErrorAction: TRIM_INFORMATIONS_ERROR_ACTION = {
      type: TRIM_INFORMATIONS_ERROR_ACTION_TYPE,
      payload: "Trim Informations Error"
    };
    dispatch(trimInformationsErrorAction);
    toast.error("Error occured while trim informations fetching!");
  }
};
