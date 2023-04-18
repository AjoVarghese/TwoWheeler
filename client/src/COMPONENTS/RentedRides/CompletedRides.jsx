import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Figure } from 'react-bootstrap';
import { Button } from '@mui/material';

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

function CompletedRides({data}) {
  return (
    <div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Sl.No</TableCell>
          <TableCell align="center">Image</TableCell>
          <TableCell align="center">Bike Name</TableCell>
          <TableCell align="center">Bike Model</TableCell>
          {/* <TableCell align="center">Rented User</TableCell> */}
          <TableCell align="center">Starting Time</TableCell>
          <TableCell align="center">Ending Time</TableCell>
          <TableCell align="center">Total Hours</TableCell>
          <TableCell align="center">Total Amount</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data && data.length > 0 ?data.map((row,i) => {
            let Status
            if(row.status === 'Completed'){
              Status = true
            }
            return (
              <>
                {
                  Status ? 
                  <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {i + 1}
            </TableCell>
            <TableCell align="center">
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
            </TableCell>
            <TableCell align="center">{row.bikeName}</TableCell>
            <TableCell align="center">{row.bikeModel}</TableCell>
            {/* <TableCell align="center">{row.userName}</TableCell> */}
            <TableCell align="center">{row.startingTime}</TableCell>
            <TableCell align="center">{row.endingTime}</TableCell>
            <TableCell align="center">{row.totalHours}</TableCell>
            <TableCell align="center">Rs.{row.totalAmount}</TableCell>
            <TableCell align="center">{row.status}</TableCell>
            <TableCell align="center">
              {
                row.status === 'Booked' ?
                <Button variant="contained" color="error">
                Cancel
              </Button>  
               : row.status !== 'Completed' ?
               <Button variant="contained" color="error">
               End Ride
             </Button>  : ""
              } 
            
            </TableCell>
          </TableRow> : ""
                }
              </>
            )
          }) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                No data
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
}

export default CompletedRides