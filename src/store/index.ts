import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { carReducer } from "./reducers/carReducer";
import { makeReducer } from "./reducers/makeReducer";
import { modelReducer } from "./reducers/modelReducer";
import { trimReducer } from "./reducers/trimReducer";
import { taskReducer } from "./reducers/taskReducer";

export const rootReducer = combineReducers({
  carState: carReducer,
  makeState: makeReducer,
  modelState: modelReducer,
  trimState: trimReducer,
  taskState: taskReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}

export interface Action {
  type: string;
  payload: any;
}
