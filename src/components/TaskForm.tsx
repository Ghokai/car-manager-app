import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TaskInput } from "../models/Task";
import { TaskTypeDisplay } from "../models/TaskType";
import { createTaskAction } from "../store/actions/taskActions";
import Alert from "./Alert";
import DropdownMenu, {
  convertEnumDisplayType2KeyValueOption
} from "./DropdownMenu";

const getEmptyTaskInput = (): TaskInput => ({
  comment: "",
  taskType: ""
});

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
      color: theme.palette.text.secondary
    },
    list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    textInput: {
      width: "100%"
    },
    alert: {
      margin: theme.spacing(1),
      flex: 1,
      padding: "0px 16px!important"
    },
    formButtonPannel: {
      display: "flex"
    }
  })
);

type TaskFormProps = { carId: string };

const TaskForm: React.FC<TaskFormProps> = ({
  carId
}: TaskFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [newTaskInput, setNewTaskInput] = useState(getEmptyTaskInput());

  const [newTaskInputError, setNewTaskInputError] = useState("");

  const onTaskInputPropChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setNewTaskInput({
      ...newTaskInput,
      [event.target.name || ""]: event.target.value
    });
  };

  const onCreateTask = () => {
    if (newTaskInput.taskType === "") {
      setNewTaskInputError("Task type required!");
      return;
    }
    if (newTaskInput.comment.trim() === "") {
      setNewTaskInputError("Comment is  required!");
      return;
    }
    dispatch(createTaskAction(carId, newTaskInput));
    setNewTaskInput(getEmptyTaskInput());
    setNewTaskInputError("");
  };
  const classes = useStyles();

  return (
    <>
      <br />
      <DropdownMenu
        label="Task Type"
        options={convertEnumDisplayType2KeyValueOption(TaskTypeDisplay)}
        selectedValue={newTaskInput.taskType}
        name="taskType"
        onChange={onTaskInputPropChange}
      ></DropdownMenu>
      <br />
      <TextField
        name="comment"
        label="Comment"
        value={newTaskInput.comment}
        onChange={onTaskInputPropChange}
        margin="normal"
        className={classes.textInput}
      />
      <br />
      <div className={classes.formButtonPannel}>
        <Button
          variant="contained"
          onClick={onCreateTask}
          color="primary"
          className={classes.button}
        >
          Create Task
        </Button>
        {newTaskInputError.length > 0 && (
          <Alert
            variant="error"
            className={classes.alert}
            message={newTaskInputError}
            onClose={() => setNewTaskInputError("")}
          />
        )}
      </div>
    </>
  );
};

export default TaskForm;
