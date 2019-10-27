import { Dispatch } from "redux";
import { getApolloClient } from "../../graphqlClient";
import {
  getCreateTaskMutation,
  getUpdateTaskMutation
} from "../../graphqlClient/mutations";
import { getCarTasksQuery } from "../../graphqlClient/queries";
import { Task, TaskInput } from "../../models/Task";

export const LOAD_TASK_DETAILS_LOADING_ACTION_TYPE =
  "LOAD_TASK_DETAILS_LOADING_ACTION";
export const LOAD_TASK_DETAILS_SUCCESS_ACTION_TYPE =
  "LOAD_TASK_DETAILS_SUCCESS_ACTION";
export const LOAD_TASK_DETAILS_ERROR_ACTION_TYPE =
  "LOAD_TASK_DETAILS_ERROR_ACTION";

export const UPDATE_TASK_UPDATING_ACTION_TYPE = "UPDATE_TASK_UPDATING_ACTION";
export const UPDATE_TASK_SUCCESS_ACTION_TYPE = "UPDATE_TASK_SUCCESS_ACTION";

export type UPDATE_TASK_UPDATING_ACTION = {
  type: string;
};

export type UPDATE_TASK_SUCCESS_ACTION = {
  type: string;
  payload: { id: string; completed: boolean };
};

export type LOAD_TASK_DETAILS_LOADING_ACTION = {
  type: string;
};

export type LOAD_TASK_DETAILS_SUCCESS_ACTION = {
  type: string;
  payload: Task[];
};

export type LOAD_TASK_DETAILS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export type TASK_ACTIONS =
  | LOAD_TASK_DETAILS_LOADING_ACTION
  | LOAD_TASK_DETAILS_SUCCESS_ACTION
  | LOAD_TASK_DETAILS_ERROR_ACTION;

export const loadCarTasksAction = (carId: string) => async (
  dispatch: Dispatch
) => {
  const loadTaskDetailsLoading: LOAD_TASK_DETAILS_LOADING_ACTION = {
    type: LOAD_TASK_DETAILS_LOADING_ACTION_TYPE
  };
  dispatch(loadTaskDetailsLoading);

  try {
    const response = await getApolloClient().query(getCarTasksQuery(carId));

    const loadTaskDetailsSuccess: LOAD_TASK_DETAILS_SUCCESS_ACTION = {
      type: LOAD_TASK_DETAILS_SUCCESS_ACTION_TYPE,
      payload: response.data.tasks
    };
    dispatch(loadTaskDetailsSuccess);
  } catch (error) {
    console.log(error);
    const loadTaskDetailsError: LOAD_TASK_DETAILS_ERROR_ACTION = {
      type: LOAD_TASK_DETAILS_ERROR_ACTION_TYPE,
      payload: "HATAA!!!"
    };
    dispatch(loadTaskDetailsError);
  }
};

export const updateTaskAction = (taskId: string, completed: boolean) => async (
  dispatch: Dispatch
) => {
  const taskUpdatingAction: UPDATE_TASK_UPDATING_ACTION = {
    type: UPDATE_TASK_UPDATING_ACTION_TYPE
  };
  dispatch(taskUpdatingAction);

  try {
    const response = await getApolloClient().mutate(
      getUpdateTaskMutation(taskId, completed)
    );

    const updateTaskAction: UPDATE_TASK_SUCCESS_ACTION = {
      type: UPDATE_TASK_SUCCESS_ACTION_TYPE,
      payload: { id: taskId, completed }
    };
    dispatch(updateTaskAction);
  } catch (error) {
    console.log(error);
    const loadTaskDetailsError: LOAD_TASK_DETAILS_ERROR_ACTION = {
      type: LOAD_TASK_DETAILS_ERROR_ACTION_TYPE,
      payload: "HATAA!!!"
    };
    dispatch(loadTaskDetailsError);
  }
};

export const createTaskAction = (carId: string, taskInput: TaskInput) => async (
  dispatch: Dispatch
) => {
  const loadTaskDetailsLoading: LOAD_TASK_DETAILS_LOADING_ACTION = {
    type: LOAD_TASK_DETAILS_LOADING_ACTION_TYPE
  };
  dispatch(loadTaskDetailsLoading);

  try {
    const responseId = await getApolloClient().mutate(
      getCreateTaskMutation(carId, taskInput)
    );

    const response = await getApolloClient().query(getCarTasksQuery(carId));
    console.log(response);
    const loadTaskDetailsSuccess: LOAD_TASK_DETAILS_SUCCESS_ACTION = {
      type: LOAD_TASK_DETAILS_SUCCESS_ACTION_TYPE,
      payload: response.data.tasks
    };
    dispatch(loadTaskDetailsSuccess);
  } catch (error) {
    console.log(error);
    const loadTaskDetailsError: LOAD_TASK_DETAILS_ERROR_ACTION = {
      type: LOAD_TASK_DETAILS_ERROR_ACTION_TYPE,
      payload: "Hata!!!"
    };
    dispatch(loadTaskDetailsError);
  }
};
