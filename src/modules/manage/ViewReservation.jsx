import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ManageReservationService from "../../services/ManageReservationService";
import BookingService from "../../services/BookingService";

const ViewReservation = (props) => {
  const { bookingId } = useParams();
  const { userId } = useParams();
  const [bookingDetail, setBookingDetail] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [flightNumber, setFlightNumber] = useState();
  const [seats, setSeatDetails] = useState();
  const [originalSeatDetails, setOriginalSeatDetails] = useState();
  const [showSaveCancel, setShowSaveCancel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({
    firstName: bookingDetail?.passenger.firstName || "",
    lastName: bookingDetail?.passenger.lastName || "",
    emailId: bookingDetail?.passenger.emailId || "",
  });

  const fetchData = () => {
    ManageReservationService.getOneReservation(bookingId, userId).then(
      (res) => {
        console.log(res.data);
        setBookingDetail(res.data);
        setFlightNumber(res.data.passenger.flightDetails[0].flightNumber);
        setOriginalSeatDetails(res.data.passenger.flightDetails[0].seat);
        setEditedFields(
          res.data.passenger.firstName,
          res.data.passenger.lastName,
          res.data.passenger.emailId
        );
      }
    );
  };

  useEffect(() => {
    console.log("view")
    fetchData();
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setEditedFields({
      ...editedFields,
      [fieldName]: value,
    });
  };

  const handleEdit = () => {
    // props.history.push(`/edit-reservation/${bookingId}/${userId}`);
    BookingService.getAllSeatsFromAFlight(flightNumber).then((res) => {
      setSeatDetails(res.data);
      setEditMode(true);
      setShowSaveCancel(true);
    });
  };

  const handleRedirect = () => {
    props.history.push(`/manage`);
  };

  const handleAddSeat = (seatNumber, seatClass, price) => {
    const updatedBookingDetail = {
      ...bookingDetail,
      passenger: {
        ...bookingDetail.passenger,
        flightDetails: [
          {
            ...bookingDetail.passenger.flightDetails[0],
            seat: {
              seatNumber: seatNumber,
              seatClass: seatClass,
              price: price,
            },
          },
        ],
        payment: [
          {
            paymentId: bookingDetail.passenger.payment[0].paymentId,
            totalTravelFair: price,
          },
        ],
      },
    };

    // Update the state with the new bookingDetail
    setBookingDetail(updatedBookingDetail);
  };

  const handleCancelChanges = () => {
    // Revert to the original seat details
    handleAddSeat(
      originalSeatDetails.seatNumber,
      originalSeatDetails.seatClass,
      originalSeatDetails.price
    );
    setEditMode(false);
    setShowSaveCancel(false);
  };

  const handleSave = () => {
    // Send the updated data to the backend
    setEditMode(false);
    setShowSaveCancel(false);
    try {
      const updatedReservation = {
        bookingId: bookingDetail.bookingId,
        arrival: bookingDetail.arrival,
        passenger: {
          userId: bookingDetail.passenger.userId,
          emailId: editedFields.emailId
            ? editedFields.emailId
            : bookingDetail.passenger.emailId,
          admin: 0,
          firstName: editedFields.firstName
            ? editedFields.firstName
            : bookingDetail.passenger.firstName,
          lastName: editedFields.lastName
            ? editedFields.lastName
            : bookingDetail.passenger.lastName,
          phoneNumber: bookingDetail.passenger.phoneNumber,
          flightDetails: [
            {
              flightNumber:
                bookingDetail.passenger.flightDetails[0].flightNumber,
              departure: bookingDetail.departure,
              arrival: bookingDetail.arrival,
              departureDate:
                bookingDetail.passenger.flightDetails[0].departureDate,
              arrivalDate: bookingDetail.passenger.flightDetails[0].arrivalDate,
              departureTime:
                bookingDetail.passenger.flightDetails[0].departureTime,
              arrivalTime: bookingDetail.passenger.flightDetails[0].arrivalTime,
              seatAvailability:
                bookingDetail.passenger.flightDetails[0].seatAvailability,
              seat: {
                seatNumber:
                  bookingDetail.passenger.flightDetails[0].seat.seatNumber,
                seatClass:
                  bookingDetail.passenger.flightDetails[0].seat.seatClass,
                price: bookingDetail.passenger.flightDetails[0].seat.price,
                booked: true,
              },
            },
          ],
          payment: [
            {
              paymentId: bookingDetail.passenger.payment[0].paymentId,
              totalTravelFair:
                bookingDetail.passenger.flightDetails[0].seat.price,
              flightNumber:
                bookingDetail.passenger.flightDetails[0].flightNumber,
            },
          ],
        },
        flightNumber: bookingDetail.passenger.flightDetails[0].flightNumber,
        departure: bookingDetail.departure,
      };
      console.log(
        "updated reservation=> " + JSON.stringify(updatedReservation)
      );

      ManageReservationService.updateReservation(
        bookingId,
        userId,
        updatedReservation
      ).then((res) => {
        console.log("update reservation", res.data);
        setBookingDetail(res.data);
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = (bookingId, userId) => {
    try {
      ManageReservationService.deleteReservation(bookingId, userId).then(
        (res) => {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            props.history.push(`/manage`);
          }, 1000);
          setShowConfirmation(false);
        }
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <Grid container spacing={2}>
      {bookingDetail && (
        <Grid item xs={12}>
          <Paper style={{ padding: "20px" }}>
            <Typography style={{ backgroundColor: "lightblue" }} variant="h5">
              Booking Details:
            </Typography>
            <Divider style={{ margin: "10px 0" }} />
            <Typography variant="body1">
              <strong>Booking ID:</strong> {bookingDetail.bookingId}
            </Typography>
            <Typography variant="body1">
              <strong>Flight Number:</strong> {bookingDetail.flightNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Departure:</strong> {bookingDetail.departure}
            </Typography>
            <Typography variant="body1">
              <strong>Arrival:</strong> {bookingDetail.arrival}
            </Typography>
            <Typography variant="body1">
              <strong>Departure date:</strong>{" "}
              {bookingDetail.passenger.flightDetails[0].departureDate}
            </Typography>
            <Typography variant="body1">
              <strong>Departure time:</strong>{" "}
              {bookingDetail.passenger.flightDetails[0].departureTime}
            </Typography>
            <Typography variant="body1">
              <strong>Arrival date:</strong>{" "}
              {bookingDetail.passenger.flightDetails[0].arrivalDate}
            </Typography>
            <Typography variant="body1">
              <strong>Arrival time:</strong>{" "}
              {bookingDetail.passenger.flightDetails[0].arrivalTime}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editedFields.emailId}
                  onChange={(e) => handleFieldChange("emailId", e.target.value)}
                  defaultValue={bookingDetail.passenger.emailId}
                />
              ) : (
                bookingDetail.passenger.emailId
              )}
            </Typography>

            <Typography variant="body1">
              <strong>First Name:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editedFields.firstName}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                  defaultValue={bookingDetail.passenger.firstName}
                />
              ) : (
                bookingDetail.passenger.firstName
              )}
            </Typography>
            <Typography variant="body1">
              <strong>Last Name:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editedFields.lastName}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                  defaultValue={bookingDetail.passenger.lastName}
                />
              ) : (
                bookingDetail.passenger.lastName
              )}
            </Typography>
            <Typography variant="body1">
              <strong>Seat Number:</strong>{" "}
              {bookingDetail.passenger.flightDetails[0].seat.seatNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Seat Class:</strong>{" "}
              {bookingDetail.passenger.flightDetails[0].seat.seatClass}
            </Typography>
            <Typography variant="body1">
              <strong> Total Travel Fare:</strong>{" "}
              {bookingDetail.passenger.payment[0].totalTravelFair}
            </Typography>
            <Divider style={{ margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleRedirect}
                style={{
                  marginRight: "10px",
                  display: showSaveCancel ? "none" : "block",
                }}
              >
                back to reservations
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleEdit}
                style={{
                  marginRight: "10px",
                  display: showSaveCancel ? "none" : "block",
                }}
              >
                Edit Reservation
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleSave}
                style={{
                  marginRight: "10px",
                  display: showSaveCancel ? "block" : "none",
                }}
              >
                save changes
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleCancelChanges}
                style={{
                  marginRight: "10px",
                  display: showSaveCancel ? "block" : "none",
                }}
              >
                Cancel Changes
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="action-button"
                onClick={handleDelete}
              >
                Delete Reservation
              </Button>
            </div>

            <Divider style={{ margin: "10px 0" }} />
            {editMode && (
              <>
                <Typography variant="h6">Available Seats:</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ backgroundColor: "lightblue" }}>
                          Seat Number
                        </TableCell>
                        <TableCell style={{ backgroundColor: "lightblue" }}>
                          Seat Class
                        </TableCell>
                        <TableCell style={{ backgroundColor: "lightblue" }}>
                          Seat Price
                        </TableCell>
                        <TableCell style={{ backgroundColor: "lightblue" }}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {seats
                        .filter((seat) => !seat.booked)
                        .map((seat, index) => (
                          <TableRow key={index}>
                            <TableCell>{seat.seatNumber}</TableCell>
                            <TableCell>{seat.seatClass}</TableCell>
                            <TableCell>{seat.price}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleAddSeat(
                                    seat.seatNumber,
                                    seat.seatClass,
                                    seat.price
                                  )
                                }
                              >
                                Add Seat
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Paper>
        </Grid>
      )}

      <Dialog
        open={showConfirmation}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this reservation?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button
            onClick={() =>
              handleConfirmDelete(
                bookingDetail.bookingId,
                bookingDetail.passenger.userId
              )
            }
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Reservation deleted successfully!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessMessage(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ViewReservation;
