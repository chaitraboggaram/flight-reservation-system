// SeatSelection.js

import React, { useEffect, useState } from 'react';
import './seat-selection.css';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const SeatSelection = () => {
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectPayment, setSelectPayment] = useState(false);
    const history = useHistory();

    const handleSeatClick = (seatNumber) => {
        // Toggle seat selection
        setSelectedSeat((prevSeat) => (prevSeat === seatNumber ? null : seatNumber));
    };

    const handlePayment = () => {
        // Check if a seat is selected before proceeding to payment
        if (selectedSeat) {
            setSelectPayment(true);
        } else {
            // Handle the case where no seat is selected
            alert('Please select a seat before confirming.');
        }
    };

    // Mockup of the seat layout
    const seatLayout = [
        { class: 'Business Class', seats: ['B1', 'B2', 'B3', 'B4'] },
        { class: 'First Class', seats: ['F1', 'F2', 'F3', 'F4'] },
        { class: 'Economy Class',
          rows: [
            ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
            ['E7', 'E8', 'E9', 'E10', 'E11', 'E12'],
            ['E13', 'E14', 'E15', 'E16', 'E17', 'E18'],
            ['E19', 'E20', 'E21', 'E22', 'E23', 'E24'],
            ['E25', 'E26', 'E27', 'E28', 'E29', 'E30'],
            ['E31', 'E32', 'E33', 'E34', 'E35', 'E36'],
            ['E37', 'E38', 'E39', 'E40', 'E41', 'E42'],
            ['E43', 'E44', 'E45', 'E46', 'E47', 'E48']
          ]
        }
        // Add more classes and seats as needed
    ];

    useEffect(() => {
        if (selectPayment) {
            history.push("/payment");
        }
    }, [selectPayment, history]);

    return (
        <div className="seat-selection-container">
            <h2>Select Your Seat</h2>
            {seatLayout.map((classSeats, classIndex) => (
                <div key={classIndex}>
                    <h3>{classSeats.class}</h3>
                    {classSeats.seats && (
                        <div className="seat-row">
                            {classSeats.seats.map((seat) => (
                                <div
                                    key={seat}
                                    className={`seat ${selectedSeat === seat ? 'selected' : ''}`}
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
                                    className={`seat ${selectedSeat === seat ? 'selected' : ''}`}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    {seat}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            <div className="selected-seats">
                <p>Selected Seat: {selectedSeat || 'None'}</p>
            </div>
            <br />
            <div>
                <Button variant="contained" color="primary" onClick={handlePayment}>Confirm Seat</Button>
            </div>
        </div>
    );
};

export default SeatSelection;
