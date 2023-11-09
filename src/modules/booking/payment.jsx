import React, { useState } from 'react';
import './payment.css';

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [name, setName] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [nameError, setNameError] = useState('');
  const [cvvError, setCVVError] = useState('');
  const [expiryError, setExpiryError] = useState('');

  const handlePayment = (event) => {
    // Regular expressions for validation
    const cardNumberPattern = /^\d{16}$/; // Validate 16-digit card number
    const namePattern = /^[A-Za-z\s]+$/; // Allow only alphabetic characters and spaces
    const cvvPattern = /^\d{3}$/; // Validate 3-digit CVV
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // Validate MM/YY format
  
    // Card number validation
    let cardNumberError = '';
    if (!cardNumberPattern.test(cardNumber)) {
      cardNumberError = 'Invalid card number';
    }
  
    // Name validation
    let nameError = '';
    if (!namePattern.test(name)) {
      nameError = 'Invalid name';
    }
  
    // CVV validation
    let cvvError = '';
    if (!cvvPattern.test(cvv)) {
      cvvError = 'Invalid CVV';
    }
  
    // Expiry validation
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  
    const [inputMonth, inputYear] = expiry.split('/');
  
    let expiryError = '';
    if (!expiryPattern.test(expiry)) {
      expiryError = 'Invalid expiry date (MM/YY)';
    } else if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      expiryError = 'Expiry date must be in the future';
    }
  
    // Set the error states
    setCardNumberError(cardNumberError);
    setNameError(nameError);
    setCVVError(cvvError);
    setExpiryError(expiryError);
  
    // Check for errors
    if (cardNumberError || nameError || cvvError || expiryError) {
      // Prevent form submission
      event.preventDefault();
      return false;
    }
  
    // Perform further processing or API calls for the payment
    alert('Payment successful!');
    return true;
  };
  
  // Error messages to display next to input fields
  const cardNumberErrorMessage = cardNumberError ? <div className="error-message" style={{ color: 'red' }}>{cardNumberError}</div> : null;
  const nameErrorMessage = nameError ? <div className="error-message" style={{ color: 'red' }}>{nameError}</div> : null;
  const cvvErrorMessage = cvvError ? <div className="error-message" style={{ color: 'red' }}>{cvvError}</div> : null;
  const expiryErrorMessage = expiryError ? <div className="error-message" style={{ color: 'red' }}>{expiryError}</div> : null;
  
  return (
    <div>
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
                                  setCardNumber(e.target.value);
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
                                  setExpiry(e.target.value);
                                  setExpiryError('');
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
                                  setCVV(e.target.value);
                                  setCVVError('');
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
                            <button className="btn btn-primary w-100" onClick={handlePayment}>
                              Submit
                            </button>
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
    </div>
  );
}

export default Payment;
