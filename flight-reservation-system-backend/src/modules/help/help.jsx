import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const getRandomNumber = () => {
  return Math.floor(Math.random() * 1000000) + 1;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "60%",
    marginBottom: theme.spacing(5),
  },
  textarea: {
    width: "60%",
    height: "300px",
    marginBottom: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(-4),
  },
}));

const Help = () => {
  const classes = useStyles();
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setIssueType("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedNumber = getRandomNumber();
    setRandomNumber(generatedNumber);
    handleDialogOpen();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel id="issue-label">Issue*</InputLabel>
          <Select
            labelId="issue-label"
            id="issue"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            required
          >
            <MenuItem value="booking">Booking Issue</MenuItem>
            <MenuItem value="cancel">Cancel Issue</MenuItem>
            <MenuItem value="refund">Refund Issue</MenuItem>
            <MenuItem value="refund">Airline Service Issue</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>

        <TextareaAutosize
          id="description"
          className={classes.textarea}
          placeholder="Description*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rowsMin={9}
          required
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Issue Number: {randomNumber}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Issue will be addressed within 24 hours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Help;
