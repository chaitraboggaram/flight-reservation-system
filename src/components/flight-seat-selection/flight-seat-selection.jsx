import React, { useState } from 'react';
import './flight-seat-selection.css'; // You may want to create a separate CSS file for styling

const FlightSeatSelection = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsInRow = 6;
    const columns = 3;
    const totalRows = 10;

    // Initialize seat selection state
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Handle seat selection
    const handleSeatClick = (row, seatNumber) => {
        const seat = `${row}${seatNumber}`;

        // Check if the seat is already selected
        if (selectedSeats.includes(seat)) {
            // If selected, remove it from the list
            setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat !== seat));
        } else {
            // If not selected, add it to the list
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (
        <div className="flight-seat-selection">
            <h2>Flight Seat Selection</h2>
            <div className="seat-grid">
                {rows.map(row => (
                    <div key={row} className="seat-row">
                        {Array.from({ length: seatsInRow / columns }, (_, colIndex) => (
                            <div key={colIndex} className="seat-column">
                                {Array.from({ length: columns }, (_, seatIndex) => (
                                    <div key={seatIndex + 1} className="seat">
                                        <input
                                            type="checkbox"
                                            id={`${row}${colIndex * columns + seatIndex + 1}`}
                                            checked={selectedSeats.includes(`${row}${colIndex * columns + seatIndex + 1}`)}
                                            onChange={() => handleSeatClick(row, colIndex * columns + seatIndex + 1)}
                                        />
                                        <label htmlFor={`${row}${colIndex * columns + seatIndex + 1}`}>
                                            {row}
                                            {colIndex * columns + seatIndex + 1}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <h3>Selected Seats</h3>
                {selectedSeats.length > 0 ? (
                    <p>{selectedSeats.join(', ')}</p>
                ) : (
                    <p>No seats selected</p>
                )}
            </div>
        </div>
    );
};
export default FlightSeatSelection;
