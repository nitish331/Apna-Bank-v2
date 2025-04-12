import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDepositReducer } from "../../reducers/userSlice";
import { showNotifications } from "../../constants/helper";
import { useNavigate } from "react-router";

const paperStyle = {
  padding: 30,
  height: "75vh",
  width: 400,
  margin: "6rem auto",
};

const inputStyle = { marginBottom: "1.5rem" };
const avatarStyle = { backgroundColor: "#1bbd7e" };

const CreateDeposit = () => {
  const [amount, setAmount] = useState(0);
  const [password, setPassword] = useState("");
  const [lockInPeriod, setlockInPeriod] = useState(0);

  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
  }, [state.user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (amount < 1000) {
      return showNotifications(
        false,
        "Failed!!",
        "Please Enter The Amount Greater that 1000"
      );
    } else if (lockInPeriod === 0) {
      return showNotifications(
        false,
        "Failed!!",
        "Please Provide The Valid Tenure"
      );
    }
    dispatch(createDepositReducer({ amount, lockInPeriod, password }));
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <Avatar style={avatarStyle}>
            <RequestQuoteIcon />
          </Avatar>
          <h2>Create New Deposit!!</h2>
        </Grid>
        <TextField
          label="Enter the amount"
          variant="standard"
          style={inputStyle}
          placeholder="Enter Your Amount"
          fullWidth
          required
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <FormControl
          style={inputStyle}
          fullWidth
          variant="standard"
          sx={{ minWidth: 120 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            lockInPeriod (in Months)
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={(e) => setlockInPeriod(parseInt(e.target.value))}
            label="Select Tenure"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={36}>36</MenuItem>
            <MenuItem value={48}>48</MenuItem>
            <MenuItem value={60}>60</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Interest Rate"
          variant="standard"
          style={inputStyle}
          placeholder="Interest"
          type="text"
          fullWidth
          value={"12%"}
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
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          {" "}
          Confirm
        </Button>
      </Paper>
    </Grid>
  );
};

export default CreateDeposit;
