import { Box, ButtonBase, styled } from '@mui/material';
import React, { useEffect } from 'react'
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar'
import { MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Table from 'react-bootstrap/Table';



import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBikesAction } from '../../../REDUX/Actions/ADMIN_ACTIONS/getAllBikesAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../../COMPONENTS/Loading/Loading'


function Vehicle() {
  


  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const bikes = useSelector((state) => state.admingetAllBikesReducer)
   const {loading,bikesData,bikesDataError} = bikes
   console.log("bikes",bikesData);

  useEffect(() => {
    
    dispatch(getAllBikesAction())
  },[])

  return (

    
    <div>
            {/* <ToastContainer></ToastContainer> */}
{/* <ToastContainer /> */}

      <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Bikes</h1>
        <Button className='pl-auto' >Add Bike</Button>
        <div className="card container md-12">
           
    <Table striped bordered hover centered>
      <thead>
        <tr>
          <th>#</th>
          <th>Bike Name</th>
          <th>Bike Model</th>
          <th>Color</th>
          <th>Price /hr</th>
          <th>Detailed View</th>
        </tr>
      </thead>
      <tbody>
        {
          loading ? <Loading/> :
          bikesData ? bikesData.map((x,i) => {
             return (
              <tr>
              <td>{i+ 1}</td>
              <td>{x.vehicleName}</td>
              <td>{x.vehicleModel}</td>
              <td>{x.Color}</td>
              <td>{x.Price}</td>
              <td><VisibilityIcon/></td>
            </tr>
             )
          }) : ""
        }
        
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>

{/* <DataTable value={products} header={bikesData} footer={bikesData} tableStyle={{ minWidth: '60rem' }}>
    <Column field="Photo" header="Image" body = {(rowData) => <img src = {rowData.Photo}/>} height = '50'></Column>
    
    <Column field="bikeName" header="BikeName" body={bikesData?.Price}></Column>
    <Column field="Color" header="Color"></Column>
    <Column field="Fuel" header="Fuel"></Column>
    <Column field = "Desc" header="Desc" ></Column>
</DataTable> */}

{/* <div className="card container col-md-6">

            <DataTable value={bikesData} header={products.quantity} footer={products.quantity} tableStyle={{ minWidth: '60rem' }}>
                <Column body={bikesData.price} header="Name"></Column>
                <Column header="Image" body={products.quantity}></Column>
                <Column field="price" header="Price" body={products.quantity}></Column>
                <Column field="category" header="Category"></Column>
                <Column field="rating" header="Reviews" body={products.quantity}></Column>
                <Column header="Status" body={products.quantity}></Column>
            </DataTable>
        </div> */}
        </div>
       
      </Box>
      </Box>
    // </div>
  )
}

export default Vehicle