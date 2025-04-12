import { Avatar, Fab, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { showNotifications } from "../../constants/helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentsIcon from "@mui/icons-material/Payments";
import SendIcon from "@mui/icons-material/Send";
import { sendMoneyReducer } from "../../reducers/userSlice";

const paperStyle = {
  padding: 30,
  height: "70vh",
  width: 400,
  margin: "6rem auto",
};
const inputStyle = { marginBottom: "2rem" };
const avatarStyle = { backgroundColor: "#1bbd7e" };

const TransferMoney = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
  }, [state.user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      parseInt(amount) <= 0 ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return showNotifications(
        false,
        "Failed!!",
        "Please provide valid details"
      );
    }

    dispatch(sendMoneyReducer({ amount, toUser: email, password }));
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <Avatar style={avatarStyle}>
            <PaymentsIcon />
          </Avatar>
          <h2>Enter the Beneficiary Details</h2>
        </Grid>

        <TextField
          label="Benificiary email"
          variant="standard"
          style={inputStyle}
          placeholder="Enter Email"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Amount"
          variant="standard"
          style={inputStyle}
          placeholder="Enter amount"
          fullWidth
          required
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          label="Password"
          variant="standard"
          style={inputStyle}
          placeholder="Enter Your Password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={submitHandler}
        >
          <SendIcon sx={{ mr: 1 }} />
          Send
        </Fab>
      </Paper>
    </Grid>
  );
};

export default TransferMoney;
