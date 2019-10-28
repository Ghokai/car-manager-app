import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Tooltip
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { LocalCarWash, AttachFile, AttachMoney } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../models/Task";
import { TaskTypeDisplay, TaskType } from "../models/TaskType";
import { AppState } from "../store";
import { updateTaskAction } from "../store/actions/taskActions";
import Alert from "./Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10px",
      height: "300px",
      maxHeight: "300px",
      overflowY: "scroll",
      overflowX: "hidden",
      width: "100%"
    },
    comment: {
      fontSize: "12px",
      fontWeight: "normal"
    },
    alert: {
      margin: theme.spacing(1),
      flex: 1,
      padding: "0px 16px!important"
    }
  })
);

const TaskList: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: AppState) => state.taskState);

  const updateTask = (task: Task) => {
    dispatch(updateTaskAction(task.id, !task.completed));
  };

  if (tasks.length === 0) {
    return (
      <Alert
        variant="info"
        className={classes.alert}
        message="There is no task exist for car"
      />
    );
  }

  return (
    <List className={classes.root}>
      {tasks.map((task: Task) => (
        <ListItem key={task.id} dense>
          <Tooltip title={TaskTypeDisplay[task.taskType]}>
            <IconButton edge="end" aria-label="comments">
              {task.taskType === TaskType.ADD_DOCUMENT && <AttachFile />}
              {task.taskType === TaskType.ADD_PAYMENT_DETAILS && (
                <AttachMoney />
              )}
              {task.taskType === TaskType.WASH_CAR && <LocalCarWash />}
            </IconButton>
          </Tooltip>
          <h4 className={classes.comment}>{task.comment}</h4>
          <ListItemSecondaryAction>
            <Checkbox
              edge="start"
              checked={task.completed}
              tabIndex={-1}
              onClick={() => updateTask(task)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
