import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from "@material-ui/core";

import CustomAlert from '../../components/custom-alert'; // Import the custom alert component

import './payment.css';

function Payment() {
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [name, setName] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [nameError, setNameError] = useState('');
  const [cvvError, setCVVError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const location = useLocation();
  const { selectedSeat, amountToBePaid } = location.state || {};

  const handlePayment = (event) => {
    event.preventDefault();

    const cardNumberPattern = /^\d{16}$/;
    const namePattern = /^[A-Za-z\s]+$/;
    const cvvPattern = /^\d{3}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const sanitizedCardNumber = cardNumber.replace(/\s/g, '');

    let cardNumberError = '';
    if (!cardNumberPattern.test(sanitizedCardNumber)) {
      cardNumberError = 'Invalid card number';
    }

    let nameError = '';
    if (!namePattern.test(name)) {
      nameError = 'Invalid name';
    }

    let cvvError = '';
    if (!cvvPattern.test(cvv)) {
      cvvError = 'Invalid CVV';
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const [inputMonth, inputYear] = expiry.split('/');

    let expiryError = '';
    if (!expiryPattern.test(expiry)) {
      expiryError = 'Invalid expiry date (MM/YY)';
    } else if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      expiryError = 'Expiry date must be in the future';
    }

    setCardNumberError(cardNumberError);
    setNameError(nameError);
    setCVVError(cvvError);
    setExpiryError(expiryError);

    if (cardNumberError || nameError || cvvError || expiryError) {
      setPaymentSuccess(false);
      return false;
    }

    setPaymentSuccess(true);
    return true;
  };

  const handleAlertClose = () => {
    setPaymentSuccess(false);
    if (paymentSuccess) {
      // Redirect to the manage page
      history.push('/manage'); // Adjust the path as needed
    }
  };

  const cardNumberErrorMessage = cardNumberError ? <div className="error-message" style={{ color: 'red' }}>{cardNumberError}</div> : null;
  const nameErrorMessage = nameError ? <div className="error-message" style={{ color: 'red' }}>{nameError}</div> : null;
  const cvvErrorMessage = cvvError ? <div className="error-message" style={{ color: 'red' }}>{cvvError}</div> : null;
  const expiryErrorMessage = expiryError ? <div className="error-message" style={{ color: 'red' }}>{expiryError}</div> : null;

  return (
    <div>
      <div className="flight-details-container">
        <h2>Booking Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Flight</td>
              <td>ABC Airlines - Flight 123</td>
            </tr>
            <tr>
              <td>Seat</td>
              <td>{selectedSeat || 'None'}</td>
            </tr>
            <tr>
              <td>Departure</td>
              <td>November 25, 2023, 10:00 AM</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>₹{amountToBePaid}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card p-3">
              <div className="card-body border p-0">
                <div className="collapse show p-3 pt-0">
                  <div className="row">
                    <div className="col-12">
                      <form action="" className="form">
                        <div className="row">
                          <div className="col-12">
                            <div className="form__div">
                              <input
                                type="text"
                                className="form-control"
                                placeholder=" "
                                value={cardNumber}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const sanitizedInput = inputValue.replace(/\D/g, '').substring(0, 16);
                                  const formattedInput = sanitizedInput.replace(/(\d{4})/g, '$1 ').trim();
                                  setCardNumber(formattedInput);
                                  setCardNumberError('');
                                }}
                              />
                              <label htmlFor="" className="form__label">
                                Card Number
                              </label>
                              {cardNumberErrorMessage}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="form__div">
                              <input
                                type="text"
                                className="form-control"
                                placeholder=" "
                                value={expiry}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const sanitizedInput = inputValue.replace(/\D/g, '').substring(0, 4);
                                  const formattedInput = sanitizedInput.replace(/(\d{2})(\d{0,2})/, '$1/$2');
                                  const [inputMonth, inputYear] = formattedInput.split('/');
                                  const isValidMonth = inputMonth >= '01' && inputMonth <= '12';
                                  const isValidYear = inputYear >= '23' && inputYear <= '28';
                                  setExpiry(formattedInput);
                                  setExpiryError(
                                    !isValidMonth || !isValidYear
                                      ? 'Invalid expiry date (MM / YY)'
                                      : ''
                                  );
                                }}
                              />
                              <label htmlFor="" className="form__label">
                                MM / YY
                              </label>
                              {expiryErrorMessage}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="form__div">
                              <input
                                type="text"
                                className="form-control"
                                placeholder=" "
                                value={cvv}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const sanitizedInput = inputValue.replace(/\D/g, '').substring(0, 3);
                                  setCVV(sanitizedInput);
                                  setCVVError(
                                    sanitizedInput.length !== 3
                                      ? 'CVV must be a 3-digit number'
                                      : ''
                                  );
                                }}
                              />
                              <label htmlFor="" className="form__label">
                                CVV code
                              </label>
                              {cvvErrorMessage}
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form__div">
                              <input
                                type="text"
                                className="form-control"
                                placeholder=" "
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                  setNameError('');
                                }}
                              />
                              <label htmlFor="" className="form__label">
                                Name on the card
                              </label>
                              {nameErrorMessage}
                            </div>
                          </div>

                          <div className="col-12">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Button
                                style={{ backgroundColor: '#000', color: '#fff', flex: 1, marginRight: '5px' }}
                                onClick={handlePayment}
                              >
                                Confirm Payment
                              </Button>
                              <Button
                                style={{ backgroundColor: '#ccc', color: '#000', flex: 1, marginLeft: '5px' }}
                                onClick={() => {
                                  setCardNumber('');
                                  setExpiry('');
                                  setCVV('');
                                  setName('');
                                  setCardNumberError('');
                                  setNameError('');
                                  setCVVError('');
                                  setExpiryError('');
                                }}
                              >
                                Clear Selection
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomAlert
        title="Payment Successful"
        message="Your payment was successful!"
        open={paymentSuccess}
        onClose={handleAlertClose}
      />
    </div>
  );
}

export default Payment;
