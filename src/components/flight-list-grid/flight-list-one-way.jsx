import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow
} from "@material-ui/core";

import { thousandSeparator } from "../../services/global-services";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleServiceSingleton from "../../services/google-service-singleton";

const useStyles = makeStyles(() => ({
  textAlign: {
    textAlign: "right"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  cardContainer: {
    marginBottom: 5
  }
}));

const FlightListOneWay = (props) => {
  const { flightList, bookNow } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loginDone, setLoginDone] = useState(false);
  const history = useHistory();
  let component = null;

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GoogleServiceSingleton.getUserInfo(tokenResponse.access_token).then(
        (userInfo) => {
          console.log("Name: ", userInfo.name);
          console.log("Email: ", userInfo.email);
          setLoginDone(true);
        }
      );
    },
  });

  /**
   * @function handleChangePage
   * @param {object} event
   * @param {object} newPage
   * @description change page in pagination
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * @function handleChangeRowsPerPage
   * @param {object} event
   * @description change rows per page in pagination
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFlightSelection = async (event) => {
    if (!loginDone) {
      await login();
    }
  };

  if (flightList?.loading) {
    component = <CircularProgress />;
  } else if (flightList?.result?.length > 0) {
    component = (
      <Table>
        <TableBody>
          {flightList.result
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((val, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Card className={classes.cardContainer}>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={2}>
                            <Avatar
                              src={val.airlineLogo}
                              alt={val.airlineName}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            className={classes.textAlignCenter}
                          >
                            <Typography align="center">
                              {val.departureTime}
                            </Typography>
                            <Typography variant="caption">
                              {val.departure}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            className={classes.textAlignCenter}
                          >
                            <Typography>{val.airlineName}</Typography>
                            <Typography variant="caption">
                              {val.flightNumber}
                            </Typography>
                            <br />
                            <Typography variant="caption">
                              {val.noOfStops === "0"
                                ? `No Stops`
                                : `${val.noOfStops} Stops`}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            className={classes.textAlignCenter}
                          >
                            <Typography>{val.arrivalTime}</Typography>
                            <Typography variant="caption">
                              {val.arrival}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} className={classes.textAlign}>
                            <Button
                              variant="contained"
                              style={{ backgroundColor: "black", color: "white" }}
                              onClick={handleFlightSelection}
                            >{`Rs. ${thousandSeparator(val?.price)}`}</Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={flightList.result.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    );
  } else if (flightList?.result?.length === 0) {
    component = <Typography>{`No Records Found..`}</Typography>;
  } else if (flightList?.error) {
    component = <Typography>{`Unable to fetch Data...`}</Typography>;
  }

  useEffect(() => {
    const redirectUser = async () => {
      if (loginDone) {
        await history.push("/seat-selection");
      }
    };
    redirectUser();
  }, [loginDone, history]);

  return (
    <Grid container>
      <Grid item xs={12}>
        {component}
      </Grid>
    </Grid>
  );
};

FlightListOneWay.propTypes = {
  classes: PropTypes.object,
  flightList: PropTypes.object,
  bookNow: PropTypes.func,
};

export default FlightListOneWay;
