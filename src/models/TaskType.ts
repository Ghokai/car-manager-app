import { EnumDisplayType } from "./EnumDisplayType";

enum TaskType {
  ADD_DOCUMENT = "ADD_DOCUMENT",
  WASH_CAR = "WASH_CAR",
  ADD_PAYMENT_DETAILS = "ADD_PAYMENT_DETAILS"
}

const TaskTypeDisplay: EnumDisplayType = {};
TaskTypeDisplay[TaskType.ADD_DOCUMENT] = "Add Document";
TaskTypeDisplay[TaskType.WASH_CAR] = "Wash Car";
TaskTypeDisplay[TaskType.ADD_PAYMENT_DETAILS] = "Add Payment Details";

export { TaskTypeDisplay, TaskType };
