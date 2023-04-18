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
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar'
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../../../redux/Actions/ADMIN_ACTIONS/locationActions';
import LocationModal from '../../../components/LocationModal/LocationModal';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import { deleteLocation } from '../../../redux/Actions/ADMIN_ACTIONS/locationActions';
import BasicModal from '../../../components/BasicModal/BasicModal';
import EditLocationModal from '../../../components/Modal/EditLocationModal';


function Locations() {

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const dispatch = useDispatch()

const [modal,setModal] = useState(false)
const [editModal,setEditModal] = useState(false)
const [deleteDialog,setDeletedialog] = useState(false)
const [selectedLoc,setSelectedLocation] = useState(false)

const [open,setOpen] = useState(false)


let close

const location = useSelector((state) => state.getLocationReducer.location)
console.log("Location",location);

const doDelete = () => {
  console.log("delete Location");
  dispatch(deleteLocation(selectedLoc))
  setDeletedialog(false)
}


const handleEdit = (id,location) => {
  console.log("edit",id,location);
  setEditModal(true)
  setSelectedLocation(id)
}


useEffect(() => {
  dispatch(getLocation())
},[modal,deleteDialog,editModal])



  return (
    <div>
     
      <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Locations</h1>
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
        deleteDialog ? <AlertDialog closeDialog={setModal}
         locationId = {selectedLoc}
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
          </TableRow>
        </TableHead>
        <TableBody>
         {
          location && location.length > 0 ? location.map((data,i) => {
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
              onClick={() => handleEdit(data._id,data.Location)}
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
             
            </TableRow>
            )
         }) : <h6>No data</h6>
         } 
        </TableBody>
      </Table>
    </TableContainer> 
    </div>
      </Box>
      <EditLocationModal locationId={selectedLoc} open={editModal} onClose={()=>setEditModal(false)}/>
      </Box>
    </div>
  )
}

export default Locations