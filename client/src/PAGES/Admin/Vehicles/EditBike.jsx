import { Box, CircularProgress, InputLabel, NativeSelect, styled, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar';
import { Figure } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getLocation } from '../../../redux/Actions/ADMIN_ACTIONS/locationActions';
import { editBikeAction } from '../../../redux/Actions/ADMIN_ACTIONS/getAllBikesAction';
import { editBikeApi } from '../../../api/Admin/ApiCalls';
import { toast, Toaster } from 'react-hot-toast';

function EditBike() {
  const [images1,setImages1] = useState([])
  const [images,setImages] = useState([])
  const [bikeName,setBikeName] = useState('')
    const [bikeModel , setBikeModel] = useState('')
    const [engineNo , setEngineNo] = useState('')
    const [brand,setBrand] = useState('')
    const [fuel,setFuel] = useState('')
    const [desc,setDesc] = useState('')
    const [price,setPrice] = useState('')
    const [color,setColor] = useState('')
    const [selectedLocation,setSelectedLocation] = useState('')
    const [loading,setLoading]=useState(false);
    const [sucess,setSuccess]=useState(false);

    const location = useLocation()
    console.log("Vlue",location.state.data);
    
    
    useEffect(() => {
      console.log("imagesss",location.state.data.Photo);
      dispatch(getLocation())
      setImages1([location.state.data.Photo])
      setBikeName(location.state.data.vehicleName)
      setBikeModel(location.state.data.vehicleModel)
      setEngineNo(location.state.data.EngineNo)
      setBrand(location.state.data.Brand)
      setFuel(location.state.data.Fuel)
      setDesc(location.state.data.Description)
      setPrice(location.state.data.Price)
      setColor(location.state.data.Color)
      setSelectedLocation(location.state.data.Location)
    },[])

    const loc = useSelector((state) => state.getLocationReducer.location)
    console.log("LOC",loc);
   
    const { register,
      handleSubmit,
       formState: { errors }
      } = useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate();

    


    console.log("dsdsd",bikeModel);
    console.log('aaa',bikeName);

    const onSubmit = (data) => {
      // setLoading(true)
       console.log("DATA",data);
      //  console.log("IMAGESS",images);

       const formData = new FormData()

       
      images.forEach((m)=>{
        formData.append("images",m)
      })

       formData.append('bikeName',bikeName)
       formData.append('bikeModel',bikeModel)
       formData.append('engineNo',engineNo)
       formData.append("fuel", fuel);
       formData.append("imageUrl",images1)
       formData.append("brand", brand);
       formData.append("desc", desc);
       formData.append("price", price);
       formData.append("color", color);
       formData.append('location',selectedLocation)
      //  formData.append('images',images)
       
       console.log("IMAGESS",images);
       editBikeApi(location.state.data._id,formData).then((data)=> {
        console.log("edited bike data",data.data);
        // setLoading(false)
        // toast.success('Bike edited successfully!')
        // setTimeout(() => {
        //   navigate('/admin/bikes')
        // },2000)
       
       })
    }

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
      <Toaster
       position="top-right"
       reverseOrder={false}
       toastOptions={{duration:2000}}
      />
      <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Edit Details</h1>
        <div className='container mt-4 mb-5' style={{border : '0.2px solid black',
        boxShadow :'1px 1px 2px 2px grey',borderRadius:'5px'
        }}>
        <Form className='container mt-4 mb-5' onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3 " >
        <Form.Group as={Col} controlId="formGridEmail" > 
         {/* <label htmlFor="">Vecle Name</label> */}
          <TextField
            margin="normal"
            fullWidth
            name = 'bikeName'
            id="bikeName"
            defaultValue={location.state.data.vehicleName}
            label="Bike Name"
            autoFocus
            {...register('bikeName',{
              required : true,
              minLength : 2
            })}
            onChange={(e) => setBikeName(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <TextField
            margin="normal"
            fullWidth
            autoFocus
            name = 'bikeModel'
            id="bikeModel"
            defaultValue={location.state.data.vehicleModel}
            label="Bike Model"
            // default={location.state.data._id}
            {...register("bikeModel",
            {
              required : true , minLength : 4
            }
            )}
            onChange={(e) => setBikeModel(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
        

          <TextField
            margin="normal"
            fullWidth
            name = 'engineNo'
            id="engineNo"
            defaultValue={location.state.data.EngineNo}
            autoFocus
            label="Engine No"
            {...register("engineNo",
          {
            required : true , minLength : 5
          }
          )}
            onChange={(e) => setEngineNo(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">

          <TextField
            margin="normal"
            fullWidth
            name = 'brand'
            id="brand"
            defaultValue={location.state.data.Brand}
            autoFocus
            label="Brand"
            {...register("brand",
            {
              required : true , minLength : 4
            }
            )}
            onChange={(e) => setBrand(e.target.brand)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
       
          <TextField
            margin="normal"
            fullWidth
            name = 'color'
            id="color"
            defaultValue={location.state.data.Color}
            autoFocus
            label="Color"
            {...register("color",
          {
            required : true , minLength : 3
          }
          )}
            onChange={(e) =>setColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        
          <TextField
            margin="normal"
            fullWidth
            name = 'fuel'
            id="fuel"
            defaultValue={location.state.data.Fuel}
            autoFocus
            label="Fuel Used"
            {...register("fuel",
            {
              required : true , minLength : 3
            }
            )}
            onChange={(e) => setFuel(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className='mb-3'>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
    Location
  </InputLabel>
  <NativeSelect
    defaultValue={location.state.data.Location}
    inputProps={{
      name: 'age',
      id: 'uncontrolled-native',
    }}
    {...register('location')}
  >
    {/* <option>{location.state.data.Location}</option> */}
    {
      loc ? loc.map((x) => {
        if(x !== location.state.data.Location){
          return(
            <>
             <option>{x.Location}</option>
            </>
            
          )
        }
      }) : ""
    }
    
  </NativeSelect>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
        
          <TextField
            margin="normal"
            fullWidth
            name = 'price'
            id="price"
            defaultValue={location.state.data.Price}
            autoFocus
            label="Price/hr"
            {...register("price",
          {
            required : true , minLength : 2 ,maxLength : 3
          }
          )} 
            onChange={(e) => setPrice(e.target.value)}
            
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        
          <TextField
            margin="normal"
            fullWidth
            name = 'desc'
            id="desc"
            defaultValue={location.state.data.Description}
            autoFocus
            label="Description"
            {...register("desc",
            {
              required : true , minLength : 3
            }
            )}
            onChange={(e) => setDesc(e.target.value)}
           
          />
        </Form.Group>
        {errors.desc && <p style={{color : "red"}}>Required</p>}
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
     <Figure>
      <Figure.Image
        width={150}
        height={160}
        alt="171x180"
        src={location.state.data.Photo[0]}
        
      />
     
    </Figure>
          <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image1'
            id="image1"
            autoFocus
            label='Image1'
            onChange={(e) => {
              console.log(e.target.files);
              setImages([...images,e.target.files[0]])}} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        <Figure>
      <Figure.Image
        width={150}
        height={160}
        alt="171x180"
        src={location.state.data.Photo[1]}
        
      />
     
    </Figure>
          <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image2'
            id="image2"
            autoFocus
            label='Image2'
            onChange={(e) => setImages([...images,e.target.files[0]])}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3 ">
        <Form.Group as={Col} controlId="formGridEmail">
        <Figure>
      <Figure.Image
        width={150}
        height={160}
        alt="171x180"
        src={location.state.data.Photo[2]}
        
      />
     
    </Figure>
        <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image3'
            id="image3"
            autoFocus
            label='Image3'
            onChange={(e) => setImages([...images,e.target.files[0]])}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        <Figure>
      <Figure.Image
        width={150}
        height={160}
        alt="171x180"
        src={location.state.data.Photo[3]}
        
      />
     
    </Figure>
        <TextField
            margin="normal"
            type='file'
            fullWidth
            name = 'image4'
            id="image4"
            autoFocus
            label='Image4'
            onChange={(e) => setImages([...images,e.target.files[0]])}
          />
        </Form.Group>
      </Row>

      {/* {
        loading ? <Button  variant="warning" type="submit" style={{width : "100%"}}><CircularProgress /></Button> : 
        <Button  variant="warning" type="submit" style={{width : "100%"}}>
        Save Changes
      </Button>
      } */}

      <Button  variant="warning" type="submit" style={{width : "100%"}}>
        Save Changes
      </Button>
    </Form>
    </div>
      </Box> 
      </Box> 
    </div>
  )
}

export default EditBike