import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { resetCVV } from "../../reducers/userSlice";

const Cvv = ({ virtualCard }) => {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetCVV());
  }
  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h4"
        fontWeight={"bold"}
        sx={{ mb: 8 }}
      >
        Here is Your CVV Details
      </Typography>
      <Typography variant="h5" textAlign={"center"} sx={{ mb: 7 }}>
        CVV: {virtualCard.CVV}
      </Typography>

      <Button
        variant="contained"
        type="submit"
        color="success"
        onClick={handleSubmit}
        sx={{ display: "block", margin: "auto" }}
        gutterBottom
      >
        Go Back
      </Button>
    </>
  );
};

export default Cvv;
