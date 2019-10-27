import { Task } from "../../models/Task";
import { TASK_CREATE_SUCCESS_ACTON_TYPE, TASK_DETAILS_ERROR_ACTION_TYPE, TASK_DETAILS_LOADING_ACTION_TYPE, TASK_DETAILS_SUCCESS_ACTION_TYPE, TASK_PROCESS_LOADING_ACTION_TYPE, TASK_UPDATE_SUCCESS_ACTON_TYPE } from "../actions/taskActions";
import { Action } from "../index";

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
    case TASK_DETAILS_LOADING_ACTION_TYPE:
      return { isLoading: true, tasks: [], error: "" };
    case TASK_DETAILS_SUCCESS_ACTION_TYPE:
      return { isLoading: false, tasks: action.payload, error: "" };
    case TASK_DETAILS_ERROR_ACTION_TYPE:
      return { isLoading: false, tasks: [], error: action.payload };
    case TASK_PROCESS_LOADING_ACTION_TYPE:
      return { ...state, isLoading: true };
    case TASK_UPDATE_SUCCESS_ACTON_TYPE:
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
        return { ...state, isLoading: false, tasks: [...state.tasks] };
      }
      return state;
    case TASK_CREATE_SUCCESS_ACTON_TYPE: {
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks, action.payload]
      };
    }
    default:
      return state;
  }
};
