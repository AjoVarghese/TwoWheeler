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
  MDBCardLink
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import './Bikes.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../COMPONENTS/Loading/Loading'
import { getBikesAction } from '../../../REDUX/Actions/USER_ACTIONS/getBikesAction';
import { width } from '@mui/system';

function Bikes() {
   const dispatch = useDispatch()

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
           <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
            {
              loading ? <Loading/> : 
               
                bikesData ? bikesData.map((x,i) => {
                  return (
                    <MDBCol >
                    <MDBCard>
                      <MDBCardImage
                        src={x.Photo[0]}
                        alt='...'
                        position='top'
                      />
                      <MDBCardBody>
                        <MDBCardTitle><h1>{x.vehicleName}</h1></MDBCardTitle>
                        <MDBCardText>
                          <h5>Vehicle Model : {x.vehicleModel}</h5>
                          <span className='me-auto' style={{float : 'right'}}>hh</span>
                        </MDBCardText>
                        <MDBCardBody>
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}>Card link</MDBCardLink>   :
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}>Card link</MDBCardLink>
        <div>
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}>Card link</MDBCardLink>    :
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}><span>hi</span></MDBCardLink>
        </div>
       
      </MDBCardBody>
                        {/* <MDBCardText className='card-text' >
                          <div className='mb-5'>
                          <h5>Vehicle Model : {x.vehicleModel}</h5>
                          <h1>ddd</h1>
                          </div>
                         
                          <span className='me-auto' style={{float : 'right'}}>hh</span>
                        </MDBCardText> */}
                        {/* <button>SEARCH</button> */}
                        <button type="button" class="btn btn-warning">Book Now</button>
                        {/* <Button style={{backgroundColor:'hsl(203, 85%, 58%); '}}>Go somewhere</Button> */}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  )
                }) : ""
            }
    </MDBRow>
                
           </div>
{/* <div className='container ms-5 mt-5 col-md-3' style={{width : "25rem"}}> */}
{/* <MDBCard>
      <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' />
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}>Card link</MDBCardLink>
        <MDBCardLink href='#'>Card link</MDBCardLink>
      </MDBCardBody>
    </MDBCard>
    <MDBCard>
      <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' />
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}>Card link</MDBCardLink>
        <MDBCardLink href='#'>Card link</MDBCardLink>
      </MDBCardBody>
    </MDBCard>
    <MDBCard>
      <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' />
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}>Card link</MDBCardLink>
        <MDBCardLink href='#'>Card link</MDBCardLink>
      </MDBCardBody>
    </MDBCard>
    <MDBCard>
      <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' />
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href='#' style={{textDecoration : "none",color : "black"}}>Card link</MDBCardLink>
        <MDBCardLink href='#'>Card link</MDBCardLink>
      </MDBCardBody>
    </MDBCard> */}
    {/* </div> */}
         </section>
       </>   
  
  )
}

export default Bikes