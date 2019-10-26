import { getApolloClient } from "../../graphqlClient";
import { Dispatch } from "redux";
import { getModelQuery } from "../../graphqlClient/queries";

export const LOAD_MODEL_INFORMATIONS_LOADING_ACTION_TYPE =
  "LOAD_MODEL_INFORMATIONS_LOADING_ACTION";
export const LOAD_MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE =
  "LOAD_MODEL_INFORMATIONS_SUCCESS_ACTION";
export const LOAD_MODEL_INFORMATIONS_ERROR_ACTION_TYPE =
  "LOAD_MODEL_INFORMATIONS_ERROR_ACTION";

export type LOAD_MODEL_INFORMATIONS_LOADING_ACTION = {
  type: string;
};

export type LOAD_MODEL_INFORMATIONS_SUCCESS_ACTION = {
  type: string;
  payload: string[];
};

export type LOAD_MODEL_INFORMATIONS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export type MODEL_ACTIONS =
  | LOAD_MODEL_INFORMATIONS_LOADING_ACTION
  | LOAD_MODEL_INFORMATIONS_SUCCESS_ACTION
  | LOAD_MODEL_INFORMATIONS_ERROR_ACTION;

export const clearModelInformations = () => ({
  type: LOAD_MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE,
  payload: []
});

export const loadModelInformations = (make: string) => async (
  dispatch: Dispatch
) => {
  const loadingAction: LOAD_MODEL_INFORMATIONS_LOADING_ACTION = {
    type: LOAD_MODEL_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(loadingAction);
  try {
    const response = await getApolloClient().query(getModelQuery(make));

    const loadSuccessAction: LOAD_MODEL_INFORMATIONS_SUCCESS_ACTION = {
      type: LOAD_MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE,
      payload: response.data.model
    };
    dispatch(loadSuccessAction);
  } catch (error) {
    console.log(error);
    const loadErrorAction: LOAD_MODEL_INFORMATIONS_ERROR_ACTION = {
      type: LOAD_MODEL_INFORMATIONS_ERROR_ACTION_TYPE,
      payload: "Error!!!"
    };
    dispatch(loadErrorAction);
  }
};
