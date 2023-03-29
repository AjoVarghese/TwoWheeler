import { Box, Button, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar'
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../../../REDUX/Actions/ADMIN_ACTIONS/locationActions';
import LocationModal from '../../../COMPONENTS/LocationModal/LocationModal';
import AlertDialog from '../../../COMPONENTS/AlertDialog/AlertDialog';
import { deleteLocation } from '../../../REDUX/Actions/ADMIN_ACTIONS/locationActions';


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



function Locations() {

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const dispatch = useDispatch()

const [modal,setModal] = useState(false)
const [editModal,setEditModal] = useState(false)
const [deleteDialog,setDeletedialog] = useState(false)
const [selectedLoc,setSelectedLocation] = useState(false)


let close

const location = useSelector((state) => state.getLocationReducer.location)
console.log("Location",location);

const doDelete = () => {
  console.log("delete Location");
  dispatch(deleteLocation(selectedLoc))
  setDeletedialog(false)
}


useEffect(() => {
  dispatch(getLocation())
},[modal,deleteDialog])



  return (
    <div>
     
      <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Locations</h1>
       
        {/* <div style={{border:'1px solid red'}}> */}
       <div className='d-flex justify-content-start ms-5 mt-3'>
       <Button variant="outlined" color="info"
        onClick={(e) => {
          setEditModal(false)
          setModal(true)
        }}
       >
             Add Location
              </Button>{''}
       </div>

       {
        modal ? <LocationModal closeModal = {setModal}
         message='Add a new location' 
         action="add" Close={close}/> : ""
       }

       {
        editModal ? <LocationModal closeModal = {setModal} 
        message='Edit' action="Edit" /> : ""
       }


       {
        deleteDialog ? <AlertDialog closeDialog={setModal}
         locationId = {setSelectedLocation}
         functionToBeDone={doDelete}
         message='Are You sure? Do U want to delete this location?'
         /> : ""
       }
              <div className='d-flex justify-content-center'>
        <TableContainer  component={Paper} sx={{maxWidth:450}} className='d-flex justify-contents-center ms-5 mt-1' style={{border:'1px solid black',boxShadow:'2px 2px 2px 2px'}}>
      <Table sx={{ maxWidth: 350 }} aria-label="simple table">
        
        <TableHead>
          <TableRow>
            <TableCell><h4>Sl.No</h4></TableCell>
            <TableCell align="right"><h4>Location</h4></TableCell>
            <TableCell align="right"><h4>Edit</h4></TableCell>
            <TableCell align="right"><h4>Delete</h4></TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
         {
          location ? location.map((data,i) => {
            return(
              <TableRow
              key={data.Location}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="center">
                {data.Location}
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" color="info" 
              onClick={(e) => {
                setModal(false)
                setDeletedialog(false)
                setEditModal(true)
                setSelectedLocation(data._id)
                
              }}
              >
             Edit
              </Button>
             
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" color="error"
              onClick={(e) => {
                setEditModal(false)
                setModal(false)
                setDeletedialog(true)
                setSelectedLocation(data._id)
                
              }}
              >
             Delete
              </Button>
             
              </TableCell>
             
              {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            )
         }) : ""
         } 
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    {/* </div> */}
      </Box>
      </Box>
    </div>
  )
}

export default Locations