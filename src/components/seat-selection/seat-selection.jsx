import React, { useEffect, useState } from 'react';
import './seat-selection.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { ErrorOutline } from '@material-ui/icons';
import { useHistory } from "react-router";

const SeatSelection = () => {
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectPayment, setSelectPayment] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [amountToBePaid, setAmountToBePaid] = useState(0); // Initialize with your default amount
    const history = useHistory();

    // Define booked seats
    const bookedSeats = ['B2', 'E5', 'F3'];

    // Example seatLayout, modify based on your actual seat arrangement
    const seatLayout = [
        { class: 'Business Class', seats: ['B1', 'B2', 'B3', 'B4'] },
        { class: 'First Class', seats: ['F1', 'F2', 'F3', 'F4'] },
        {
            class: 'Economy Class',
            rows: [
                ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
                ['E7', 'E8', 'E9', 'E10', 'E11', 'E12'],
                ['E13', 'E14', 'E15', 'E16', 'E17', 'E18'],
                ['E19', 'E20', 'E21', 'E22', 'E23', 'E24'],
                ['E25', 'E26', 'E27', 'E28', 'E29', 'E30']
            ]
        }
    ];

    const handleSeatClick = (seatNumber) => {
        setSelectedSeat((prevSeat) => (prevSeat === seatNumber ? null : seatNumber));
    };

    const handlePayment = () => {
        if (selectedSeat && !bookedSeats.includes(selectedSeat)) {
            const calculatedAmount = 7000; 
            setAmountToBePaid(calculatedAmount);

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
            history.push("/payment", { selectedSeat, amountToBePaid }); // Pass the state as an object
        }
    }, [selectPayment, history, selectedSeat, amountToBePaid]);

    return (
        <div className="seat-selection-container">
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Select Your Seat</h2>
            <div className="container">
                {seatLayout.map((classSeats, classIndex) => (
                    <div key={classIndex} style={{ textAlign: 'center' }}>
                        <h3 style={{ display: 'inline-block', marginBottom: '10px' }}>{classSeats.class}</h3>
                        {classSeats.seats && (
                            <div className="seat-row">
                                {classSeats.seats.map((seat) => (
                                    <div
                                        key={seat}
                                        className={`seat ${selectedSeat === seat ? 'selected' : ''} ${isSeatBooked(seat) ? 'booked' : ''}`}
                                        onClick={() => handleSeatClick(seat)}
                                    >
                                        {seat}
                                    </div>
                                ))}
                            </div>
                        )}
                        {classSeats.rows && classSeats.rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="seat-row">
                                {row.map((seat) => (
                                    <div
                                        key={seat}
                                        className={`seat ${selectedSeat === seat ? 'selected' : ''} ${isSeatBooked(seat) ? 'booked' : ''}`}
                                        onClick={() => handleSeatClick(seat)}
                                    >
                                        {seat}
                                    </div>
                                ))}
                            </div>
                        ))}
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
                        setAmountToBePaid(0);
                    }}
                >
                    Clear Selection
                </Button>
            </div>

            {/* Custom Modal */}
            <Dialog open={openModal} onClose={handleModalClose}>
                <DialogTitle style={{ textAlign: 'center', background: 'black', color: 'white', padding: '10px 0' }}>
                    <ErrorOutline style={{ fontSize: '2rem', verticalAlign: 'middle', marginRight: '5px' }} />
                    Alert
                </DialogTitle>
                <DialogContent style={{ background: 'white', padding: '20px' }}>
                    <DialogContentText style={{ fontSize: '16px', textAlign: 'center' }}>
                        {isSeatBooked(selectedSeat) ? 'This seat is already booked' : 'Please select a seat before confirming'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center', background: 'white', padding: '10px' }}>
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
