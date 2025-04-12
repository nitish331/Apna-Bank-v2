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
// import { TextField } from "@mui/material";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Edit, NearMeSharp } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { showNotifications } from "../../constants/helper";
import { updateProfileReducer } from "../../reducers/userSlice";

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

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return showNotifications(
        false,
        "Failed!!",
        "Please provide valid details"
      );
    }

    dispatch(
      updateProfileReducer({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      })
    );
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
    setName(state.user.name);
    setEmail(state.user.email);
  }, [state.user]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Edit />}
        fullWidth
      >
        Edit Profile
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
          Edit Profile
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            margin="normal"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required
            style={{ margin: "2rem" }}
          />
          <TextField
            margin="normal"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            style={{ margin: "2rem" }}
          />
          <TextField
            margin="normal"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            required
            style={{ margin: "2rem" }}
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
