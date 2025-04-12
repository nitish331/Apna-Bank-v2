import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import { CurrencyRupee } from "@mui/icons-material";
import EastIcon from "@mui/icons-material/East";
import {
  calculatePercentageDaysLeft,
  convertDateToLocaleString,
} from "../../constants/helper";
const DepositCard = ({ deposit }) => {
  console.log(
    calculatePercentageDaysLeft(deposit.createdAt, deposit.maturityDate)
  );
  return (
    <div style={{ margin: "1.5rem 0", cursor: "pointer" }}>
      <Card style={{ padding: "10px" }}>
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                padding: "9px",
                borderRight: "2px solid #235F45",
                borderBottom: "2px solid #235F45",
              }}
            >
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#4C1B4E",
                }}
              >
                <SavingsIcon fontSize="large" style={{ margin: "0 19px" }} />
                <div
                  style={{
                    paddingRight: "20px",
                  }}
                >
                  <Typography variant="body1" align="start">
                    ROI of {deposit.interest}% Per Annum
                  </Typography>
                  <Typography variant="body1" align="start">
                    Invested Amount: <CurrencyRupee fontSize="normal" />
                    {deposit.amount}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{ borderBottom: "2px solid #235F45", padding: "9px" }}
            >
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  color: "#4C1B4E",
                }}
              >
                <div>
                  <Typography variant="body1" align="start">
                    {convertDateToLocaleString(deposit.createdAt)}
                  </Typography>
                  <Typography variant="body1" align="start">
                    Start Date
                  </Typography>
                </div>
                <EastIcon fontSize="large" />
                <div>
                  <Typography variant="body1" align="start">
                    {convertDateToLocaleString(deposit.maturityDate)}
                  </Typography>
                  <Typography variant="body1" align="start">
                    Maturity Date
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} style={{ paddingTop: "9px" }}>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  color: "#4C1B4E",
                }}
              >
                <div>
                  <Typography variant="body1" align="start">
                    <CurrencyRupee />
                    {deposit.maturityAmount}
                  </Typography>
                  <Typography variant="body1" align="start">
                    Total PayOut
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" align="start">
                    <CurrencyRupee />
                    {deposit.maturityAmount - deposit.amount}
                  </Typography>
                  <Typography variant="body1" align="start">
                    Net Profit
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <div
          style={{
            height: "4px",
            width: `${calculatePercentageDaysLeft(
              deposit.createdAt,
              deposit.maturityDate
            )}%`,
            backgroundColor: "yellow",
          }}
        ></div>
      </Card>
    </div>
  );
};

export default DepositCard;
