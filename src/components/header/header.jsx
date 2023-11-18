import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, Typography, Toolbar, Button, Menu, MenuItem } from "@material-ui/core";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./header.css";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleServiceSingleton from "../../services/google-service-singleton";

const Header = ({ tabs, onShowTab }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoggedIn(true);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GoogleServiceSingleton.getUserInfo(tokenResponse.access_token).then(
        (userInfo) => {
          setUserInfo(userInfo);
          setIsLoggedIn(true);

          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          sessionStorage.setItem("FirstName", userInfo?.given_name || "");
          sessionStorage.setItem("LastName", userInfo?.family_name || "");
          sessionStorage.setItem("EmailAddress", userInfo?.email || "");
        }
      );
    },
  });

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    history.push("/");
  };

  const handleManage = () => {
    history.push("/manage");
  };

  const handleBook = () => {
    history.push("/");
  };

  const handleHelp = () => {
    history.push("/help");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toolbarStyle = {
    backgroundColor: "black",
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
        <img
          src={process.env.PUBLIC_URL + "/BonVoyage.jpeg"}
          alt="Logo"
          style={{ maxHeight: "50px", marginRight: "10px" }}
        />
        <Typography variant="h6" style={{ marginRight: "50px" }}>
          {`BonVoyage`}
        </Typography>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          style={{ flex: 1, justifyContent: "center" }}
        >
          {tabs.map((tab, index) => {
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
        {isLoggedIn ? (
          <div>
            <Button
              style={{ backgroundColor: "black", color: "white", border: "1px solid white" }}
              onClick={handleMenuOpen}
            >
              {`${userInfo?.given_name || sessionStorage.getItem("FirstName") || "Guest"}`}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              PaperProps={{
                style: {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              <MenuItem
                onClick={handleBook}
                style={{ color: "white" }}
              >
                Book Flights
              </MenuItem>
              <MenuItem
                onClick={handleManage}
                style={{ color: "white" }}
              >
                Manage Bookings
              </MenuItem>
              <MenuItem
                onClick={handleHelp}
                style={{ color: "white" }}
              >
                Help
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                style={{ color: "white" }}
              >
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            style={{ backgroundColor: "black", color: "white" }}
            onClick={() => login()}
          >
            Login/Sign Up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
