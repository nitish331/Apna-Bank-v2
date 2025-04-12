import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import virtualCardImg from "../../images/Virtual-Card.jpg";
import { Grid } from "@mui/material";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import { useSelector } from "react-redux";
import {
  convertDateToLocaleString,
  showVirtualCardNo,
} from "../../constants/helper";
import ShowCvv from "./ShowCvv";
import Cvv from "./Cvv";

const inputStyle = { marginBottom: "1rem" };

function VirtualCard() {
  const virtualCard = useSelector((state) => state.user.user.virtualCard);

  if (!virtualCard) {
    return;
  }

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="h3" variant="h4">
            Your virtual Card Is Here!!
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ mb: 2 }}
          >
            {virtualCard?.isActive
              ? "Active"
              : new Date(virtualCard?.validUpto) > new Date()
              ? "Blocked"
              : "Expired"}
          </Typography>
          {virtualCard?.CVV ? (
            <Cvv virtualCard={virtualCard} />
          ) : (
            <ShowCvv inputStyle={inputStyle} virtualCard={virtualCard} />
          )}
        </CardContent>
      </Box>
      <CardMedia
        // component="img"
        sx={{
          width: "50%",
          borderRadius: 10,
          boxShadow: 10,
          margin: "1rem",
          position: "relative",
        }}
        image={virtualCardImg}
        alt="Virtual Card"
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            position: "absolute",
            top: "1rem",
            right: "2rem",
            fontSize: "1.7rem",
          }}
        >
          Apna Bank
        </Typography>
        <Typography
          variant="h2"
          sx={{ position: "absolute", left: "2rem", top: "3rem" }}
        >
          <MemoryRoundedIcon sx={{ color: "white", fontSize: "6rem" }} />
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "10%",
          }}
          gutterBottom
        >
          {showVirtualCardNo(virtualCard?.CardNo)}
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            {virtualCard?.cardHolderName}
          </Typography>
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ margin: " auto", position: "absolute", top: "79%" }}
        >
          <Grid xs={6}>
            <Typography sx={{ color: "white", fontSize: "1.3rem" }}>
              Valid From: {convertDateToLocaleString(virtualCard?.validFrom)}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography sx={{ color: "white", fontSize: "1.3rem" }}>
              Valid Upto: {convertDateToLocaleString(virtualCard?.validUpto)}
            </Typography>
          </Grid>
        </Grid>
      </CardMedia>
    </Card>
  );
}
export default VirtualCard;
