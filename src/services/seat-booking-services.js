import {LOCAL_BACKEND_BASE_URL} from "../constants";
import axios from 'axios';

export default class SeatBookingServices {
    static getAllSeats = (flightNumber) => {
        const getAllSeatsURL = LOCAL_BACKEND_BASE_URL + 'booking/getAllSeats/' + flightNumber;
        return axios.get(getAllSeatsURL)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("Error in Backend call, sending back empty seats", error);
                return []
            })
    }

    static bookSeats = (flightNumber, userId, seatNumber, seatClass, price) => {
        const bookSeatsURL = LOCAL_BACKEND_BASE_URL + 'booking/bookSeats/' + flightNumber + '/' + userId;
        const bookSeatsRequest = {
            seatNumber: seatNumber,
            seatClass: seatClass,
            price: price,
            booked: false
        }

        return axios.post(bookSeatsURL, bookSeatsRequest)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("Error in Backend call, sending back empty booking", error);
                return null;
            })
    }

    static createReservation = (flightNumber, userId, seatNumber, price) => {
        const createReservationURL = LOCAL_BACKEND_BASE_URL + 'payment/createReservation/' + flightNumber + '/' + userId + '/' + seatNumber;
        const createReservation = {
            totalTravelFair: price
        }

        return axios.post(createReservationURL, createReservation)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("Error in Backend call, sending back empty reservation", error);
                return null;
            })
    }
}
