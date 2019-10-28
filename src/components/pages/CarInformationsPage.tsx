import {
  Chip,
  CircularProgress,
  Container,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Theme
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../store";
import { loadCarInformationsAction } from "../../store/actions/carActions";
import { loadCarTasksAction } from "../../store/actions/taskActions";
import Alert from "../Alert";
import CarDetailsForm from "../CarDetailsForm";
import FinancialInformations from "../FinancialInformations";
import TaskDetails from "../TaskDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10px"
    },
    loader: {
      marginTop: "100px"
    },
    alert: {
      margin: theme.spacing(4),
      flex: 1,
      padding: "24px!important"
    }
  })
);

const CarInformationsPage: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const { carId } = useParams();
  const dispatch = useDispatch();
  const { car, isLoading } = useSelector((state: AppState) => state.carState);

  useEffect(() => {
    if (carId) {
      dispatch(loadCarInformationsAction(carId));
      dispatch(loadCarTasksAction(carId));
    }
  }, [carId, dispatch]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };

  if (isLoading) {
    return <CircularProgress className={classes.loader}></CircularProgress>;
  }
  if (!car) {
    return (
      <Alert
        className={classes.alert}
        variant="error"
        message="Car Informations could not found!"
      />
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
