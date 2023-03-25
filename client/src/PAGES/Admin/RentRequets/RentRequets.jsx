import { Box, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar'
import { getRentRequests } from '../../../REDUX/Actions/ADMIN_ACTIONS/rentRequestsAction';

function RentRequets() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const dispatch = useDispatch()

    const rentData = useSelector((state) => state.rentRequestsReducer.rentRequestsData)
    console.log("rentData",rentData);

    useEffect(() => {
      dispatch(getRentRequests())
    },[])
  return (
    <div>
        <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Rent Requets</h1>
        <div className="card container md-12">
            

            <Table striped >
                  <thead >
                    <tr style={{backgroundColor : "grey"}}>
                      <th>Sl.No</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        rentData ? rentData.map((data,i) => {
                            return (
                                <tr>
                                {/* <td>{i + 1}</td> */}
                                <td>{data.vehhicleName}</td>
                                <td >qwqw</td>
                                <td>m.Emai</td>
                                <td>dd</td>
                                <td>yuy</td>
                                <td>
                                  
                                   <button button >sss</button>
                                  
                                  </td>
                              </tr>
                            )
                        }) : ''
                    }
                           
                  </tbody>
                </Table>
                    </div>
      </Box>
      </Box>
    </div>
  )
}

export default RentRequets