import { amber, green } from "@material-ui/core/colors";
import { IconButton, SnackbarContent } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { CheckCircle, Close, Error, Info, Warning } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info
};

const useStyles1 = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

export interface AlertProps {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}

const Alert: React.FC<AlertProps> = (props: AlertProps): React.ReactElement => {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="alert-snackbar"
      message={
        <span id="alert-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          {onClose && <Close className={classes.icon} />}
        </IconButton>
      ]}
      {...other}
    />
  );
};

export default Alert;
