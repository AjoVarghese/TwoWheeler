import { Box, ButtonBase, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar'
import { MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import VisibilityIcon from '@mui/icons-material/Visibility';

// import Table from 'react-bootstrap/Table';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Button,  } from '@mui/material';
import Figure from 'react-bootstrap/Figure';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBikeAction, getAllBikesAction } from '../../../REDUX/Actions/ADMIN_ACTIONS/getAllBikesAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../../COMPONENTS/Loading/Loading'
import { bikeSingleViewApi } from '../../../API/Admin/ApiCalls';
import { bikeSingleViewAction } from '../../../REDUX/Actions/ADMIN_ACTIONS/bikeSingleViewAction';
import AlertDialog from '../../../COMPONENTS/AlertDialog/AlertDialog';


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


   const [deleteDialog,setDeleteDialog] = useState(false)
   const [selectedBike,setSelectedBike] = useState()
   console.log("store bike seleced",selectedBike);

   const bikes = useSelector((state) => state.admingetAllBikesReducer)
   const {loading,bikesData,bikesDataError} = bikes
   console.log("bikes",bikesData);

  //  const handleClick = (id) => {
  //     bikeSingleViewApi(id).then((data) => {
  //       console.log("SINGLE BIKE VIEW",data.data);
  //       dispatch(bikeSingleViewAction(data.data))
  //       navigate('/admin/bike-detailed-view')
  //     })
  //  }

   const deleteBike = () =>{
      console.log('dekete bike');
      dispatch(deleteBikeAction(selectedBike))
   }

  useEffect(() => {
    
    dispatch(getAllBikesAction())
  },[])

  return (

    <>
    {
          deleteDialog ? <AlertDialog message='Do you want to delete the bike from the store'
           bikeId={selectedBike} 
           functionToBeDone={deleteBike} 
           closeDialog={setDeleteDialog}/> : ""
        }
    <div>
            {/* <ToastContainer></ToastContainer> */}
{/* <ToastContainer /> */}

      <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Bikes</h1>
        {/* <Button className='pl-auto' >Add Bike</Button> */}
        <div className="card container md-12">
           
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Sl.No</h4></TableCell>
            <TableCell align="center"><h4>Vehicle Name</h4></TableCell>
            <TableCell align="center"><h4>Image</h4></TableCell>
            <TableCell align="center"><h4>Brand</h4></TableCell>
            <TableCell align="center"><h4>Vehicle Model</h4></TableCell>
            <TableCell align="center"><h4>Color</h4></TableCell>
            <TableCell align="center"><h4>Price</h4></TableCell>
           
            <TableCell align="center"><h4>Action</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          
          {
            bikesData ? bikesData.map((data,i) => {
              
              return(
                
                <TableRow
              // key={data._id}
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
              <TableCell align="center"><h5>{data.vehicleModel}</h5></TableCell>
              <TableCell align="center"><h5>{data.Color}</h5></TableCell>
              <TableCell align="center"><h5>{data.Price} /hr</h5></TableCell>
              <TableCell align="center">
              <Button variant="contained" color="info" 
              onClick={(e) => {
                navigate('/admin/edit-bike',{state : {data}})
              }

              }
              >
              Edit
              </Button>    
              <Button variant="contained"  color="error" className='ms-3'
              onClick={(e) => {
                setDeleteDialog(true)
                setSelectedBike(data._id)
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
     </div>
    </>
  )
}

export default Vehicle