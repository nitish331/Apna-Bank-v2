import { Box, Button, CardActions, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import {
  blockCard,
  getCvv,
  ResetCard,
  unblockCard,
} from "../../reducers/userSlice";
import { useDispatch } from "react-redux";

const ShowCvv = ({ inputStyle, virtualCard }) => {
  const password = useRef("");
  const dispatch = useDispatch();
  function GetCvv(e) {
    e.preventDefault();
    dispatch(getCvv({ password: password.current.value }));
  }

  function handleBlockCard(e) {
    e.preventDefault();
    if (virtualCard.isActive) {
      dispatch(blockCard({ password: password.current.value }));
    } else {
      dispatch(unblockCard({ password: password.current.value }));
    }
  }

  function handleRequestNewCard(e) {
    e.preventDefault();
    dispatch(ResetCard({ password: password.current.value }));
  }

  return (
    <>
      <Typography variant="h4">
        Please Enter Your Password to see CVV
      </Typography>

      <TextField
        label="Password"
        variant="standard"
        style={inputStyle}
        inputRef={password}
        placeholder="Enter Your Password"
        type="password"
        required
      />
      <Button
        variant="contained"
        type="submit"
        onClick={GetCvv}
        sx={{ display: "block", margin: "auto" }}
        color="primary"
        gutterBottom
      >
        {" "}
        Get CVV
      </Button>
      <CardActions>
        {new Date(virtualCard.validUpto) > new Date() ? (
          <Button
            size="large"
            color="error"
            fullWidth
            onClick={handleBlockCard}
          >
            {virtualCard.isActive ? "Block" : "Unblock"}
          </Button>
        ) : (
          <></>
        )}
        <Button
          color="success"
          onClick={handleRequestNewCard}
          size="large"
          fullWidth
        >
          Request New Card
        </Button>
      </CardActions>
    </>
  );
};

export default ShowCvv;
