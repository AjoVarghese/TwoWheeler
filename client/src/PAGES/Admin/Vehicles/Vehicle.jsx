import { Box, ButtonBase, styled } from '@mui/material';
import React from 'react'
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar'

import Table from 'react-bootstrap/Table';

// import { Button } from 'primereact/button';
import Loading from '../../../COMPONENTS/NAVBAR/Loading/Loading';
// import { styled } from '@mui/material/styles';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'react-bootstrap';


function Vehicle() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

   let products = [
    {
     No : 1,
     name : "Ajo",
     category : "bike",
     quantity : 2
    },
    {
      No : 1,
      name : "Ajo",
      category : "bike",
      quantity : 2
     }
   ]

  return (
    <div>
      <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Bikes</h1>
        <Button className='pl-auto'>Add Bike</Button>
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
<Loading/>
<Table striped >
      <thead >
        <tr style={{backgroundColor : "grey"}}>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo yuyuyuyyy</td>
          </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
        </div>
       
      </Box>
      </Box>
    </div>
  )
}

export default Vehicle