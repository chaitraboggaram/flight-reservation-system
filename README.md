# Bon Voyage: Flight booking System Web Application
![Alt text](public/BonVoyage.jpeg)
<br>

This project has been developed using Java Spring boot and ReactJS and is running node v12.0.0 and npm v7.19.0
<br>

# Installation and Setup Instructions
Clone down this repository. You will need `node` and `npm` installed globally on your machine.

### Installation:
Install npm modules:
`npm install`

To Start Server:
`npm start`

To Visit App:
`localhost:3000`

In case of any errors (ensure the number of vulnerabilities is less than 10 - sometimes running twice helps!)
`npm audit fix --force`

Installing database component for react
`npm install react-data-table-component`

#### Landing page is `home.jsx`, add all routes in it
<br/>

# Creating google authentication
1. Login to https://console.cloud.google.com/
2. Go to APIs & Services, click on Credentials in the left pane
3. Click on create credentials, select OAuth Client ID request
4. Select application as Web Application, give it a name
5. Provide Authorised JavaScript origins as 
"http://127.0.0.1:3000"
"http://localhost:3000"
6. Provide Authorised redirect URIs as  
"http://127.0.0.1:3000/callback"
"http://localhost:3000/callback"



## Frontend Web Pages
#### Flight Search Page
![Alt text](<Flight Search.jpg>)

#### Google Authentication for Secure Login
![Alt text](<Google Authentication.jpg>)

#### Seat Selection
Black: Booked
Green: Selected
Gray: Available
![Alt text](<Seat Selection.JPEG>) 

#### Payment Page
![Alt text](Payment.JPEG) 

#### Flight Seat Booking Confirmation
![Alt text](<Booking Confirmation.jpg>) 

#### Manage Bookings
![Alt text](<User All Bookings.JPEG>) 
![Alt text](<Booking Details.jpg>) 
![Alt text](<Edit Booking.jpg>) 

#### Admin Pages
![Alt text](<Admin All Flights.JPEG>) 
![Alt text](<Reservation List for Flight.jpg>) 
![Alt text](<Update Flight.JPEG>) 
![Alt text](<Add Flight.JPEG>)  