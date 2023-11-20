import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";

import ManageReservationService from "../../services/ManageReservationService";
import { useUserInfoSession } from "../../components/header/user-context";

const RetrieveBooking = (props) => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const { userInfoSession } = useUserInfoSession();

  const fetchAllReservationsForUser = () => {
    ManageReservationService.getAllReservation(
      userInfoSession.userId
    ).then((res) => {
      setBookingDetails(res.data);
    });
  };

  // On Page Load
  useEffect(() => {
    fetchAllReservationsForUser();
  }, []);

  const handleView = (bookingId, userId) => {
    props.history.push(`/view-reservation/${bookingId}/${userId}`);
  };

  return (
    <Grid container spacing={2}>
      {bookingDetails && (
        <Grid item xs={12}>
          <div>
            <Typography variant="h5">Booking Details:</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Booking ID
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Departure
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Arrival
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Departure date
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Departure time
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Email
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      First Name
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Last Name
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Flight Number
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Seat Number
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Seat Class
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Total Travel Fare
                    </TableCell>
                    <TableCell style={{ backgroundColor: "lightblue" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookingDetails.map((booking) => (
                    <TableRow key={booking.bookingId}>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.departure}</TableCell>
                      <TableCell>{booking.arrival}</TableCell>
                      <TableCell>
                        {booking.passenger.flightDetails[0].departureDate}
                      </TableCell>
                      <TableCell>
                        {booking.passenger.flightDetails[0].arrivalTime}
                      </TableCell>
                      <TableCell>{booking.passenger.emailId}</TableCell>
                      <TableCell>{booking.passenger.firstName}</TableCell>
                      <TableCell>{booking.passenger.lastName}</TableCell>
                      <TableCell>{booking.flightNumber}</TableCell>
                      <TableCell>
                        {booking.passenger.flightDetails[0].seat.seatNumber}
                      </TableCell>
                      <TableCell>
                        {booking.passenger.flightDetails[0].seat.seatClass}
                      </TableCell>
                      <TableCell>
                        {booking.passenger.payment[0].totalTravelFair}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          className="action-button"
                          onClick={() =>
                            handleView(
                              booking.bookingId,
                              booking.passenger.userId
                            )
                          }
                          style={{ marginRight: "10px" }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default RetrieveBooking;
