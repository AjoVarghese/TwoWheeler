import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { salesReportAction } from '../../../redux/Actions/ADMIN_ACTIONS/salesReportAction'
import { Box, styled } from '@mui/material'
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar'
import DataTable from '../../../test/DataTable'

function SalesReport() {

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(salesReportAction())
    },[])

    const salesData = useSelector((state) => state.salesReportReducer.salesReportData)
    console.log('saleSData',salesData);

    const labelStyles = {
      fontWeight: 'bold',
      fontSize: '16px',
    }
  
    const cellStyles = {
      textAlign: 'center',
    }
  return (
    <div>
      <Box sx={{ display : 'flex' }}>
        <AdminSideBar/>
        <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Sales Report</h1>
        <Box className='container'>
          <DataTable 
          salesData = {salesData}
          labelStyles={labelStyles}
            cellStyles={cellStyles}
          />
        </Box>
        </Box>
      </Box>
    </div>
  )
}

export default SalesReport