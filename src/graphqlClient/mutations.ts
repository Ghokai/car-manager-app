import gql from "graphql-tag";
import { CarInput } from "../models/Car";
import { TaskInput } from "../models/Task";

interface LooseObject {
  [key: string]: any;
}

const setNullFields = (values: object) => {
  const obj: LooseObject = {};
  Object.entries(values).forEach(([key, value]) => {
    obj[key] = value === "" ? null : value;
  });
  return obj;
};

export const getUpdateCarMutation = (carInput: CarInput) => {
  const obj: LooseObject = setNullFields(carInput);

  return {
    mutation: gql`
      mutation updateCar($car: CarInput) {
        updateCar(car: $car) {
          id
          make
          model
          trim
          engineType
          physicalStatus
          legalStatus
          sellingStatus
          financialDetails {
            purchasePrice
            purchaseDate
            purchaseLocation
            paymentDonePercentage
            sellingPrice
            sellingDate
            sellingLocation
            sellingDonePercentage
            margin
          }
        }
      }
    `,
    variables: {
      car: obj
    }
  };
};

export const getCreateTaskMutation = (carId: string, taskInput: TaskInput) => {
  const obj: LooseObject = setNullFields(taskInput);
  return {
    mutation: gql`
      mutation createTask($carId: ID!, $task: TaskInput!) {
        createTask(carId: $carId, task: $task)
      }
    `,
    variables: {
      carId,
      task: obj
    }
  };
};

export const getUpdateTaskMutation = (taskId: string, completed: boolean) => {
  console.log(taskId, completed);
  return {
    mutation: gql`
      mutation updateTask($id: ID!, $completed: Boolean!) {
        updateTask(id: $id, completed: $completed) {
          id
        }
      }
    `,
    variables: {
      id: taskId,
      completed
    }
  };
};
