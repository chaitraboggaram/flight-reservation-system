import React, {lazy, Suspense, useState} from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, CssBaseline, Container, Toolbar } from "@material-ui/core";

import "../../styles.css";

import Header from "../../components/header/header";
import ErrorBoundaries from "../../components/error-boundaries/error-boundaries";
// const Dashboard = lazy(() => import("./dashboard"));
const Confirmation = lazy(() => import("../confirmation/confirmation"));
const FlightSearch = lazy(() => import("../search/flight-search"));
const FlightBooking = lazy(() => import("../booking/flight-booking"));
const Payment = lazy(() => import("../booking/payment"));
const SeatSelection = lazy(() => import("../../components/seat-selection/seat-selection"));
const ManageBooking = lazy(() => import("../../modules/manage/manage"));
const About = lazy(() => import("../../modules/about/about"));
const Help = lazy(() => import("../../modules/help/help"));

const Home = () => {
  const [tabs, setTabs] = useState([
    { label: 'Book', path: '/', show: true },
    { label: 'Manage', path: '/manage', show: true },
    { label: 'About', path: '/about', show: true },
    { label: 'Help', path: '/help', show: true },
    { label: 'Admin', path: '/admin', show: false },

    // Add more tabs as needed
  ]);

  const handleShowTab = (tabIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex] = { ...updatedTabs[tabIndex], show: true };
    setTabs(updatedTabs);
  };

  return (
    <div className="root">
      <CssBaseline />
      <Router>
        <Header tabs={tabs} onShowTab={handleShowTab}/>
        <Toolbar />
        <Container>
          <Grid container styles={{ marginTop: 100 }}>
            <Grid item xs={12} sm={12}>
              <ErrorBoundaries>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route path={`/`} exact={true} component={FlightSearch} />
                    <Route
                      exact={true}
                      path={`/flight-search`}
                      component={FlightSearch}
                    />
                    <Route
                      exact={true}
                      path={`/flight-booking`}
                      component={FlightBooking}
                    />
                    <Route
                      exact={true}
                      path={`/manage`}
                      component={ManageBooking}
                    />
                    <Route
                      exact={true}
                      path={`/about`}
                      component={About}
                    />
                    <Route
                      exact={true}
                      path={`/help`}
                      component={Help}
                    />
                    <Route
                      exact={true}
                      path={`/payment`}
                      component={Payment}
                    />
                    <Route
                      exact={true}
                      path={`/confirmation`}
                      component={Confirmation}
                    />
                    <Route
                        exact={true}
                        path={`/seat-selection`}
                        component={SeatSelection}
                    />
                  </Switch>
                </Suspense>
              </ErrorBoundaries>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>
  );
};

export default Home;
