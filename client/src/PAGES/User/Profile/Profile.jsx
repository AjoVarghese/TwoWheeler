import React, { useEffect, useState ,useRef  } from 'react'
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
import './Profile.css'
import Button from 'react-bootstrap/Button';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput
} from 'mdb-react-ui-kit';
// import { MDBIcon } from 'mdb-react-ui-kit';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
// import { Tooltip, Button } from '@mantine/core';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfileAction, getUserProfileReducer, imageUploadAction } from '../../../REDUX/Actions/USER_ACTIONS/userProfileAction';
import ModalBox from '../../../COMPONENTS/Modal/ModalBox';



function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [image,setImage] = useState("")
  const [modal,setModal] = useState(false)

  // const toast = useRef(null);

  //   const onUpload = () => {
  //       toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  //   };
    
    const profileData = useSelector((state)=>state.userLoginReducer.userLoginDetails)
     console.log("profileData",profileData);
            
    // const profileImage = useSelector((state) =>state.imageUploadReducer.profileImage )
    //  console.log("PROFILEIMAGE",profileImage);

  // useEffect(() => {
  //   dispatch(getUserProfileAction())
  // },[])


  const handleClick = (e) => {
     e.preventDefault()
     const formData = new FormData()
     console.log("Image",image);
    formData.append("file",image)
    formData.append("upload_preset","ml_default")
    formData.append("cloud_name","dxt9i7gl6")
    console.log("FORM DATA",formData);
    fetch("https://api.cloudinary.com/v1_1/dxt9i7gl6/image/upload",{
      method : "post",
      body : formData
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("DDDATAAATA",data.url);
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
            {/* <MDBBreadcrumb className="bg-light rounded-3">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb> */}
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
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  {/* <MDBBtn><input type="file" /></MDBBtn> */}
                  {/* <input type="file" /> */}
                  {/* <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                  <Button variant="secondary"><input type="file" onChange={(e) => setImage(e.target.files[0])}/></Button>{' '}
                  <Button variant="warning ms-4" onClick={handleClick} style={{backgroundColor : "#fed250"}}>Upload</Button>{' '}
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                 
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <p>Wallet Amount <span>0.0</span></p>
                    <Button variant="warning ms-4" style={{backgroundColor : "#fed250"}}>My Wallet</Button>{' '}
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
                  {/* <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol> */}
                 <MDBInput
      
      placeholder={profileData.Name}
      id='formControlReadOnly'
      type='text'
      readonly
    />
         
                  {/* <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol> */}
                </MDBRow>
                <label htmlFor="">Email</label>
                <MDBRow>
                  {/* <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol> */}
                 <MDBInput
     
      placeholder={profileData.Email}
      id='formControlReadOnly'
      type='text'
      readonly
    />
                  {/* <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol> */}
                </MDBRow>
                <label htmlFor="">Mobile No</label>
                <MDBRow>
                  {/* <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol> */}
                 <MDBInput
     
      placeholder={profileData.Mobile}
      id='formControlReadOnly'
      type='number'
      readonly
    />
            
                </MDBRow>
                <MDBRow>
                <Button variant="warning ms-6 me-6 mt-3" style={{backgroundColor : "#fed250"}} onClick = {(e) => 
                  {setModal(true)}
                  } 
                  >Edit Details</Button>{' '}
                </MDBRow>
               
                {/* <hr /> */}
                {/* <MDBRow>
                  <MDBCol lg="8">
                  <MDBInput
      label='Email'
      placeholder='email@gmail.com'
      id='formControlReadOnly'
      type='text'
      readonly
    />
                  </MDBCol>
                  <MDBCol lg="8">
                  <MDBInput
      label='Mobile No'
      placeholder='1234567890'
      id='formControlReadOnly'
      type='Number'
      readonly
    />
                  </MDBCol>
                </MDBRow> */}
                {/* <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr /> */}
                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1"></span> <h1 style={{fontSize : '25px'}}>Upload Documents</h1></MDBCardText>
                     
                    <div className="card">
            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
        </div>
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
                  </MDBCardBody>
                </MDBCard>
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