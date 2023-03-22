import { Box, styled } from '@mui/material';
import React, { useState } from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import AdminSideBar from '../../../COMPONENTS/NAVBAR/AdminSideBar';
import { MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { adminAddBikeApi } from '../../../API/Admin/ApiCalls';
import { adminAddBikeAction } from '../../../REDUX/Actions/ADMIN_ACTIONS/adminAddBike';

function AddVehicle() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const [bikeName , setBikeName] = useState('')
const [bikeModel , setBikeModel] = useState('')
const [engineNo , setEngineNo] = useState('')
const [brand,setBrand] = useState('')
const [fuel,setFuel] = useState('')
const [desc,setDesc] = useState('')
const [price,setPrice] = useState('')
const [color,setColor] = useState('')
const [images,setImages] = useState([])
const [loading,setLoading]=useState(false);

const dispatch = useDispatch()

const submit = async() => {
  setLoading(true)
  const formdata = new FormData();
    

    images.forEach((m)=>{
      formdata.append("images",m)
    })

    formdata.append("bikeName", bikeName);
    formdata.append("bikeModel", bikeModel);
    formdata.append("engineNo", engineNo);
    formdata.append("fuel", fuel);
    formdata.append("brand", brand);
    formdata.append("desc", desc);
    formdata.append("price", price);
    formdata.append("color", color);

 adminAddBikeApi(formdata).then((data) => {
  console.log("ADMIN BIKE API DATA",data.data);
  dispatch(adminAddBikeAction(data.data))
  setLoading(false)
 })
 .catch((err) => {
  console.log("SOME ERROR IN ADD BIKE",err);
 })
}

  return (
    <div>
        <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        
        <Card className='container col-md-6' style={{ boxShadow : "2px 2px 2px 1px"}}>
        
        <div className="card flex flex-column md:flex-row gap-3">
            {/* <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span> */}
                <h1 className='ms-4 mt-2'>Add Bike</h1>
                
                <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
          <label htmlFor="">Bike Name</label>
          <MDBInput id='form3Example1' onChange={(e) => setBikeName(e.target.value)} />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Bike Model</label>
          <MDBInput id='form3Example2' onChange={(e) => setBikeModel(e.target.value)} />
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Engine No</label>
          <MDBInput id='form3Example1' onChange={(e) => setEngineNo(e.target.value)} />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Brand</label>
          <MDBInput id='form3Example2' onChange={(e) => setBrand(e.target.value)} />
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Fuel Used</label>
          <MDBInput id='form3Example1'  onChange={(e) => setFuel(e.target.value)}/>
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Description</label>
          <MDBInput id='form3Example2'  onChange={(e) => setDesc(e.target.value)}/>
        </MDBCol>
      </MDBRow>
      
      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Color</label>
          <MDBInput id='form3Example1'  onChange={(e) => setColor(e.target.value)}/>
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Price</label>
          <MDBInput id='form3Example2' type='number' onChange={(e) => setPrice(e.target.value)}/>
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Image1</label>
          <MDBInput id='form3Example1' type='file' onChange={(e) => setImages([...images,e.target.files[0]])} />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Image2</label>
          <MDBInput id='form3Example2'  type='file'  onChange={(e) => setImages([...images,e.target.files[0]])} />
        </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <label htmlFor="">Image3</label>
          <MDBInput id='form3Example1' type='file'  onChange={(e) => setImages([...images,e.target.files[0]])} />
        </MDBCol>
        <MDBCol>
        <label htmlFor="">Image4</label>
          <MDBInput id='form3Example2'  type='file'  onChange={(e) => setImages([...images,e.target.files[0]])} />
        </MDBCol>
      </MDBRow>

      <Button className='mb-4 container col-md-4 sm-3' style ={{backgroundColor : '#fed250'}} onClick = {submit}>ADD</Button>
            </div>
            {/* </div> */}
</Card>
      </Box>
      </Box>
    </div>
  )
}

export default AddVehicle