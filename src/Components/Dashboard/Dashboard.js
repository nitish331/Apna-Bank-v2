import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Transaction from "./Transaction";
import { Chart } from "./Chart";
import { PieChart } from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AddMoney from "../AddMoney/AddMoney";
import { getUserBalance } from "../../reducers/userSlice";
import VirtualCard from "../VirtualCards/VirtualCard";

export default function Dashboard() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
    dispatch(getUserBalance());
  }, [state.user]);
  return (
    <Box sx={{ display: "flex" }} style={{ marginTop: "4rem" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "auto",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "coloumn",
                  justifyContent: "space-evenly",
                  height: 300,
                }}
              >
                <Chart />
                <PieChart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  height: 300,
                }}
              >
                <Typography variant="h4" component="h4">
                  Balance
                  <AccountBalanceWalletIcon
                    fontSize="3"
                    style={{ marginLeft: "1rem" }}
                  />
                </Typography>
                <Grid align={"center"} justifyContent={"center"}>
                  <Typography variant="h5" component={"h5"}>
                    <CurrencyRupeeIcon />
                    {state.user.balance + state.user.loanAmount}
                  </Typography>
                </Grid>
                <AddMoney />
                {/* <Button variant="contained" startIcon={<AddIcon />}>
                  Add Money
                </Button> */}
              </Paper>
            </Grid>
            {/* Virtual Debit Card */}
            <Grid item xs={12}>
              <VirtualCard />
            </Grid>
            {/* Recent Transactions */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Transaction />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
