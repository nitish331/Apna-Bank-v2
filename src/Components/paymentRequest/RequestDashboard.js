import { Button, Fab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RequestCard from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getOtherRequest,
  getYourRequest,
} from "../../reducers/paymentRequestSlice";

const RequestDashboard = () => {
  const [enabled, setEnabled] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestState = useSelector((state) => state.paymentRequests);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (!userState.user.name) {
      return navigate("/user/login");
    }
    if (enabled) {
      dispatch(getYourRequest());
    } else {
      dispatch(getOtherRequest());
    }
  }, [userState.user, enabled]);
  return (
    <div
      style={{
        backgroundColor: "#D4E8E8",
        marginTop: "4rem",
        padding: "1.5rem",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        style={{ color: "#4C1B4E" }}
        align="center"
        gutterBottom
      >
        Payment Request
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "1.3rem",
        }}
      >
        <Fab
          disabled={enabled}
          size="large"
          onClick={() => setEnabled(true)}
          variant="extended"
          color="secondary"
        >
          Your Requests
        </Fab>
        <Fab
          size="large"
          onClick={() => setEnabled(false)}
          variant="extended"
          color="secondary"
          disabled={!enabled}
        >
          Other Requests
        </Fab>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {requestState.requests.length > 0 ? (
          requestState.requests.map((request, index) => (
            <RequestCard
              key={index}
              request={request}
              userEmail={userState.user.email}
            />
          ))
        ) : (
          <Typography variant={"h6"}>No Request Found</Typography>
        )}
      </div>
    </div>
  );
};

export default RequestDashboard;
