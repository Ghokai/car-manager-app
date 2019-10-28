import { Button, Container, createStyles, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const sampleCarId = "aef2d540-5d7d-4152-bb38-d987bb24b81a";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: "50px",
      margin: "16px"
    },
    flexGrid: {
      display: "flex",
      flexDirection: "column",
      margin: "200px"
    }
  })
);

const Home: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const [carId, setCarId] = useState(sampleCarId);

  const gotoCarDetails = () => {
    if (carId.trim().length > 0) {
      history.push("/car-informations/" + carId);
    }
  };
  
  return (
    <Container fixed>
      <Grid container spacing={6}>
        <Grid className={classes.flexGrid} item xs={12}>
          <TextField
            name="carId"
            label="Car Id"
            value={carId}
            onChange={(
              event: React.ChangeEvent<{ name?: string; value: unknown }>
            ) => setCarId(event.target.value as string)}
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={gotoCarDetails}
            className={classes.button}
            color="secondary"
          >
            Get Car Informations
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
