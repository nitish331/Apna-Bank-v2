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
import { showNotifications } from "../../constants/helper";
import { useDispatch, useSelector } from "react-redux";
import { signUpReducer } from "../../reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";

const paperStyle = {
  padding: 30,
  height: "80vh",
  width: 400,
  margin: "6rem auto",
};
const inputStyle = { marginBottom: "1.5rem" };
const avatarStyle = { backgroundColor: "#1bbd7e" };

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.user.name) {
      return navigate("/user/dashboard");
    }
  }, [state.user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return showNotifications(
        false,
        "Failed!!",
        "Please provide valid details"
      );
    }
    if (password !== confirmPassword) {
      return showNotifications(
        false,
        "Failed!!",
        "Password and confirm Password does not matched"
      );
    }
    dispatch(
      signUpReducer({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      })
    );
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>Register here</h2>
        </Grid>
        <TextField
          label="Name"
          variant="standard"
          style={inputStyle}
          placeholder="Enter Your Name"
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          label="Confirm Password"
          variant="standard"
          style={inputStyle}
          placeholder="Confirm Your Password"
          type="password"
          fullWidth
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox name="checkbox" color="primary" />}
          label="Remember me"
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          {" "}
          SignUp
        </Button>
        <Typography variant="subtitle1" gutterBottom align="center" mt={2}>
          Do You Have an Account?
        </Typography>
        <Link to={"/user/login"}>LogIn here!!</Link>
      </Paper>
    </Grid>
  );
};

export default SignUp;
