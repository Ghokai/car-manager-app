import {
  Card,
  CardActionArea,
  CardMedia,
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 450
    },
    media: {
      height: 240
    }
  })
);

const carImagePlaceHolder: string =
  "https://user-images.githubusercontent.com/11095906/67610755-25ed3080-f795-11e9-979b-6715656fb82d.png";

const CarImage: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={carImagePlaceHolder}
          title="Car Image"
        />
      </CardActionArea>
    </Card>
  );
};

export default CarImage;
