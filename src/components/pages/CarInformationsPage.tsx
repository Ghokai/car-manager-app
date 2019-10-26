import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCarDetailsAction } from "../../store/actions/carActions";
import { loadCarTasksAction } from "../../store/actions/taskActions";
import CarDetailsForm from "../CarDetailsForm";
import FinancialInformations from "../FinancialInformations";
import { AppState } from "../../store";
import TaskDetails from "../TaskDetails";
import {
  Divider,
  Grid,
  Tabs,
  Tab,
  makeStyles,
  Chip,
  Theme,
  createStyles,
  Container,
  CircularProgress
} from "@material-ui/core";
import Alert from "../Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10px"
    },
    loader: {
      marginTop: "100px"
    }
  })
);

const CarInformationsPage: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };
  const { carId } = useParams();
  const { car, error, isLoading } = useSelector(
    (state: AppState) => state.carState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(carId);
    if (carId) {
      dispatch(loadCarDetailsAction(carId));
      dispatch(loadCarTasksAction(carId));
    }
  }, [carId]);

  if (isLoading) {
    return <CircularProgress className={classes.loader}></CircularProgress>;
  }
  if (!car) {
    return (
      <Alert variant="error" message="Car Informations could not found!" />
    );
  }

  const { financialDetails, ...carInput } = car;

  return (
    <div className={classes.root}>
      <Container fixed>
        <div>
          <Chip color="primary" label={"Car Id: " + carId} />
        </div>
        <FinancialInformations
          financialDetails={financialDetails}
        ></FinancialInformations>
        <Grid className={classes.root}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Car Informations" />
            <Tab label="Task List" />
          </Tabs>
          <Divider />
          {tab === 0 && <CarDetailsForm carInput={carInput}></CarDetailsForm>}
          {tab === 1 && <TaskDetails carId={carId!}></TaskDetails>}
        </Grid>
      </Container>
    </div>
  );
};

export default CarInformationsPage;
