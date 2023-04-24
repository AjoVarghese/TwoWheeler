
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
import { useState } from 'react';
import CancelRide from '../Modal/CancelRide';
import EndRideModal from '../Modal/EndRideModal';
import { useDispatch } from 'react-redux';
import { payFineAction } from '../../redux/Actions/USER_ACTIONS/payFineAction';


export default function CustomizedTables({data}) {
 
  const [modal,setModal] = React.useState(false)
  const [endRide,setEndRide] = useState(false)
  const [selectedBike,setSelectedBike] = useState('')
  const [selectedBooking,setSelectedBooking] = useState('')
  const [startTime,setStartTime] = useState('')
  const [endTime,setEndTime] = useState('')
  const [price,setPrice] = useState('')

  const dispatch = useDispatch()

  let userId = JSON.parse(localStorage.getItem("userInfo")).id

 
  const handlePayFine = (bikeId,bookingId,startTime,endTime,price,photo,bikeName) => {
    const fineDetails = {
      bikeId : bikeId,
      bookingId : bookingId,
      startTime : startTime,
      endTime : endTime,
      price : price,
      photo : photo,
      bikeName : bikeName
    }
    dispatch(payFineAction(fineDetails))
  }
  return (
    <>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl.No</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Bike Model</TableCell>
            <TableCell align="center">Starting Time</TableCell>
            <TableCell align="center">Ending Time</TableCell>
            <TableCell align="center">Total Hours</TableCell>
            <TableCell align="center">Total Amount</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0  ? data.map((row,i) => (
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
              <TableCell align="center">{row.startingTime}</TableCell>
              <TableCell align="center">{row.endingTime}</TableCell>
              <TableCell align="center">{row.totalHours}</TableCell>
              <TableCell align="center">Rs.{row.totalAmount}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
                {
                  row.status === 'Booked' ?
                  <Button variant="contained" 
                  color="error"
                   onClick={(e) => {
                    setModal(true)
                    setSelectedBike(row.bikeId)
                    setSelectedBooking(row._id)
                    setStartTime(row.startingTime)
                    setEndTime(row.endingTime)
                    setPrice(row.totalAmount)
                   }}
                  >
                  Cancel
                </Button> 
                :
                row.status === 'onRide' ?
                 
                 <Button variant="contained" 
                 color="error"
                 onClick={(e) => {
                  setEndRide(true)
                  setSelectedBike(row.bikeId)
                  setSelectedBooking(row._id)
                  setStartTime(row.startingTime)
                  setEndTime(row.endingTime)
                 }}
                 >
                 End Ride
               </Button> : 
                row.status === 'Time Exceeded' ?
                <Button variant="contained" 
                 color="error"
                 onClick={(e) => {
                  // setEndRide(true)
                  // setSelectedBike(row.bikeId)
                  // setSelectedBooking(row._id)
                  // setStartTime(row.startingTime)
                  // setEndTime(row.endingTime)
                  handlePayFine(row.bikeId,row._id,
                    row.startingTime,row.endingTime,
                    row.totalAmount,row.photo,
                    row.bikeName
                    )
                 }}
                 >
                 Pay Fine
               </Button> : "ddddd"
               
                }
              
              </TableCell>
            </TableRow>
          )) : 
          (
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
    {
      modal ? <CancelRide bikeId={selectedBike} 
       bookingId={selectedBooking} open={modal} 
       startTime = {startTime} endTime = {endTime}
       userId = {userId} price={price}
       onClose={() => setModal(false)}/> : ""
    }

    {
      endRide ? <EndRideModal bikeId={selectedBike}
      bookingId={selectedBooking} startTime={startTime}
      endTime={endTime} open={endRide} userId={userId}
      onClose={() => setEndRide(false)}
      /> : ""
    }
    </>
  );
}
        