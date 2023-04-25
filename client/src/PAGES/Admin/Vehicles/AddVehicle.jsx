import { Alert, Box, CircularProgress, styled, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import MenuItem from '@mui/material/MenuItem';
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar';
import {  MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit';

// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

import { useDispatch, useSelector } from 'react-redux';
import { adminAddBikeApi } from '../../../api/Admin/ApiCalls';
import { adminAddBikeAction } from '../../../redux/Actions/ADMIN_ACTIONS/adminAddBike';
import { useNavigate } from 'react-router-dom';

import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { getLocation } from '../../../redux/Actions/ADMIN_ACTIONS/locationActions';
import { toast, Toaster } from 'react-hot-toast';


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
const [loc,setLocation] = useState('')
const [color,setColor] = useState('')
const [images,setImages] = useState([])
const [loading,setLoading]=useState(false);
const [sucess,setSuccess]=useState(false);

const dispatch = useDispatch()
const navigate = useNavigate();

const location = useSelector((state) => state.getLocationReducer.location)


useEffect(() => {
  dispatch(getLocation())
},[])

const { register,
   handleSubmit,
    formState: { errors }
   } = useForm();

const onSubmit = (data) => {
  console.log(data);
  setLoading(true)
  const formdata = new FormData();
    

    images.forEach((m)=>{
      formdata.append("images",m)
    })
    console.log('loc',loc);

    formdata.append("bikeName", bikeName);
    formdata.append("bikeModel", bikeModel);
    formdata.append("engineNo", engineNo);
    formdata.append("fuel", fuel);
    formdata.append("brand", brand);
    formdata.append("location",loc)
    formdata.append("desc", desc);
    formdata.append("price", price);
    formdata.append("color", color);
    
 adminAddBikeApi(formdata).then((data) => {
  console.log("ADMIN BIKE API DATA",data.data);
  // <Alerts/>
  dispatch(adminAddBikeAction(data.data))
  setLoading(false)
  // toast.success("added")
  // setSuccess(true)
  toast.success('Bike successfully added to the garage!')
  setTimeout(() => {
    navigate("/admin/bikes",{state:{bikeAdded:true}})
    setSuccess(false)
  }, 3000);
 })
 .catch((err) => {
  console.log("SOME ERROR IN ADD BIKE",err);
  setLoading(false);
 })
}

  return (
    <div>
        <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        
        <Card className='container col-md-6' style={{ boxShadow : "2px 2px 2px 1px"}}>
     
      <Toaster
       position="top-right"
       reverseOrder={false}
       toastOptions={{duration:4000}}
      />
        <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="card flex flex-column md:flex-row gap-3">
          
                <h1 className='ms-4 mt-2'>Add Bike</h1>
                
                <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        
          <Form.Field>
          <label htmlFor="">Bike Name</label>
          <MDBInput id='form3Example1' 
          {...register("bikeName",
          {
            required : "This is required" , minLength : 2
          }
          )}
          onChange={(e) => setBikeName(e.target.value)} />
         
          </Form.Field>
          {errors.bikeName && <p style={{color : 'red'}}>Please enter the bike name</p>}
        </MDBCol>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Bike Model</label>
          <MDBInput id='form3Example2' 
          {...register("bikeModel",
          {
            required : true , minLength : 4
          }
          )}
          onChange={(e) => setBikeModel(e.target.value)} />
          </Form.Field>
          {errors.bikeModel && <p style={{color : 'red'}}>Please enter the model</p>}
        </MDBCol>
        
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Engine No</label>
          <MDBInput id='form3Example1' 
          {...register("engineNo",
          {
            required : true , minLength : 5
          }
          )}
          onChange={(e) => setEngineNo(e.target.value)} />
          </Form.Field>
          {errors.engineNo && <p style={{color : 'red'}}>Please enter the engine no</p>}
        </MDBCol>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Brand</label>
          <MDBInput id='form3Example2' 
          {...register("brand",
          {
            required : true , minLength : 4
          }
          )}
          onChange={(e) => setBrand(e.target.value)} />
          </Form.Field>
          {errors.brand && <p style={{color : 'red'}}>Please enter the brand</p>}
        </MDBCol>
      </MDBRow>
      
      
        <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <Form.Field>
          <label htmlFor="">Choose Location</label>
        <select name="location" id=""
         {...register("location",
         {
           required : "select one option"
         }
         )}
         onChange ={(e) => setLocation(e.target.value)}
        >
          <option>Choose</option>
         
         {
          location ? location.map((x) => {
            return(
             <option value={x.Location}>{x.Location}</option>
            )
          }) : ""
         }
        </select>
        </Form.Field>
        {errors.location && <p style={{color : 'red'}}>{errors.location.message}</p>}
        </MDBCol>
        </MDBRow>
        

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Fuel Used</label>
          <MDBInput id='form3Example1'  
          {...register("fuel",
          {
            required : true , minLength : 3
          }
          )}
          onChange={(e) => setFuel(e.target.value)}/>
          </Form.Field>
          {errors.fuel && <p style={{color : 'red'}}>Please enter the fuel type</p>}
        </MDBCol>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Description</label>
          <MDBInput id='form3Example2'  
          {...register("desc",
          {
            required : true , minLength : 3
          }
          )}
          onChange={(e) => setDesc(e.target.value)}/>
        
          </Form.Field>
          {errors.desc && <p style={{color : 'red'}}>Please add a description</p>}
          </MDBCol>
      </MDBRow>
      
      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <Form.Field>
       
        <label htmlFor="">Color</label>
          <MDBInput id='form3Example1'  
          {...register("color",
          {
            required : true , minLength : 3
          }
          )}
          onChange={(e) => setColor(e.target.value)}/>
        
          </Form.Field>
          {errors.color && <p style={{color : 'red'}}>Please enter the color</p>}
          </MDBCol>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Price</label>
          <MDBInput id='form3Example2' type='number'
          {...register("price",
          {
            required : true , minLength : 2 ,maxLength : 3
          }
          )} 
          onChange={(e) => setPrice(e.target.value)}/>
        
          </Form.Field>
          {errors.price && <p style={{color : 'red'}}>Please enter a price</p>}
          </MDBCol>
      </MDBRow>

      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <Form.Field>
        
        <label htmlFor="">Image1</label>
          <MDBInput id='form3Example1' type='file' 
          {...register("image1",
          {
            required : true , minLength : 1
          }
          )}
          onChange={(e) => setImages([...images,e.target.files[0]])} />
          </Form.Field>
          {errors.image1 && <p style={{color : 'red'}}>Please choose an image</p>}
        </MDBCol>
        
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Image2</label>
          <MDBInput id='form3Example2'  type='file' 
          {...register("image2",
          {
            required : true , minLength : 1
          })}
           onChange={(e) => setImages([...images,e.target.files[0]])} />
        
          </Form.Field>
          {errors.image2 && <p style={{color : 'red'}}>Please choose an image</p>}
          </MDBCol>
      </MDBRow>
      
      <MDBRow className='pt-2 ms-3 me-3 mb-4'>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Image3</label>
          <MDBInput id='form3Example1' type='file' 
          {...register("image3",
          {
            required : true , minLength : 1
          })}
           onChange={(e) => setImages([...images,e.target.files[0]])} />
        
          </Form.Field>
          {errors.image3 && <p style={{color : 'red'}}>Please choose an image</p>}
          </MDBCol>
        <MDBCol>
        <Form.Field>
        <label htmlFor="">Image4</label>
          <MDBInput id='form3Example2'  type='file'  
          {...register("image4",
          {
            required : true , minLength : 1
          })}
          onChange={(e) => setImages([...images,e.target.files[0]])} />
       
          </Form.Field>
          {errors.image4 && <p style={{color : 'red'}}>Please choose an image</p>}
          </MDBCol>
      </MDBRow>
      {/* <ToastContainer /> */}

   {
    loading?    <Button className='mb-4 container col-md-4 sm-3' style ={{backgroundColor : '#fed250'}} disabled ><CircularProgress /></Button>   : 
 
    <Button type='submit' className='mb-4 container col-md-4 sm-3' style ={{backgroundColor : '#fed250'}} >ADD</Button>
   }
            </div>
            </Form>
            
</Card>
      </Box>
      </Box>
    </div>
  )
}

export default AddVehicle