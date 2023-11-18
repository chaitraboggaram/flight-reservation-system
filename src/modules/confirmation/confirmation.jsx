import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from 'react-router';
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Confirmation = () => {
  const history = useHistory();
  const location = useLocation();

  // Retrieve user information from the session
  const firstName = sessionStorage.getItem("FirstName");
  const lastName = sessionStorage.getItem("LastName");
  const emailAddress = sessionStorage.getItem("EmailAddress");
  const selectedSeat = sessionStorage.getItem("selectedSeat");
  const basePrice = sessionStorage.getItem("basePrice");
  const totalAmount = sessionStorage.getItem("totalAmount");
  const seatPrice = sessionStorage.getItem("seatPrice");
  const flightName = "";
  const source = "";
  const destination = "";
  const dateOfJourney = "";
  const timeOfJourney = "";

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    table: {
      width: "50%",
      margin: "20px",
      borderCollapse: "collapse",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
      padding: "10px",
      textAlign: "left",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
      padding: "10px",
    },
    button: {
      marginTop: theme.spacing(2),
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "black", // Set button color to black
      "&:hover": {
        backgroundColor: "#333", // Darken the color on hover if needed
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="body2" color="textPrimary">
        Thank you for the Booking. Details are as follows:
      </Typography>

      <table className={classes.table}>
        <tbody>
        <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Passenger Name</td>
            <td>{firstName} {lastName}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Email Address</td>
            <td>{emailAddress}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Flight Name</td>
            <td>{flightName}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Source</td>
            <td>{source}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Destination</td>
            <td>{destination}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Date of Journey</td>
            <td>{dateOfJourney}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Time of Journey</td>
            <td>{timeOfJourney}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Selected Seat</td>
            <td>{selectedSeat}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Ticket Fare (Inclusive of all Taxes)</td>
            <td>₹{basePrice}</td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Seat Selection Price</td>
            <td>
              ₹{seatPrice}
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableHeader}>Total Amount</td>
            <td>₹{totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <Button
        variant="contained"
        className={classes.button}
        onClick={() => history.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

Confirmation.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
};

export default Confirmation;
