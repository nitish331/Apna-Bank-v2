import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../reducers/userSlice";
import { convertDateToLocaleString } from "../../constants/helper";
import { useNavigate } from "react-router";
import { Card, CardContent, Typography } from "@mui/material";

const NoTransactions = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">No Transactions Found</Typography>
      </CardContent>
    </Card>
  );
};

export default function Transaction() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate("/user/login");
  React.useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
    dispatch(fetchTransaction());
  }, [state.user]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount&nbsp;</TableCell>
            <TableCell align="center">Date&nbsp;</TableCell>
            {/* <TableCell align="right">&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.transactions.length > 0 ? (
            state.transactions.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">
                  {convertDateToLocaleString(row.createdAt)}
                </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))
          ) : (
            <NoTransactions />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
