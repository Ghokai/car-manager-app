import { getApolloClient } from "../../graphqlClient";
import { Dispatch } from "redux";
import { getMakeQuery } from "../../graphqlClient/queries";

export const LOAD_MAKE_INFORMATIONS_LOADING_ACTION_TYPE =
  "LOAD_MAKE_INFORMATIONS_LOADING_ACTION";
export const LOAD_MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE =
  "LOAD_MAKE_INFORMATIONS_SUCCESS_ACTION";
export const LOAD_MAKE_INFORMATIONS_ERROR_ACTION_TYPE =
  "LOAD_MAKE_INFORMATIONS_ERROR_ACTION";

export type LOAD_MAKE_INFORMATIONS_LOADING_ACTION = {
  type: string;
};

export type LOAD_MAKE_INFORMATIONS_SUCCESS_ACTION = {
  type: string;
  payload: string[];
};

export type LOAD_MAKE_INFORMATIONS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export type MAKE_ACTIONS =
  | LOAD_MAKE_INFORMATIONS_LOADING_ACTION
  | LOAD_MAKE_INFORMATIONS_SUCCESS_ACTION
  | LOAD_MAKE_INFORMATIONS_ERROR_ACTION;

export const clearMakeInformations = () => ({
  type: LOAD_MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE,
  payload: []
});

export const loadMakeInformations = () => async (dispatch: Dispatch) => {
  const loadingAction: LOAD_MAKE_INFORMATIONS_LOADING_ACTION = {
    type: LOAD_MAKE_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(loadingAction);
  try {
    const response = await getApolloClient().query(getMakeQuery());

    const loadCarDetailsSuccess: LOAD_MAKE_INFORMATIONS_SUCCESS_ACTION = {
      type: LOAD_MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE,
      payload: response.data.make
    };
    dispatch(loadCarDetailsSuccess);
  } catch (error) {
    console.log(error);
    const loadCarDetailsError: LOAD_MAKE_INFORMATIONS_ERROR_ACTION = {
      type: LOAD_MAKE_INFORMATIONS_ERROR_ACTION_TYPE,
      payload: "HATAA!!!"
    };
    dispatch(loadCarDetailsError);
  }
};
