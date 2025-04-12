import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReducer, getUserFromToken } from "../../reducers/userSlice";
import {
  getItemFromLocalStorage,
  showNotifications,
} from "../../constants/helper";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../../constants/api";

const paperStyle = {
  padding: 30,
  height: "70vh",
  width: 400,
  margin: "6rem auto",
};

const inputStyle = { marginBottom: "1rem" };
const avatarStyle = { backgroundColor: "#1bbd7e" };

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    if (state.user.name) {
      return navigate("/user/dashboard");
    } else if (token) {
      dispatch(getUserFromToken());
    }
  }, [state.user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "" || password.length <= 4) {
      return showNotifications(
        false,
        "Failed!!",
        "Please  enter the valid email and password"
      );
    }
    dispatch(fetchReducer({ email, password }));
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>LogIn</h2>
        </Grid>
        <TextField
          label="Email"
          variant="standard"
          style={inputStyle}
          placeholder="Enter Your Email"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
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
        <FormControlLabel
          control={<Checkbox name="checkbox" color="primary" />}
          label="ARE YOU A ADMIN?"
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          {" "}
          LogIn
        </Button>
        <Typography variant="subtitle1" gutterBottom align="center" mt={2}>
          Do not Have an Account?
        </Typography>
        <Link to={"/user/register"}>Register here!!</Link>
      </Paper>
    </Grid>
  );
};

export default Login;
