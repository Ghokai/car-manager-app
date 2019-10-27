import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { getApolloClient } from "../../graphqlClient";
import { getModelQuery } from "../../graphqlClient/queries";

export const MODEL_INFORMATIONS_LOADING_ACTION_TYPE =
  "MODEL_INFORMATIONS_LOADING_ACTION";
export const MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE =
  "MODEL_INFORMATIONS_SUCCESS_ACTION";
export const MODEL_INFORMATIONS_ERROR_ACTION_TYPE =
  "MODEL_INFORMATIONS_ERROR_ACTION";

export type MODEL_INFORMATIONS_LOADING_ACTION = {
  type: string;
};

export type MODEL_INFORMATIONS_SUCCESS_ACTION = {
  type: string;
  payload: string[];
};

export type MODEL_INFORMATIONS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export const clearModelInformations = () => ({
  type: MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE,
  payload: []
});

export const loadModelInformations = (make: string) => async (
  dispatch: Dispatch
) => {
  const modelInformationsLoadingAction: MODEL_INFORMATIONS_LOADING_ACTION = {
    type: MODEL_INFORMATIONS_LOADING_ACTION_TYPE
  };
  dispatch(modelInformationsLoadingAction);
  try {
    const response = await getApolloClient().query(getModelQuery(make));

    const modelInformationsSuccessAction: MODEL_INFORMATIONS_SUCCESS_ACTION = {
      type: MODEL_INFORMATIONS_SUCCESS_ACTION_TYPE,
      payload: response.data.model
    };
    dispatch(modelInformationsSuccessAction);
  } catch (error) {
    console.log(error);
    const modelInformationsErrorAction: MODEL_INFORMATIONS_ERROR_ACTION = {
      type: MODEL_INFORMATIONS_ERROR_ACTION_TYPE,
      payload: "Model Informations Error"
    };
    dispatch(modelInformationsErrorAction);
    toast.error("Error occured while model informations fetching!");
  }
};
