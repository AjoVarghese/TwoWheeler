import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormControl } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bikeFilterAction } from "../../redux/Actions/USER_ACTIONS/bikeFilterAction";


export default function FilterSideBar({ loc, propState,page }) {
  console.log(loc, propState);
  const [location, setLocation] = useState(null);
  const [brand, setBrand] = useState(null); 
  const [error,setError] = useState(false) 
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    propState(location);
   
      if (location !== null || brand !== null) {
        setError(false)
        dispatch(bikeFilterAction(location,brand,page))
      } else if (location === null && brand === null) {
        setError(true)
      }
    
   
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl>
          <h5 style={{ textAlign: "start" }}> Search By Location</h5>
          <div>
            <TextField
              id="standard-select-currency-native"
              select
              label=""
              defaultValue="locaion"
              SelectProps={{
                native: true,
              }}
              helperText="Please select a location"
              variant="standard"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Choose</option>
              {loc
                ? loc.map((option) => {
                    return (
                      <option key={option._id} value={option.Location}>
                        {option.Location}
                      </option>
                    );
                  })
                : "no data"}
            </TextField>
          </div>
        </FormControl>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl>
          <h5 style={{ textAlign: "start" }}> Search By Brand</h5>
          <div>
            <TextField
              id="standard-search"
              name="brand"
              label="Search field"
              type="search"
              variant="standard"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          {
            error ? <p style={{color : "red"}}>No inputs to filter</p> : ""
          }
          
        </FormControl>
        <Button variant="contained" onClick={submitHandler}>
          Apply Filter
        </Button>
      </Box>
    </div>
  );
}
