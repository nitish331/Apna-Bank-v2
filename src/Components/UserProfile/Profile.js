import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import EditProfile from "./EditProfile";

const paperStyle = {
  padding: 30,
  height: "65vh",
  width: 400,
  margin: "6rem auto",
};

const avatarStyle = { backgroundColor: "#1bbd7e", marginBottom: "1rem" };

const Profile = () => {
  const state = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
  }, [state.user]);
  return (
    <Grid>
      <Paper elevation={6} style={paperStyle}>
        <Grid align={"center"}>
          <Avatar style={avatarStyle}>
            {state.user.name && state.user.name[0]}
          </Avatar>
          <h2>Your Profile!!</h2>
        </Grid>
        <Grid
          container
          spacing={3}
          rowSpacing={4}
          mt={3}
          justifyContent="flex-start"
          alignItems="center"
          m={"auto"}
        >
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              Your Name
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{state.user.name}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          rowSpacing={4}
          mt={3}
          justifyContent="flex-start"
          alignItems="center"
          m={"auto"}
        >
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              Your Email
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{state.user.email}</Typography>
          </Grid>
        </Grid>
        <div style={{ marginTop: "2rem" }}>
          <EditProfile />
        </div>
      </Paper>
    </Grid>
  );
};

export default Profile;
