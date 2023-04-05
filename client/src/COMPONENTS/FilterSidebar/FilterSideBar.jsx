import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl } from '@mui/material';
import { useState } from 'react';


export default function FilterSideBar({loc}) {
 
  const [location,setLocation] = useState('')
  const [searchTerm,setSearchTerm] = useState('')

  const submitHandler = () => {
    console.log('submit');
    console.log(location);
    console.log(searchTerm);
    if(location !== null || searchTerm !== null){
      console.log('dispatch');
    } else if(location === '' && searchTerm === '') {
      window.alert("error")
    }
  }
  return (
    <div>
       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <FormControl>
      <h5 style={{textAlign:'start'}}> Search By Brand</h5>
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
          {loc ? loc.map((option) => {
            return (
              <option key={option._id} value={option.Location}>
              {option.Location}
            </option>
            )
          }) : "no data"
        }
        </TextField>
      </div>
      </FormControl>
    </Box>

    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
      <h5 style={{textAlign:'start'}}> Search By Brand</h5>
      <div>
      <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      </FormControl>
      <Button variant="contained"
      onClick={submitHandler}
      >Apply Filter</Button>
    </Box>
    </div>
  );
}