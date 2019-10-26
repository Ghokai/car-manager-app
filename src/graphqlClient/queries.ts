import gql from "graphql-tag";

export const getCarDetailsQuery = (carId: string) => ({
  query: gql`
    query car($id: ID!) {
      car(id: $id) {
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
    id: carId
  }
});

export const getCarTasksQuery = (carId: string) => ({
  query: gql`
    query tasks($carId: ID!) {
      tasks(carId: $carId) {
        id
        taskType
        comment
        completed
      }
    }
  `,
  variables: {
    carId
  }
});

export const getMakeQuery = () => ({
  query: gql`
    query {
      make
    }
  `
});

export const getModelQuery = (make: string) => ({
  query: gql`
    query model($make: String!) {
      model(make: $make)
    }
  `,
  variables: {
    make
  }
});

export const getTrimQuery = (make: string, model: string) => ({
  query: gql`
    query model($make: String!, $model: String!) {
      trim(make: $make, model: $model)
    }
  `,
  variables: {
    make,
    model
  }
});
