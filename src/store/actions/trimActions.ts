import { getApolloClient } from "../../graphqlClient";
import { Dispatch } from "redux";
import { getTrimQuery } from "../../graphqlClient/queries";

export const LOAD_TRIM_INFORMATIONS_LOADING_ACTION_TYPE =
  "LOAD_TRIM_INFORMATIONS_LOADING_ACTION";
export const LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE =
  "LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION";
export const LOAD_TRIM_INFORMATIONS_ERROR_ACTION_TYPE =
  "LOAD_TRIM_INFORMATIONS_ERROR_ACTION";

export type LOAD_TRIM_INFORMATIONS_LOADING_ACTION = {
  type: string;
};

export type LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION = {
  type: string;
  payload: string[];
};

export type LOAD_TRIM_INFORMATIONS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export type TRIM_ACTIONS =
  | LOAD_TRIM_INFORMATIONS_LOADING_ACTION
  | LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION
  | LOAD_TRIM_INFORMATIONS_ERROR_ACTION;

export const clearTrimInformations = () => ({
  type: LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE,
  payload: []
});

export const loadTrimInformations = (make: string, model: string) => async (
  dispatch: Dispatch
) => {
  const loadingAction: LOAD_TRIM_INFORMATIONS_LOADING_ACTION = {
    type: LOAD_TRIM_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(loadingAction);
  try {
    const response = await getApolloClient().query(getTrimQuery(make, model));

    const loadSuccessAction: LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION = {
      type: LOAD_TRIM_INFORMATIONS_SUCCESS_ACTION_TYPE,
      payload: response.data.trim
    };
    dispatch(loadSuccessAction);
  } catch (error) {
    console.log(error);
    const loadErrorAction: LOAD_TRIM_INFORMATIONS_ERROR_ACTION = {
      type: LOAD_TRIM_INFORMATIONS_ERROR_ACTION_TYPE,
      payload: "Error!!!"
    };
    dispatch(loadErrorAction);
  }
};
