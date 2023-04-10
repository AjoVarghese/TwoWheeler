import { Table } from '@mantine/core';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react'
import Figure from 'react-bootstrap/Figure';
import { useDispatch, useSelector } from 'react-redux';
import { getRentedBikesAction } from '../../redux/Actions/USER_ACTIONS/getRentedBikes';

function RejectedRequests() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRentedBikesAction())
    },[dispatch])

    const rentedBikes = useSelector((state) => state.getRentedBikesReducer.rentedBikesData)
    console.log("Rented Bikes",rentedBikes);
  return (
    <div>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl No</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
         
          {
            rentedBikes ? rentedBikes.map((x,i) => {let status ;
              if(x.Status === 'Rejected'){
                status=true
              }

              return(
                <>
                {status? <TableRow
               key={i+1}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                 <TableCell component="th" scope="row" align="center">
                 {i+1}
               </TableCell>
               <TableCell component="th" scope="row" align="center">
                 {x.vehicleName}
               </TableCell>
               <TableCell align="center">
               <Figure>
                   <Figure.Image
                     width={171}
                     height={180}
                     alt="171x180"
                     src={x.Photo[0]}
                   />
                 <Figure.Caption>
        
         </Figure.Caption>
         </Figure>
               </TableCell>
               <TableCell align="center">{x.Brand}</TableCell>
               <TableCell align="center">{x.Status}</TableCell>
              
             </TableRow>:''}
                </>
              )
            }) : "No Data Available..."
          }
            
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default RejectedRequests