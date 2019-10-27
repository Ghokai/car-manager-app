import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { getApolloClient } from "../../graphqlClient";
import { getMakeQuery } from "../../graphqlClient/queries";

export const MAKE_INFORMATIONS_LOADING_ACTION_TYPE =
  "MAKE_INFORMATIONS_LOADING_ACTION";
export const MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE =
  "MAKE_INFORMATIONS_SUCCESS_ACTION";
export const MAKE_INFORMATIONS_ERROR_ACTION_TYPE =
  "MAKE_INFORMATIONS_ERROR_ACTION";

export type MAKE_INFORMATIONS_LOADING_ACTION = {
  type: string;
};

export type MAKE_INFORMATIONS_SUCCESS_ACTION = {
  type: string;
  payload: string[];
};

export type MAKE_INFORMATIONS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export const clearMakeInformations = () => ({
  type: MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE,
  payload: []
});

export const loadMakeInformations = () => async (dispatch: Dispatch) => {
  const makeInformationsLoadingAction: MAKE_INFORMATIONS_LOADING_ACTION = {
    type: MAKE_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(makeInformationsLoadingAction);
  try {
    const response = await getApolloClient().query(getMakeQuery());

    const makeInformationsSuccessActions: MAKE_INFORMATIONS_SUCCESS_ACTION = {
      type: MAKE_INFORMATIONS_SUCCESS_ACTION_TYPE,
      payload: response.data.make
    };
    dispatch(makeInformationsSuccessActions);
  } catch (error) {
    console.log(error);
    const makeInformationsErrorAction: MAKE_INFORMATIONS_ERROR_ACTION = {
      type: MAKE_INFORMATIONS_ERROR_ACTION_TYPE,
      payload: "Make Informations Error"
    };
    dispatch(makeInformationsErrorAction);
    toast.error("Error occured while make informations fetching!");
  }
};
