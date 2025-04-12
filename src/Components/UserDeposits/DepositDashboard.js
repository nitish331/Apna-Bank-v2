import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import DepositCard from "./DepositCard";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserDeposits } from "../../reducers/userSlice";
const NoPlansFound = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">No Plans Found</Typography>
      </CardContent>
    </Card>
  );
};

const DepositDashboard = () => {
  const state = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
    dispatch(getUserDeposits());
  }, [state.user]);
  const ActiveDeposits = state.fixedDeposits.filter((fd) => {
    return !fd.isMatured;
  });
  const MaturedDeposits = state.fixedDeposits.filter((fd) => {
    return fd.isMatured;
  });
  const TotalInvestedAmount = state.fixedDeposits.reduce((acc, fd) => {
    return acc + fd.amount;
  }, 0);
  const TotalInterestRecieved = state.fixedDeposits.reduce((acc, fd) => {
    return acc + fd.maturityAmount - fd.amount;
  }, 0);

  const handleCreateDeposit = () => {
    return navigate("/user/CreateDeposit");
  };

  return (
    <div
      style={{
        backgroundColor: "cyan",
        marginTop: "4rem",
        width: "100vw",
        padding: "30px 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "3rem",
          color: "#4C1B4E",
        }}
      >
        <div style={{ textAlign: "start" }}>
          <Typography variant="h5" gutterBottom>
            My Deposits
          </Typography>
          <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>
            My Fixed Deposits
          </Typography>
          <Typography variant="h5" gutterBottom>
            Manage your All Deposits With Apna Bank
          </Typography>
        </div>
        <Button variant="contained" onClick={handleCreateDeposit} size="large">
          Create More
        </Button>
      </div>

      <Card
        elevation={3}
        sx={{ padding: "10px 30px", color: "#4C1B4E", marginBottom: "1.5rem" }}
      >
        <CardContent>
          <Typography
            variant="h6"
            align="left"
            style={{ fontWeight: "bold" }}
            gutterBottom
          >
            Your Investments
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "1rem",
              gap: "2rem",
            }}
          >
            <div>
              <Typography
                variant="h3"
                style={{ fontWeight: "bolder", color: "#FF340A" }}
              >
                <CurrencyRupeeIcon fontSize="large" />
                {TotalInvestedAmount}
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#4C1B4E" }}
                align="left"
                gutterBottom
              >
                Total Investment
              </Typography>
            </div>
            <AddIcon fontSize="large" style={{ color: "#FF340A" }} />
            <div>
              <Typography
                variant="h3"
                style={{ fontWeight: "bolder", color: "#FF340A" }}
              >
                <CurrencyRupeeIcon fontSize="large" />
                {TotalInterestRecieved}
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#4C1B4E" }}
                align="left"
                gutterBottom
              >
                Total Profit
              </Typography>
            </div>
          </div>
          <Divider
            style={{
              height: "2px",
              backgroundColor: "black",
            }}
            variant="middle"
          />
        </CardContent>
      </Card>
      {/* Active section starts here */}
      <div style={{ marginBottom: "2rem" }}>
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          style={{ fontWeight: "bold", color: "#FF340A" }}
        >
          Active Deposits({ActiveDeposits.length})
        </Typography>
        {ActiveDeposits.length > 0 ? (
          ActiveDeposits.map((deposit, index) => <DepositCard deposit={deposit} key={index} />)
        ) : (
          <NoPlansFound />
        )}
      </div>
      {/* Matured Deposit section start */}
      <div style={{ marginBottom: "2rem" }}>
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          style={{ fontWeight: "bold", color: "#B79715" }}
        >
          Matudred Deposits({MaturedDeposits.length})
        </Typography>
        {MaturedDeposits.length > 0 ? (
          MaturedDeposits.map((deposit, index) => <DepositCard deposit={deposit} key={index} />)
        ) : (
          <NoPlansFound />
        )}
      </div>
    </div>
  );
};

export default DepositDashboard;
