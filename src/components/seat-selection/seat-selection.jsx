// SeatSelection.js

import React, {useEffect, useState} from 'react';
import './seat-selection.css';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router";

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectPayment, setSelectPayment] = useState(false);
    const history = useHistory();

    const handleSeatClick = (seatNumber) => {
        // Toggle seat selection
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handlePayment = (event) => {
        setSelectPayment(true);
    }

    // Mockup of the seat layout, you may replace this with actual data from your backend
    const seatLayout = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
        ['C1', 'C2', 'C3', 'C4', 'C5'],
        // Add more rows and seats as needed
    ];

    useEffect(() => {
        if(selectPayment) {
            history.push("/payment");
        }
    }, [selectPayment, history]);

    return (
        <div className="seat-selection-container">
            <h2>Select Your Seat</h2>
            <div className="seat-grid">
                {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seat) => (
                            <div
                                key={seat}
                                className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                                onClick={() => handleSeatClick(seat)}
                            >
                                {seat}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="selected-seats">
                <p>Selected Seats: {selectedSeats.join(', ')}</p>
            </div>
            <br/>
            <div>
                <Button variant="contained" color="primary" onClick={handlePayment}>Confirm Seats</Button>
            </div>
        </div>
    );
};

export default SeatSelection;
