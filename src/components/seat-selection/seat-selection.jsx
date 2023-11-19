import React, { useEffect, useState } from 'react';
import './seat-selection.css';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useUserInfoSession } from '../header/user-context';
import SeatBookingServices from '../../services/seat-booking-services';

const SEAT_PRICE = 7000 + Math.floor(Math.random() * (2 * 249 + 1)) - 249;

const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectPayment, setSelectPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [amountToBePaid, setAmountToBePaid] = useState(0);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const history = useHistory();

  const { userInfoSession, updateUserInfoSession } = useUserInfoSession();

  useEffect(() => {
    const seatsInformation = async () => {
      const data = await SeatBookingServices.getAllSeats(
        userInfoSession.selectedFlightNumber
      );
      console.log("Seat Info from Backend: ", data);

      // Filter seats with passengerId === -1 for available seats
      const availableSeats = data.filter(seat => seat.passengerId === -1);
      const bookedSeats = data.filter(seat => seat.passengerId !== -1);
      setAvailableSeats(availableSeats);
      setBookedSeats(bookedSeats);
    };
    seatsInformation();
  }, [userInfoSession.selectedFlightNumber]);

  const handleSeatClick = (seatNumber, seatClass) => {
    setSelectedSeat((prevSeat) => (prevSeat === seatNumber ? null : seatNumber));
    setSelectedClass(seatClass);
  };

  const handlePayment = () => {
    if (selectedSeat && availableSeats.map(seat => seat.seatNumber).includes(selectedSeat)) {
      sessionStorage.setItem('selectedSeat', selectedSeat);
      sessionStorage.setItem('basePrice', SEAT_PRICE);
      const fetchBookInformation = async () => {
        const data = await SeatBookingServices.bookSeats(
          userInfoSession.selectedFlightNumber,
          userInfoSession.userId,
          selectedSeat,
          selectedClass,
          SEAT_PRICE
        );
        console.log("Seat Info from Backend: ", data);
      };
      fetchBookInformation();

      setSelectPayment(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const isSeatBooked = (seat) => bookedSeats.includes(seat);

  useEffect(() => {
    if (selectPayment) {
      history.push('/payment', { selectedSeat, amountToBePaid });
    }
  }, [selectPayment, history, selectedSeat, amountToBePaid]);

  // Function to get class based on seat number
  const getClassFromSeatNumber = (seatNumber) => {
    if (seatNumber.startsWith('F')) {
      return 'First Class';
    } else if (seatNumber.startsWith('B')) {
      return 'Business Class';
    } else if (seatNumber.startsWith('E')) {
      return 'Economy Class';
    }
    return 'Unknown Class';
  };

  // Organize seats by class and rows
  const organizedSeats = availableSeats.reduce((acc, seat) => {
    const seatClass = getClassFromSeatNumber(seat.seatNumber);
    if (!acc[seatClass]) {
      acc[seatClass] = [];
    }
    acc[seatClass].push(seat);
    return acc;
  }, {});

  return (
    <div className="seat-selection-container">
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
        Select Your Seat
      </h2>
      <div className="container">
        {/* Render seat layout here */}
        {Object.entries(organizedSeats).map(([classType, seats]) => (
          <div key={classType} style={{ textAlign: 'center' }}>
            <h3>{classType}</h3>
            <div className="seat-row">
              {seats.map(seat => (
                <div
                  key={seat.seatNumber}
                  className={`seat ${selectedSeat === seat.seatNumber ? 'selected' : ''} ${
                    isSeatBooked(seat.seatNumber) ? 'booked' : ''
                  }`}
                  onClick={() => handleSeatClick(seat.seatNumber, seat.seatClass)}
                >
                  {seat.seatNumber}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <p>Selected Seat: {selectedSeat || 'None'}</p>
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ backgroundColor: '#000', color: '#fff' }}
          onClick={handlePayment}
        >
          Confirm Seat
        </Button>
        <Button
          style={{ backgroundColor: '#ccc', color: '#000', marginLeft: '10px' }}
          onClick={() => {
            setSelectedSeat(null);
            setSelectedClass(null);
            setAmountToBePaid(0);
          }}
        >
          Clear Selection
        </Button>
      </div>

      {/* Custom Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle
          style={{
            textAlign: 'center',
            background: 'black',
            color: 'white',
            padding: '10px 0',
          }}
        >
          <ErrorOutline
            style={{ fontSize: '2rem', verticalAlign: 'middle', marginRight: '5px' }}
          />
          Alert
        </DialogTitle>
        <DialogContent style={{ background: 'white', padding: '20px' }}>
          <DialogContentText style={{ fontSize: '16px', textAlign: 'center' }}>
            {isSeatBooked(selectedSeat)
              ? 'This seat is already booked'
              : 'Please select a seat before confirming'}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: 'center', background: 'white', padding: '10px' }}
        >
          <Button
            onClick={handleModalClose}
            color="primary"
            variant="contained"
            style={{ background: 'black', color: 'white' }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SeatSelection;
