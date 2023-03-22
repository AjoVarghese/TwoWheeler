import { Box, styled } from '@mui/material';
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { blockUnblockApi } from '../../../API/Admin/ApiCalls';
import Loading from '../../../COMPONENTS/Loading/Loading';
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar'
import { adminUserAction } from '../../../REDUX/Actions/ADMIN_ACTIONS/adminUserActions';


function Users() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
  const dispatch = useDispatch()

  const adminUserdata = useSelector((state) => state.adminUserGetReducer)
  const {loading,adminUserData} = adminUserdata;
  // console.log("USERS",users.id);

 const handleAction = (id) => {
    blockUnblockApi(id).then((data) => {
      if(data){
        dispatch(adminUserAction())
      }
    })
 }


  useEffect(() => {
    dispatch(adminUserAction())
  },[])

  return (
    <div>
      
     <Box sx={{ display : 'flex' }}>
     <Loading/>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Users</h1>
        <div className="card container md-12">
            {/* <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="No" header="NO"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable> */}

{/* <DataTable value={products} sortField="price" sortOrder={-1} tableStyle={{ minWidth: '50rem' }}>
                <Column field="No" header="Code" sortable style={{ width: '20%' }}></Column>
                <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                <Column field="price" header="Price"  sortable style={{ width: '20%' }}></Column>
                <Column field="category" header="Category" sortable style={{ width: '20%' }}></Column>
                <Column field="quantity" header="Quantity" sortable style={{ width: '20%' }}></Column>
            </DataTable> */}

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
            loading? <Loading/> :adminUserData? adminUserData.map((m,index )=>{
              console.log(m);
              return(
                <>
                <tr>
                  <td>{index + 1}</td>
                  <td >{m.Name}</td>
                  <td>{m.Email}</td>
                  <td>{m.Mobile}</td>
                  <td>{m.Status?'Access Allowed':'Acces Suspended'}</td>
                  <td><button onClick={()=>{
                    handleAction(m._id)
                  }}>{m.Status ? 'Block' : "Unblock"}</button></td>
                </tr>
                </>
              )
            }) :''
          }
          
       
          
        
      </tbody>
    </Table>
        </div>
      </Box>
      </Box>
    </div>
  )
}

export default Users