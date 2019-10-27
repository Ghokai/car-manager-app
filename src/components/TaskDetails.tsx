import {
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Paper
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Add, Close } from "@material-ui/icons";
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10px"
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "left",
      color: theme.palette.text.secondary
    },
    fab: {
      float: "right",
      top: "50px"
    },
    dialog: {
      width: "500px"
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })
);

type TaskDetailsProps = { carId: string };

const TaskDetails: React.FC<TaskDetailsProps> = ({
  carId
}: TaskDetailsProps): React.ReactElement => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Chip color="primary" label="Task List" />
              <TaskList></TaskList>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Chip color="primary" label="Add New Task" />
              <TaskForm carId={carId}></TaskForm>
              <Fab
                color="secondary"
                aria-label="add"
                onClick={handleModalOpen}
                className={classes.fab}
              >
                <Add />
              </Fab>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Chip color="primary" label="Add New Task" />
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleModalClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <TaskForm carId={carId}></TaskForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDetails;
