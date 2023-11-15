import React from "react";

import { AppBar, Tabs, Tab, Typography, Toolbar, Button } from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom';
import "./header.css";
import { useGoogleLogin } from '@react-oauth/google';

import {GOOGLE_USER_INFO_URL} from "../../constants";
import GoogleServiceSingleton from "../../services/googleServiceSingleton";


const Header = ({ tabs, onShowTab }) => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            GoogleServiceSingleton.getUserInfo(tokenResponse.access_token).then(userInfo => {
                console.log("Name: ", userInfo.name);
                console.log("Email: ", userInfo.email);
                // userInfo.picture has profile pic link
            });
        },
    });

    const toolbarStyle = {
        backgroundColor: 'black', // Set your desired color here
    };
    const location = useLocation();
    const currentTab = tabs.findIndex((tab) => tab.path === location.pathname);
    const handleChange = (event, newValue) => {
        // We can navigate to the selected tab using your routing mechanism
        // For example, using react-router-dom:
        // history.push(tabs[newValue].path);
    };

    return (
    <AppBar position="static">
      <Toolbar style={toolbarStyle}>
          <img src={process.env.PUBLIC_URL + '/BonVoyage.jpeg'} alt="Logo" style={{ maxHeight: '50px', marginRight: '10px' }} />
          <Typography  variant="h6" style={{ marginRight: '50px' }}>{`BonVoyage`}</Typography>
          <Tabs
              value={currentTab}
              onChange={handleChange}
              style={{ flex: 1, justifyContent: 'center' }}
          >
              {tabs.map((tab, index) => {
                  // console.log(`Tab index: ${index}, label: ${tab.label}, path: ${tab.path}, show: ${tab.show}`);
                  if (tab.show !== false) {
                      return (
                          <Tab
                              key={index}
                              label={tab.label}
                              component={Link}
                              to={tab.path}
                          />
                      );
                  }
                  return null;
              })}
          </Tabs>
          <Button color="inherit" onClick={() => login()}>Login/Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
