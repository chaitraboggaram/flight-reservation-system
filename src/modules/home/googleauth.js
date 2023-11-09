import React from 'react';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
};

const GoogleAuth = () => {
  return (
    <div>
      <h2>To continue, Sign in with your Google account:</h2>
    

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <div className="additional-info">
        <p>By clicking "Login with Google," you agree to our terms and privacy policy.</p>
      </div>
    </div>
  );
};

export default GoogleAuth;
