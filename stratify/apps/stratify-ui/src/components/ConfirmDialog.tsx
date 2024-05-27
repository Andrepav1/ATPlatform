import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmDialog({
  title,
  text,
  open,
  setOpen,
  confirmAction,
  cancelAction,
}) {
  return (
    <div>
      // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
      <Dialog
        open={open}
        onClose={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
        <DialogActions>
          <Button onClick={() => cancelAction()} color="primary">
            No
          </Button>
          <Button onClick={() => confirmAction()} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
