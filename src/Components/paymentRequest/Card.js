import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CurrencyRupee } from "@mui/icons-material";
import { convertDateToLocaleString } from "../../constants/helper";
import { useDispatch } from "react-redux";
import {
  deleteRequest,
  rejectRequest,
} from "../../reducers/paymentRequestSlice";
import ConfirmPassword from "./ConfirmPassword";

export default function RequestCard({ request, userEmail }) {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteRequest(request._id));
  };

  const rejectHandler = () => {
    dispatch(rejectRequest(request._id));
  };

  return (
    <Box sx={{ minWidth: 275 }} style={{ margin: "1rem" }}>
      <Card
        variant="outlined"
        style={{ borderRadius: "20px", padding: "10px" }}
      >
        <CardContent style={{ color: "#4C1B4E" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {request.name}
          </Typography>
          <Typography variant="h5" component="div">
            Email: {request.email}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Amount: <CurrencyRupee />
            {request.amount}
          </Typography>
          <Typography variant="body2">
            {request.description}
            <br />
            status: {request.status}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Last Updated: {convertDateToLocaleString(request.updatedAt)}
          </Typography>
        </CardContent>
        <CardActions>
          {request.email === userEmail && (
            <Button variant="contained" size="large" onClick={deleteHandler}>
              Delete
            </Button>
          )}
          {request.email !== userEmail && (
            <>
              <Button variant="contained" size="large" onClick={rejectHandler}>
                Reject
              </Button>

              <ConfirmPassword requestId={request._id} />
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
