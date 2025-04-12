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
import { InputAdornment, TextField } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch } from "react-redux";
import { addMoneyReducer } from "../../reducers/userSlice";
import { showNotifications } from "../../constants/helper";

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

export default function AddMoney() {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);

    if (parseInt(amount) <= 0) {
      return showNotifications(
        false,
        "Failed!!",
        "Please Enter the value greater than 0!!"
      );
    }
    dispatch(addMoneyReducer({ amount }));
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        fullWidth
      >
        Add Money
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
          Add Money
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            margin="normal"
            defaultValue={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="outlined-basic"
            label="Enter Amount"
            variant="outlined"
            required
            type="number"
            InputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
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
