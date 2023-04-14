
import * as React from 'react';
import moment from 'moment'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Figure from 'react-bootstrap/Figure';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { rentedRidesAction } from '../../redux/Actions/USER_ACTIONS/getRentedRides';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(rentedRidesAction())
  },[])

  const rentedRides = useSelector((state) => state.rentedBikesReducer.rentedRidesData)
  console.log(rentedRides ? rentedRides : "");
 
  // const format = 'YYYY-MM-DD HH:mm:ss a'
  let startingTime = moment(rentedRides?.startingTime,'YYYY-MM-DD HH:mm:ss a')
  let endingTime = moment(rentedRides?.endingTime,'YYYY-MM-DD HH:mm:ss a')
  let formattedStartingTime = startingTime.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
  let formattedEndingTime = endingTime.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
  console.log(formattedStartingTime); // Thu Apr 13 2023 14:40:31 GMT+0530 (India Standard Time)
  console.log(formattedEndingTime);
  // let formattedStartingTime = startingTime.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)')
  // console.log('formated',formattedStartingTime);
  // let currentTime = moment()
  // console.log("cuurentTime",currentTime);
  // let isAfterStartingTime = currentTime.isAfter(startingTime)
  // console.log('isAfter',isAfterStartingTime);
  return (
    <>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl.No</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Bike Name</StyledTableCell>
            <StyledTableCell align="center">Bike Model</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Starting Time</StyledTableCell>
            <StyledTableCell align="center">Ending Time</StyledTableCell>
            <StyledTableCell align="center">Total Hours</StyledTableCell>
            <StyledTableCell align="center">Total Amount</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentedRides ? rentedRides.map((row,i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              
              <StyledTableCell align="center">
              <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="llll"
                    src={row.photo[0]}
                  />
                <Figure.Caption>
      
        </Figure.Caption>
        </Figure>
        {/* <img src={rentedRides[i].photo} alt="fedfdfdf" /> */}
              </StyledTableCell>
              <StyledTableCell align="center">{row.bikeName}</StyledTableCell>
              <StyledTableCell align="center">{row.bikeModel}</StyledTableCell>
              <StyledTableCell align="center">{row.location}</StyledTableCell>
              <StyledTableCell align="center">{row.startingTime}</StyledTableCell>
              <StyledTableCell align="center">{row.endingTime}</StyledTableCell>
              <StyledTableCell align="center">{row.totalHours}</StyledTableCell>
              <StyledTableCell align="center">{row.totalAmount}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="contained" color="error">
                  Cancel
              </Button>
              </StyledTableCell>
            </StyledTableRow>
          )) : "no data"
        }
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
        