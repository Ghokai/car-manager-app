import { Button, Grid, Chip, Container, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarInput } from "../models/Car";
import { LegalStatusDisplay } from "../models/LegalStatus";
import { PhysicalStatusDisplay } from "../models/PhysicalStatus";
import { SellingStatusDisplay } from "../models/SellingStatus";
import { EngineTypeDisplay } from "../models/EngineType";
import { AppState } from "../store";
import { loadMakeInformations } from "../store/actions/makeActions";
import { loadModelInformations } from "../store/actions/modelActions";
import { loadTrimInformations } from "../store/actions/trimActions";
import { updateCarAction } from "../store/actions/carActions";
import Alert from "./Alert";
import DropdownMenu, {
  convertEnumDisplayType2KeyValueOption,
  convertStringList2KeyValueOption
} from "./DropdownMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10px"
    },
    button: {
      margin: theme.spacing(1),
      right: "10px"
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "left",
      color: theme.palette.text.secondary,
      height: "100%"
    },
    list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    paperBottom: {
      display: "flex",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    alert: {
      margin: theme.spacing(1),
      flex: 1,
      padding: "0px 16px!important"
    },
    gridBottom: {
      padding: "10px 24px!important"
    }
  })
);

type CarDetailsFormProps = { carInput: CarInput };

const defaultCarInputValues: CarInput = {
  id: "",
  engineType: "",
  legalStatus: "",
  sellingStatus: "",
  physicalStatus: "",
  make: "",
  model: "",
  trim: ""
};

const CarDetailsForm: React.FC<CarDetailsFormProps> = ({
  carInput
}: CarDetailsFormProps): React.ReactElement => {
  const [carInputValues, setCarInputValues] = useState(defaultCarInputValues);
  const [formError, setFormError] = useState("");

  const { makeList, modelList, trimList } = useSelector((state: AppState) => ({
    makeList: state.makeState.makeList,
    modelList: state.modelState.modelList,
    trimList: state.trimState.trimList
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    setCarInputValues({
      id: carInput.id,
      engineType: carInput.engineType || "",
      legalStatus: carInput.legalStatus || "",
      sellingStatus: carInput.sellingStatus || "",
      physicalStatus: carInput.physicalStatus || "",
      make: carInput.make || "",
      model: carInput.model || "",
      trim: carInput.trim || ""
    });

    dispatch(loadMakeInformations());
    if (carInput.make) {
      dispatch(loadModelInformations(carInput.make));
      if (carInput.model) {
        dispatch(loadTrimInformations(carInput.make, carInput.model));
      }
    }
  }, [carInput]);

  const classes = useStyles();

  const onCarInputPropChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (event.target.name === "make") {
      dispatch(loadModelInformations(event.target.value as string));
      setCarInputValues({
        ...carInputValues,
        make: event.target.value as string,
        model: "",
        trim: ""
      });
    } else if (event.target.name === "model") {
      dispatch(
        loadTrimInformations(carInputValues.make, event.target.value as string)
      );
      setCarInputValues({
        ...carInputValues,
        model: event.target.value as string,
        trim: ""
      });
    } else {
      setCarInputValues({
        ...carInputValues,
        [event.target.name || ""]: event.target.value
      });
    }
  };

  const onSave = () => {
    setFormError("");
    if (carInputValues.make === "") {
      setFormError("Make is required Field");
      return;
    }
    if (carInputValues.model === "") {
      setFormError("Model is required Field");
      return;
    }
    if (carInputValues.trim === "") {
      setFormError("Trim is required Field");
      return;
    }
    dispatch(updateCarAction(carInputValues));
  };

  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Chip color="primary" label="Car Status" />
              <br />
              <DropdownMenu
                label="Physical Status"
                options={convertEnumDisplayType2KeyValueOption(
                  PhysicalStatusDisplay
                )}
                selectedValue={carInputValues.physicalStatus}
                name="physicalStatus"
                onChange={onCarInputPropChange}
              ></DropdownMenu>
              <br />
              <DropdownMenu
                label="Legal Status"
                options={convertEnumDisplayType2KeyValueOption(
                  LegalStatusDisplay
                )}
                selectedValue={carInputValues.legalStatus}
                name="legalStatus"
                onChange={onCarInputPropChange}
              ></DropdownMenu>
              <br />
              <DropdownMenu
                label="Selling Status"
                options={convertEnumDisplayType2KeyValueOption(
                  SellingStatusDisplay
                )}
                selectedValue={carInputValues.sellingStatus}
                name="sellingStatus"
                onChange={onCarInputPropChange}
              ></DropdownMenu>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Chip color="primary" label="Car Informations" />
              <br />
              <DropdownMenu
                label="Make"
                options={convertStringList2KeyValueOption(makeList)}
                selectedValue={carInputValues.make}
                name="make"
                onChange={onCarInputPropChange}
              ></DropdownMenu>
              <br />
              <DropdownMenu
                label="Model"
                options={convertStringList2KeyValueOption(modelList)}
                selectedValue={carInputValues.model}
                name="model"
                onChange={onCarInputPropChange}
              ></DropdownMenu>
              <br />
              <DropdownMenu
                label="Trim"
                options={convertStringList2KeyValueOption(trimList)}
                selectedValue={carInputValues.trim}
                name="trim"
                onChange={onCarInputPropChange}
              ></DropdownMenu>
              <br />
              <DropdownMenu
                label="Engine Type"
                options={convertEnumDisplayType2KeyValueOption(
                  EngineTypeDisplay
                )}
                selectedValue={carInputValues.engineType}
                name="engineType"
                onChange={onCarInputPropChange}
              ></DropdownMenu>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.gridBottom}>
            <Paper className={classes.paperBottom}>
              <Button
                variant="contained"
                onClick={onSave}
                color="secondary"
                className={classes.button}
              >
                Update Car Informations
              </Button>
              {formError.length > 0 && (
                <Alert
                  variant="error"
                  className={classes.alert}
                  message={formError}
                  onClose={() => setFormError("")}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default CarDetailsForm;
