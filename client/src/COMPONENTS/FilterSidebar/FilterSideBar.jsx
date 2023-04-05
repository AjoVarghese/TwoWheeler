import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Form } from 'react-router-dom';

// const currencies = [
//   {
//     value: 'USD',
//     label: '$',
//   },
//   {
//     value: 'EUR',
//     label: '€',
//   },
//   {
//     value: 'BTC',
//     label: '฿',
//   },
//   {
//     value: 'JPY',
//     label: '¥',
//   }
// ];

export default function FilterSideBar({loc}) {
 
  const [location,setLocation] = React.useState('')
  const [searchTerm,setSearchTerm] = React.useState('')

  const submitHandler = () => {
    console.log('submit');
    console.log(location);
    console.log(searchTerm);
    if(location !== null || searchTerm !== null){
      console.log('dispatch');
    } else if(location === null && searchTerm === null) {
      window.alert("error")
    }
  }
  return (
    <div>
      <FormControl>
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
          {loc ? loc.map((option) => (
            <option key={option._id} value={option.Location}>
              {option.Location}
            </option>
          )) : "no data"
        }
        </TextField>
        {/* <label htmlFor="">Chose</label>
        <select name="" id=""
         onChange ={(e) => setLocation(e.target.value)}
        >
          <option>Chhose</option>
          {
            loc ? loc.map((x) => {
              <option value={x.Location}>{x.Location}</option>
            }) : ""
          }
        </select> */}
         {/* <Form.Field>
          <label htmlFor="">Choose Location</label>
        <select name="location" id=""
        
         onChange ={(e) => setLocation(e.target.value)}
        >
          <option>Choose</option>
         
         {
          loc ? loc.map((x) => {
            return(
             <option value={x.Location}>{x.Location}</option>
            )
          }) : ""
         }
        </select>
        </Form.Field> */}
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
    </FormControl>
    </div>
  );
}