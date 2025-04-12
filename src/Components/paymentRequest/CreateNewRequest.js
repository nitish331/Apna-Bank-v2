import {
  Avatar,
  Button,
  Fab,
  Grid,
  Paper,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { useDispatch, useSelector } from "react-redux";
import { showNotifications } from "../../constants/helper";
import { newRequestReducer } from "../../reducers/paymentRequestSlice";
import { useNavigate } from "react-router";

const paperStyle = {
  padding: 30,
  height: "65vh",
  width: 400,
  margin: "6rem auto",
};

const inputStyle = { marginBottom: "1rem" };
const avatarStyle = { backgroundColor: "#1bbd7e" };

const CreateNewRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RequestState = useSelector((state) => state.paymentRequests);
  const userState = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!userState.user.name) {
      return navigate("/user/login");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "" || description.trim() === "") {
      return showNotifications(
        false,
        "Failed!!",
        "Please  enter the valid email and password"
      );
    } else if (amount <= 0) {
      return showNotifications(
        false,
        "Failed!!",
        "Please enter a amount greater than 0"
      );
    }

    dispatch(newRequestReducer({ email, amount, description }));
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align={"center"}>
            <Avatar style={avatarStyle}>
              <RequestQuoteIcon />
            </Avatar>
            <h2>Make A Request</h2>
          </Grid>
          <TextField
            label="Email"
            variant="standard"
            style={inputStyle}
            placeholder="Enter Friend's Email"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Amount"
            variant="standard"
            style={inputStyle}
            placeholder="Enter Amount"
            type="number"
            fullWidth
            required
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <TextareaAutosize
            style={{ width: "100%", marginBottom: "1rem" }}
            aria-label="minimum height"
            minRows={3}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Fab
            variant="extended"
            type="submit"
            color="primary"
            onClick={submitHandler}
          >
            {" "}
            Create
          </Fab>
        </Paper>
      </Grid>
    </div>
  );
};

export default CreateNewRequest;
