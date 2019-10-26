import React from "react";

import {
  Button,
  Grid,
  Chip,
  Container,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardMedia,
  CardActionArea,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import Alert from "./Alert";
import { FinancialDetails } from "../models/FinancialDetails";

const carImagePlaceHolder: string =
  "https://user-images.githubusercontent.com/11095906/67610755-25ed3080-f795-11e9-979b-6715656fb82d.png";

type FinancialInformationsProps = { financialDetails: FinancialDetails };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "30px"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary
    },
    list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    card: {
      maxWidth: 450
    },
    media: {
      height: 200
    },
    content: {
      marginTop: theme.spacing(2)
    },
    listHeader: {
      margin: "0!important"
    },
    listItem: {
      margin: "0!important"
    },
    alert: {
      margin: theme.spacing(1),
      flex: 1,
      padding: "0px 16px!important"
    }
  })
);

const FinancialInformations: React.FC<FinancialInformationsProps> = ({
  financialDetails
}: FinancialInformationsProps): React.ReactElement => {
  const classes = useStyles();
  const {
    purchasePrice,
    purchaseDate,
    purchaseLocation,
    paymentDonePercentage,
    sellingPrice,
    sellingDate,
    sellingLocation,
    sellingDonePercentage,
    margin
  } = financialDetails;
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Chip color="primary" label="Financial Details" />
              <Grid container className={classes.content}>
                <Grid item xs={6}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={carImagePlaceHolder}
                        title="Car Image"
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Grid container className={classes.content}>
                    <Grid item xs={6}>
                      <List dense={true}>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>
                            Purchase Price:{" "}
                          </h5>
                          <span>
                            {purchasePrice
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                          </span>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>
                            Purchase Date:{" "}
                          </h5>
                          <span>{purchaseDate.split("T")[0]}</span>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>
                            Purchase Location:{" "}
                          </h5>
                          <span>{purchaseLocation}</span>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>
                            Payment Done Percentage:
                          </h5>
                          <span>{paymentDonePercentage}%</span>
                        </ListItem>
                      </List>
                    </Grid>

                    <Grid item xs={6}>
                      <List dense={true}>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>
                            Selling Price:{" "}
                          </h5>
                          <span>
                            {sellingPrice
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                          </span>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>Selling Date: </h5>
                          <span>{sellingDate.split("T")[0]}</span>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>
                            Selling Location:{" "}
                          </h5>
                          <span>{sellingLocation}</span>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <h5 className={classes.listHeader}>
                            Selling Done Percentage:
                          </h5>
                          <span>{sellingDonePercentage}%</span>
                        </ListItem>
                      </List>
                    </Grid>

                    <Grid item xs={12}>
                      <Alert
                        variant={margin > 0 ? "info" : "warning"}
                        className={classes.alert}
                        message={"Margin: " + margin + "%"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FinancialInformations;
