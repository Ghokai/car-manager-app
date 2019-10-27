import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { getApolloClient } from "../../graphqlClient";
import { getCreateTaskMutation, getUpdateTaskMutation } from "../../graphqlClient/mutations";
import { getCarTasksQuery } from "../../graphqlClient/queries";
import { Task, TaskInput } from "../../models/Task";

export const TASK_DETAILS_LOADING_ACTION_TYPE = "TASK_DETAILS_LOADING_ACTION";
export const TASK_DETAILS_SUCCESS_ACTION_TYPE = "TASK_DETAILS_SUCCESS_ACTION";
export const TASK_DETAILS_ERROR_ACTION_TYPE = "TASK_DETAILS_ERROR_ACTION";

export const TASK_PROCESS_LOADING_ACTION_TYPE = "TASK_UPDATE_LOADING_ACTION";
export const TASK_UPDATE_SUCCESS_ACTON_TYPE = "TASK_UPDATE_SUCCESS_ACTION";
export const TASK_CREATE_SUCCESS_ACTON_TYPE = "TASK_CREATE_SUCCESS_ACTION";

export type TASK_DETAILS_LOADING_ACTION = {
  type: string;
};

export type TASK_DETAILS_SUCCESS_ACTION = {
  type: string;
  payload: Task[];
};

export type TASK_DETAILS_ERROR_ACTION = {
  type: string;
  payload: string;
};

export type TASK_PROCESS_LOADING_ACTION = {
  type: string;
};

export type TASK_UPDATE_SUCCESS_ACTON = {
  type: string;
  payload: { id: string; completed: boolean };
};

export type TASK_CREATE_SUCCESS_ACTON = {
  type: string;
  payload: Task;
};

export const loadCarTasksAction = (carId: string) => async (
  dispatch: Dispatch
) => {
  const taskDetailsLoadingAction: TASK_DETAILS_LOADING_ACTION = {
    type: TASK_DETAILS_LOADING_ACTION_TYPE
  };
  dispatch(taskDetailsLoadingAction);

  try {
    const response = await getApolloClient().query(getCarTasksQuery(carId));

    const taskDetailsSuccessAction: TASK_DETAILS_SUCCESS_ACTION = {
      type: TASK_DETAILS_SUCCESS_ACTION_TYPE,
      payload: response.data.tasks
    };
    dispatch(taskDetailsSuccessAction);
  } catch (error) {
    console.log(error);
    const taskDetailsErrorAction: TASK_DETAILS_ERROR_ACTION = {
      type: TASK_DETAILS_ERROR_ACTION_TYPE,
      payload: "Task Details Error Action"
    };
    dispatch(taskDetailsErrorAction);
    toast.error("Error occured while task informations are fetching!");
  }
};

export const updateTaskAction = (taskId: string, completed: boolean) => async (
  dispatch: Dispatch
) => {
  const taskProcessLoadingAction: TASK_PROCESS_LOADING_ACTION = {
    type: TASK_PROCESS_LOADING_ACTION_TYPE
  };
  dispatch(taskProcessLoadingAction);

  try {
    const response = await getApolloClient().mutate(
      getUpdateTaskMutation(taskId, completed)
    );
    console.log(response);

    const updateTaskAction: TASK_UPDATE_SUCCESS_ACTON = {
      type: TASK_UPDATE_SUCCESS_ACTON_TYPE,
      payload: { id: taskId, completed }
    };
    dispatch(updateTaskAction);
    toast.success("Task updated successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Error occured while task is updating!");
  }
};

export const createTaskAction = (carId: string, taskInput: TaskInput) => async (
  dispatch: Dispatch
) => {
  const taskProcessLoadingAction: TASK_PROCESS_LOADING_ACTION = {
    type: TASK_PROCESS_LOADING_ACTION_TYPE
  };
  dispatch(taskProcessLoadingAction);

  try {
    const response = await getApolloClient().mutate(
      getCreateTaskMutation(carId, taskInput)
    );
    console.log(response);
    const taskCreateSuccessAction: TASK_CREATE_SUCCESS_ACTON = {
      type: TASK_CREATE_SUCCESS_ACTON_TYPE,
      payload: {
        ...taskInput,
        id: response.data.createTask,
        completed: false
      }
    };
    dispatch(taskCreateSuccessAction);
    toast.success("Task created successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Error occured while task is creating!");
  }
};
