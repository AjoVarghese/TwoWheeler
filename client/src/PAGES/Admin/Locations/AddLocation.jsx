
import { Box, styled } from '@mui/material';
import React from 'react'
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar';

function AddLocation() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
  return (
    <div>
       <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Add Locations</h1>
      </Box>
      </Box>
    </div>
  )
}

export default AddLocation