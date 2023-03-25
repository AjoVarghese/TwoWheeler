import React, { useEffect } from 'react'
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardLink,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
// import './Bikes.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../COMPONENTS/Loading/Loading'
import { getBikesAction } from '../../../REDUX/Actions/USER_ACTIONS/getBikesAction';
import { width } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function Bikes() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

  const bikes = useSelector((state) => state.bikesReducer)
  const {loading , bikesData , bikesDataError} = bikes
  console.log("BIKES",bikesData);

  useEffect(() => {
     dispatch(getBikesAction())
  },[])
  return (
       <>
         <Navbar/>
         <section className='bikes'>
           <div className='cards'>
    <MDBContainer  className="my-5">
      <MDBRow className="col-xs-6">
        {
          loading ? <Loading/> : 
            bikesData ? bikesData.map((x,i) => {
              return (
                <MDBCol md="3 mt-3">
                <MDBCard className="text-black">
                  <MDBIcon fab icon="apple" size="lg" className="px-3 pt-3 pb-2" />
                  <MDBCardImage
                    src={x.Photo[0]}
                    position="top"
                    alt="Apple Computer"
                    onClick={(e) => navigate('/bike-detailed-view')}
                  />
                  <MDBCardBody style={{backgroundColor : "#DCDCDC"}}>
                    <div className="text-center">
                      <MDBCardTitle>{x.vehicleName}</MDBCardTitle>
                      <p className="text-muted mb-4">{x.Description}</p>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between">
                        <span>Model</span>
                        <span>{x.vehicleModel}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Brand</span>
                        <span>{x.Brand}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Color</span>
                        <span>{x.Color}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between total font-weight-bold mt-4">
                      <span>Rent Amount(per hr)</span>
                      <span>Rs.{x.Price}</span>
                    </div>
                    <div className='mt-3'>
                    <button type="button" style={{width : "100%",backgroundColor: '#fed250',borderRadius : '6px',height : '3rem',border : 'none'}}>Book Now</button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>       
              )
            }) : ''
        }
      </MDBRow>
    </MDBContainer>
                
           </div>

         </section>
       </>   
  
  )
}

export default Bikes