import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
// import { TextField } from "@mui/material";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotifications } from "../../constants/helper";
import { acceptPaymentRequest } from "../../reducers/paymentRequestSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ConfirmPassword({ requestId }) {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);

    if (password.trim() === "") {
      return showNotifications(
        false,
        "Failed!!",
        "Please Enter a valid password!!"
      );
    }
    dispatch(acceptPaymentRequest({ password, requestId }));

  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        style={{ marginLeft: "10px" }}
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Accept
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          align={"center"}
          style={{ fontSize: "1.5rem" }}
        >
          Confirm Password
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            margin="normal"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            required
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
