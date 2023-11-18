import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import "./confirmation.css"; // Import the CSS file

const Confirmation = () => {
  const history = useHistory();

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

  return (
    <div className="confirmation-container">
      <Typography variant="h5" color="black">
        Your flight is now set for an unforgettable journey with Bon Voyage Flights. 
      </Typography>
      <br/>
      <Typography variant="h6" color="black">
      We are thrilled to confirm your booking. Here are the enchanting details of your adventure: ✈️✨
      </Typography>
      <br/>
      <br/>
      <table className="confirmation-table">
        <tbody>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Passenger Full Name</td>
            <td className="confirmation-table-data second-column">{firstName} {lastName}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Email Address</td>
            <td className="confirmation-table-data second-column">{emailAddress}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Flight Name</td>
            <td className="confirmation-table-data second-column">{flightName}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Source City</td>
            <td className="confirmation-table-data second-column">{source}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Destination City</td>
            <td className="confirmation-table-data second-column">{destination}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Date of Journey</td>
            <td className="confirmation-table-data second-column">{dateOfJourney}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Time of Journey</td>
            <td className="confirmation-table-data second-column">{timeOfJourney}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Selected Seat</td>
            <td className="confirmation-table-data second-column">{selectedSeat}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Ticket Fare (Inclusive of all Taxes)</td>
            <td className="confirmation-table-data second-column">₹{basePrice}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Seat Selection Price</td>
            <td className="confirmation-table-data second-column">₹{seatPrice}</td>
          </tr>
          <tr className="confirmation-table-row">
            <td className="confirmation-table-header first-column">Total Amount</td>
            <td className="confirmation-table-data second-column">₹{totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <Button
        variant="contained"
        className="confirmation-button"
        onClick={() => history.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

Confirmation.propTypes = {
  history: PropTypes.object,
};

export default Confirmation;
