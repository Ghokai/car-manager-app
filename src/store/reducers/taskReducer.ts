import {
  LOAD_TASK_DETAILS_ERROR_ACTION_TYPE,
  TASK_ACTIONS,
  LOAD_TASK_DETAILS_LOADING_ACTION_TYPE,
  LOAD_TASK_DETAILS_SUCCESS_ACTION_TYPE,
  UPDATE_TASK_UPDATING_ACTION_TYPE,
  UPDATE_TASK_SUCCESS_ACTION_TYPE
} from "../actions/taskActions";
import { Action } from "../index";
import { Task } from "../../models/Task";

type taskReducerState = { tasks: Task[]; isLoading: boolean; error: string };

const defaultTaskReducerState: taskReducerState = {
  tasks: [],
  isLoading: false,
  error: ""
};

export const taskReducer = (
  state: taskReducerState = defaultTaskReducerState,
  action: Action
): taskReducerState => {
  switch (action.type) {
    case LOAD_TASK_DETAILS_LOADING_ACTION_TYPE:
      return { isLoading: true, tasks: [], error: "" };
    case LOAD_TASK_DETAILS_SUCCESS_ACTION_TYPE:
      return { isLoading: false, tasks: action.payload, error: "" };
    case LOAD_TASK_DETAILS_ERROR_ACTION_TYPE:
      return { isLoading: false, tasks: [], error: action.payload };
    case UPDATE_TASK_UPDATING_ACTION_TYPE:
      return { ...state, isLoading: true };
    case UPDATE_TASK_SUCCESS_ACTION_TYPE:
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
        return { ...state, isLoading: false, tasks: [...state.tasks] };
      }
      return state;

    default:
      return state;
  }
};
