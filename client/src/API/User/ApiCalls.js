import axios from "axios"
// let token = user?.token
const API = axios.create({baseURL : "http://localhost:3001/api/user"})

const config = {
    headers : {
      "Content-Type" : "application/json",
    }
}
let user = JSON.parse(localStorage.getItem('userInfo'))
console.log("API CALL USER TOKEN",user);

const ID = user?.id

const configTOken = {
  headers : {
   "Content-Type" : "application/json",
   Authorization:"Bearer"+' '+user?.token   
  }
}

const configFormData = {
  headers : {
    "Content-Type": "multipart/form-data",
    Authorization:"Bearer"+' '+user?.token   
  }
}

export const googleSignupApi = (Name,Email,Phone,Photo) => API.post('/google-signup',{Name,Email,Phone,Photo},config)
export const userSignupApi = (Name,Email,Mobile,Password,Referral) => API.post('/signup',{Name,Email,Mobile,Password,Referral},config)
export const userLoginAPi = (Mobile,Password) => API.post('/login',{Mobile,Password},config)

export const OTPLoginApi = (mobile) => API.post('/otp-login',{mobile},config)

export const userHomeApi = () => API.get('/',config)

export const userProfileApi = (id) =>API.get('/profile?id='+id,configTOken)
export const imageUploadApi = (id,image) => API.post('/profileImageUpdate?id='+id,{image},configTOken)
export const editProfileApi = (name,email,mobile,id) => {
  return(
    console.log("{PROFILE API",name),
    console.log("{PROFILE API",email),
    console.log("{PROFILE API",mobile),
    console.log("{PROFILE API",id),
    console.log("CONFIG",configTOken),
    
      API.post('/edit-profile?id='+id,{name,email,mobile},configTOken)
  )
}

export const userGetLocationApi = () => API.get('/get-location',config)

export const userAddBikeApi = (formData)=> API.post('/rent-bikes?id='+ID,formData,configFormData)
export const userGetRentedBikesAPi = () => API.get('/rented-bikes?id='+ID,configTOken)

export const userGetBikesApi = () => API.get('/bikes?id='+ID,config)
export const searchBikesApi = (searchTerm) => {
   return(
    console.log("search api",searchTerm),
    API.post('/search-bikes',{searchTerm},config)
   )
}

export const bookBikeApi = (bookingData) => API.post('/bike-booking',{bookingData},config)

export const createOrderApi = (bookingDetails) => API.post('/booking-success',{bookingDetails},config)

export const rentedRidesApi = () => API.get('/my-rents?id='+ID,configTOken)

export const cancelRideApi = (bikeId,bookingId,startTime,endTime,userId) =>
 API.get(`/cancel-ride?bikeId=${bikeId}&bookingId=${bookingId}&startTime=${startTime}&endTime=${endTime}&userId=${userId}`,configTOken)

 export const endRideApi = (bikeId,bookingId,startTime,endTime,userId) =>
 API.get(`/end-ride?bikeId=${bikeId}
 &bookingId=${bookingId}&startTime=${startTime}
 &endTime=${endTime}&userId=${userId}`,configTOken)

export const getWalletApi = () => API.get('/get-wallet?id='+ID,configTOken)


