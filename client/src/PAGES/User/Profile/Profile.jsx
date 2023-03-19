import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
import './Profile.css'
import { Button } from 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfileAction, getUserProfileReducer, imageUploadAction } from '../../../REDUX/Actions/USER_ACTIONS/userProfileAction';

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [image,setImage] = useState("")

  
    
    const profileData = useSelector((state)=>state.userLoginReducer.userLoginDetails)
  console.log("profileData",profileData);
            
            const profileImage = useSelector((state) =>state.imageUploadReducer.profileImage )
  console.log("PROFILEIMAGE",profileImage);

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
    <div className='main-div'>

      <div className='left-section'>

       <div className='profile'>
        <h2 className='header'>PROFILE</h2>
         <div className='img-div'>
           <img src= {profileData?profileData.ProfileImage:''} alt="" className='image' />
         </div>
         <div className='upload-field'>
          <input type="file" 
          onChange={(e) => setImage(e.target.files[0])}/>
         </div>
         <div className='upload-button'>
            <button onClick={handleClick}>Upload Image</button>
         </div>
         <div className='details-div'>
            <p>{profileData ? profileData.Name : ""}</p>
            <p>{ profileData ? profileData.Mobile : ""}</p>
            <p>{profileData ? profileData.Email : ""}</p>
         </div>
         
       </div>

       <div className='wallet-card'>
         <p>My Wallet Balance : 0.0</p>
         <button>Check My Wallet</button>
        
        </div>
      </div>

      {/* <div className='right-section'>
        <div className='documents'>
          fff
        </div>
      </div> */}
    </div>
    </>
  )
}

export default Profile