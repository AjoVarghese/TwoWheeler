
import React, { useEffect, useState } from 'react'
// import { Table } from 'react-bootstrap';
import Figure from 'react-bootstrap/Figure';
import { useDispatch, useSelector } from 'react-redux';
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar'
import { acceptRentRequests, getRentRequests, rejectRentRequets } from '../../../REDUX/Actions/ADMIN_ACTIONS/rentRequestsAction';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, styled } from '@mui/material';
import AlertDialog from '../../../COMPONENTS/AlertDialog/AlertDialog';
import { useRef } from 'react';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('1', 159, 6.0, 24, 4.0),
//   createData('1', 237, 9.0, 37, 4.3),
//   createData('2', 262, 16.0, 24, 6.0),
//   createData('4', 305, 3.7, 67, 4.3),
//   createData('5', 356, 16.0, 49, 3.9),
//   createData('4', 305, 3.7, 67, 4.3),
// ];


function RentRequets() {
  // const buttonRef = useRef()
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const dispatch = useDispatch()

    const [alertDialog,setAlertDialog] = useState(false)
    const [rejectDialog,setRejectDialog] = useState(false)
    const[loading,setLoading] = useState(false)

    const rentData = useSelector((state) => state.rentRequestsReducer.rentRequestsData)
    console.log("rentData",rentData);
    const [selectedBike,SetSelectedBike]=useState('');
    console.log("selected",selectedBike);

    const acceptRequest =() =>{
        console.log('jiii');
        // setLoading(true)
           dispatch(acceptRentRequests(selectedBike))
          //  setLoading(false)    
    }



    const rejectRequest = () => {
      console.log("reject function");
      dispatch(rejectRentRequets(selectedBike))
    }

    useEffect(() => {
      dispatch(getRentRequests())
    },[])
  return (
   <>
            {
              alertDialog ? <AlertDialog action="Accept"  closeDialog = {setAlertDialog} 
              bikeId = {selectedBike} functionToBeDone = {acceptRequest} 
              message='Do you want proceed with the action'/> : ""
            }

            {
              rejectDialog ? <AlertDialog action="reject" closeDialog={setRejectDialog} 
               Id = {selectedBike} functionToBeDone = {rejectRequest}
               message = 'Do you want to reject the request'/> : ''
            }
   
    <div>
        <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Rent Requets</h1>
        { rentData ?
           <div className="card container md-12">
           {
             <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell><h4>Sl.No</h4></TableCell>
           <TableCell align="center"><h4>Vehicle Name</h4></TableCell>
           <TableCell align="center"><h4>Image</h4></TableCell>
           <TableCell align="center"><h4>Vehicle Model</h4></TableCell>
           <TableCell align="center"><h4>Color</h4></TableCell>
           <TableCell align="center"><h4>Price</h4></TableCell>
           <TableCell align="center"><h4>Status</h4></TableCell>
           <TableCell align="center"><h4>Action</h4></TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {/* <button onClick={()=>{
           buttonRef.current.click()
         }}>CLOSE ALERT</button>
            */}
         
         {
           rentData ? rentData.map((data,i) => {
             
             return(
               
               <TableRow
             key={data._id}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             
           >

         
           
             <TableCell component="th" scope="row">
               <h5>{i +1}</h5>
               
             </TableCell>
             <TableCell align="center"><h5>{data.vehicleName}</h5></TableCell>
             <TableCell align="center">
               <Figure>
                 <Figure.Image
                   width={171}
                   height={180}
                   alt="171x180"
                   src={data.Photo[0]}
                 />
               <Figure.Caption>
       {/* Nulla vitae elit libero, a pharetra augue mollis interdum. */}
     </Figure.Caption>
   </Figure>
             </TableCell>
             <TableCell align="center"><h5>{data.Brand}</h5></TableCell>
             <TableCell align="center"><h5>{data.Color}</h5></TableCell>
             <TableCell align="center"><h5>{data.Price}/hr</h5></TableCell>
             <TableCell align="center"><h5>{data.Status}</h5></TableCell>
             <TableCell align="center">
             <Button variant="contained" color="success" 
             onClick={(e) => {
               
               setRejectDialog(false)
               setAlertDialog(true)
               SetSelectedBike(data._id)

             }
              
             }
             >
             Accept
             </Button>    
             <Button variant="contained"  color="error" className='ms-3'
             onClick={(e) => {
              setAlertDialog(false)
              setRejectDialog(true)
              SetSelectedBike(data._id)
             }}
             >
              Reject
             </Button>     
             </TableCell>
           </TableRow>
             )
           }) : ""
         }

       </TableBody>
     </Table>
   </TableContainer>
           }
       

     </div> : "No Pending"
        }
        
      </Box>
      </Box>
    </div>
   </>
  )
}

export default RentRequets