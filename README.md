# Bon Voyage: Flight booking System Web Application
![Alt text](A715EF6B-754C-41A9-B6A8-CACFC4C76BDC_1_201_a.jpeg)
This project has been developed using Java Spring boot and ReactJS

## Node/NPM Versions
I'm running node v12.0.0 and npm v7.19.0 as I tinker, there's no plan to
support older versions at the moment.

# Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

To Start Server:
`npm start`

To Visit App:
`localhost:3000`

Install google login for react
`npm install react-google-login`

In case of any errors
`npm audit fix --force`

Landing page is home.jsx, add all routes in it


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
