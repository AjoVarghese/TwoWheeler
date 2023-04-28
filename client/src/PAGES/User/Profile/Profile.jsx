import React, { useEffect, useState ,useRef  } from 'react'
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from '../../../components/NAVBAR/Navbar'
import './Profile.css'
import Button from 'react-bootstrap/Button';


import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput
} from 'mdb-react-ui-kit';


import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { getUserProfileAction, getUserProfileReducer, imageUploadAction } from '../../../redux/Actions/USER_ACTIONS/userProfileAction';
import ModalBox from '../../../components/Modal/ModalBox';
import { getWalletAction } from '../../../redux/Actions/USER_ACTIONS/getWalletAction';



function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [image,setImage] = useState("")
  const [modal,setModal] = useState(false)
  const [error, setError] = useState(null);

  const click = () => {
    console.log('click');
  }
  
  useEffect(() => {
    dispatch(getWalletAction())
  },[])

  const wallet = useSelector((state) => state.getWalletReducer.walletData)
  console.log('wallet',wallet);
 
    const profileData = useSelector((state)=>state.userLoginReducer.userLoginDetails)
            
 

  const handleClick = (e) => {
     e.preventDefault()
     const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","ml_default")
    formData.append("cloud_name","dxt9i7gl6")
    fetch("https://api.cloudinary.com/v1_1/dxt9i7gl6/image/upload",{
      method : "post",
      body : formData
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.format !== 'jpg' && data.format !== 'jpeg' && data.format !== 'png') {
        setError('Please upload a JPEG or PNG file');
        return;
      }
      dispatch(imageUploadAction(data.url))
    })
  }

  return (
    <>
    <Navbar/>

<section>

      <MDBContainer className="py-5">
      
        <MDBRow>
          <MDBCol>
          </MDBCol>
         
        </MDBRow>
        {
          modal ? <ModalBox closeModal={setModal} details = {profileData}/> : ""
        }
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  type = 'file'
                  src={profileData?profileData.ProfileImage:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="avatar"
                  className="circle"
                  style={{ width: '200px',height:"200x",borderRadius:"50%" }}
                  fluid />
                <p className="text-muted mb-1">{profileData.Name}</p>
                <p className="text-muted mb-4">{profileData.Email}</p>
                <div className="d-flex justify-content-center mb-2">
                 
                  <Button variant="secondary"><input type="file"
                   accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => setImage(e.target.files[0])}
                  style = {{width : '15rem'}}
                  className='ms-3'
                  /></Button>{' '}
                  
                  <Button variant="warning ms-3" 
                  onClick={handleClick} 
                  style={{backgroundColor : "#fed250"}}
                  className='me-3'
                  >Upload</Button>{' '}
                </div>
                
                  {error && <p style={{color : "red"}}>{error}</p>}
                  
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                 
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <p>Wallet Amount: <span><h4>Rs.{wallet ?.walletAmount}.00</h4></span></p>
                   
                    <Button variant="warning ms-4" 
                    style={{backgroundColor : "#fed250"}}
                    onClick = {(e) => {
                      navigate('/my-wallet',{state:{wallet}})
                    }}
                    >My Wallet</Button>{' '}
                    
                   
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
           
            <MDBCard className="mb-4">
            <h1 className='mt-3 ms-4' style={{fontSize : '25px'}}>User Details</h1>
              <MDBCardBody>
                <label htmlFor="">Username</label>
                <MDBRow>
                 <MDBInput
      
      placeholder={profileData.Name}
      id='formControlReadOnly'
      type='text'
      readonly
    />
         
                </MDBRow>
                <label htmlFor="">Email</label>
                <MDBRow>
                 <MDBInput
     
      placeholder={profileData.Email}
      id='formControlReadOnly'
      type='text'
      readonly
    />
                  
                </MDBRow>
                <label htmlFor="">Mobile No</label>
                <MDBRow>
                  
                 <MDBInput
     
      placeholder={profileData.Mobile}
      id='formControlReadOnly'
      type='number'
      readonly
    />
            
                </MDBRow>
                <MDBRow>
                <Button variant="warning ms-4 me-4 mt-3" 
                style={{backgroundColor : "#fed250",width : '50rem'}} 

                onClick = {(e) => 
                  {setModal(true)}
                  } 
                  >Edit Details</Button>{' '}
                </MDBRow>
               
                
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
                {/* <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1"></span> <h1 style={{fontSize : '25px'}}>Upload Documents</h1></MDBCardText> */}
                     
                    {/* <div className="card"> */}
                      {/* <input type='file'></input>
                      <hr />
                      <input type='file' className='mt-3'></input>
                      <Button style={{backgroundColor:"black"}} className='mt-3'>Upload</Button> */}
                 
    {/* <Button size="medium" color='warning'>
      Upload
    </Button> */}
            {/* <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} /> */}
        {/* </div> */}
                    {/* <div className="card">
            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div> */}
                    {/* <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress> */}

                    {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress> */}

                    {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress> */}

                    {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress> */}

                    {/* <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress> */}
                  {/* </MDBCardBody>
                </MDBCard> */}
              </MDBCol>

              {/* <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol> */}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  )
}

export default Profile