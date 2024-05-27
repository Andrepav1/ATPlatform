import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
    marginBotton: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(2),
  },
}));

export default function StrategySummary({
  strategyName,
  setStrategyName,
  strategyDescription,
  setStrategyDescription,
}) {
  const styles = useStyles();

  const onNameChangeHandler = ({ target: { value } }) => {
    setStrategyName(value);
  };

  const onDescriptionChangeHandler = ({ target: { value } }) => {
    setStrategyDescription(value);
  };

  return (
    <React.Fragment>
      <div className={styles.padding}>
        <Title>Strategy Summary</Title>
        <TextField
          className={styles.margin}
          fullWidth
          label="Name"
          value={strategyName}
          onChange={onNameChangeHandler}
          variant="filled"
        />
        <TextField
          className={styles.margin}
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={strategyDescription}
          onChange={onDescriptionChangeHandler}
          variant="filled"
        />
      </div>
    </React.Fragment>
  );
}
