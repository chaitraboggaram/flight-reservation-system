import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { validateSearch } from "../../services/global-services";
import actions from "../../constants/actions";
import FlightListOneWay from "../../components/flight-list-grid/flight-list-one-way";
import CityJSON from "../../mocks/cities.json";
import BookingService from "../../services/PassengerService";

const cities = [...CityJSON];

const useStyles = makeStyles(() => ({
  filterContainer: {
    marginBottom: 25,
  },
}));

const FlightSearch = (props) => {
  const [source, setSource] = useState(null);
  const [dest, setDest] = useState(null);
  const [deptDate, setDeptDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectTrip, setSelectTrip] = useState("one");
  const [searchDone, setSearchDone] = useState(false);
  const [cityError, setCityError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const flightList = useSelector((state) => state.flightSearch.searchList);
  const classes = useStyles();

  const fetchData = () => {
    console.log("inside fetch");
    console.log(source, dest, deptDate);
    BookingService.getFlightByArrivalAndDeparture(
      source?.name,
      dest?.name,
      deptDate,
      returnDate
    ).then((res) => {
      console.log("result", res);
    });
  };

  // On Page Load
  useEffect(() => {
    if (source && dest && deptDate && returnDate) {
      console.log("inside useeffect");
      fetchData();
    }
    // Reset Flight List
    dispatch({
      type: actions.RESET_FLIGHT_LIST,
    });
  }, [source, dest, deptDate, returnDate]);

  /**
   * @function handleSelectTrip
   * @param {object} e
   * @description get selected trip one way or round
   */
  const handleSelectTrip = (e) => {
    setSelectTrip(e.target.value);
  };

  /**
   * @function handleDeparture
   * @param {object} e
   * @description get departure time
   */
  const handleDeparture = (e) => {
    setDeptDate(e.target.value);
  };

  /**
   * @function handleReturn
   * @param {object} e
   * @description get return date
   */
  const handleReturn = (e) => {
    setReturnDate(e.target.value);
  };

  /**
   * @function handleSearchFlight
   * @description Search Flight
   */
  const handleSearchFlight = () => {
    const payload = {};

    payload.source = source?.name;
    payload.destination = dest?.name;
    payload.deptDate = deptDate;
    payload.returnDate = returnDate;
    payload.tripType = selectTrip;

    if (
      payload?.source?.toLowerCase() === payload?.destination?.toLowerCase()
    ) {
      setCityError(true);
      setSearchDone(false);
      return;
    } else {
      setCityError(false);
    }
    // Reset Flight List
    dispatch({
      type: actions.RESET_FLIGHT_LIST,
    });
    // Get flight List
    dispatch({
      type: actions.GET_FLIGHT_LIST,
      payload,
    });

    setSearchDone(true);
  };

  /**
   * @function handleBookNow
   * @param {object} bookingVal
   * @description book now
   */
  const handleBookNow = (bookingVal) => {
    let timer;
    dispatch({
      type: actions.SET_BOOKING_DETAILS,
      payload: bookingVal,
    });

    clearTimeout(timer);

    timer = setTimeout(() => {
      history.push("/flight-booking");
    }, 100);
  };

  // Filter destination options based on selected source
  const filteredDestinations = cities.filter(
    (city) => !source || city.name !== source.name
  );

  // Filter source options based on selected destination
  const filteredSources = cities.filter(
    (city) => !dest || city.name !== dest.name
  );

  // Get the current date in the format "YYYY-MM-DD"
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} className={classes.filterContainer}>
        <RadioGroup row onChange={handleSelectTrip} value={selectTrip}>
          <FormControlLabel
            value="one"
            control={<Radio color="primary" />}
            label="One Way"
          />
          <FormControlLabel
            value="both"
            control={<Radio color="primary" />}
            label="Round Trip"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Autocomplete
          value={source}
          onChange={(event, newValue) => {
            setSource(newValue);
          }}
          getOptionLabel={(option) => option.name}
          options={filteredSources}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Source City" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Autocomplete
          value={dest}
          onChange={(event, newValue) => {
            setDest(newValue);
          }}
          getOptionLabel={(option) => option.name}
          options={filteredDestinations}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination City"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          label="Journey Date"
          type="date"
          value={deptDate}
          onChange={handleDeparture}
          variant="outlined"
          style={{ width: 300 }}
          InputLabelProps={{
            shrink: true,
          }}
          // Set the minimum selectable date to the current date
          inputProps={{
            min: getCurrentDate(),
          }}
        />
      </Grid>
      {selectTrip?.toUpperCase() === "BOTH" && (
        <Grid item xs={12} md={6} className={classes.filterContainer}>
          <TextField
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={handleReturn}
            variant="outlined"
            style={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
            // Set the minimum selectable date to the Journey Date
            inputProps={{
              min: deptDate,
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.filterContainer}
          onClick={handleSearchFlight}
          disabled={validateSearch(
            source,
            dest,
            deptDate,
            returnDate,
            selectTrip
          )}
        >
          {`Search Flight`}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {cityError && (
          <Typography
            variant="body1"
            color="error"
          >{`Source and Destination City can not be the same`}</Typography>
        )}
        {searchDone && (
          <FlightListOneWay flightList={flightList} bookNow={handleBookNow} />
        )}
      </Grid>
    </Grid>
  );
};

FlightSearch.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  flightList: PropTypes.object,
};

export default FlightSearch;
