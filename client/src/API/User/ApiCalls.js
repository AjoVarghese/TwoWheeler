import axios from "axios"
const API = axios.create({baseURL : "http://localhost:3001/api/user"})

const config = {
    headers : {
      "Content-Type" : "application/json",
    }
}
const user = JSON.parse(localStorage.getItem('userInfo'))

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

export const getHomeBikesActionApi = () => API.get('/home-bikes',config)

export const userProfileApi = (id) =>API.get('/profile?id='+id,configTOken)
export const imageUploadApi = (id,image) => API.post('/profileImageUpdate?id='+id,{image},configTOken)
export const editProfileApi = (name,email,mobile,id) => {
  return(
      API.post('/edit-profile?id='+id,{name,email,mobile},configTOken)
  )
}

export const userGetLocationApi = () => API.get('/get-location',config)

export const userAddBikeApi = (formData)=> API.post('/rent-bikes?id='+ID,formData,configFormData)
export const userGetRentedBikesAPi = () => API.get('/rented-bikes?id='+ID,configTOken)

export const userGetBikesApi = (page) => API.get(`/bikes?id=${ID}&page=${page}`,config)
export const searchBikesApi = (searchTerm,page) => {
   return(
    API.post(`/search-bikes?page=${page}&id=${ID}`,{searchTerm},config)
   )
}

export const filterBikesApi = (location,brand,page) => API.post(`/filter-bikes?page=${page}`,{location,brand},config)

export const bookBikeApi = (bookingData) => API.post('/bike-booking',{bookingData},config)

export const createOrderApi = (bookingDetails) => API.post('/booking-success',{bookingDetails},config)

export const rentedRidesApi = () => API.get('/my-rents?id='+ID,configTOken)

export const cancelRideApi = (bikeId,bookingId,startTime,endTime,userId,price) =>
 API.get(`/cancel-ride?bikeId=${bikeId}&bookingId=${bookingId}
 &startTime=${startTime}&endTime=${endTime}&userId=${userId}
 &price=${price}`,configTOken)

 export const endRideApi = (bikeId,bookingId,startTime,endTime,userId) =>
 API.get(`/end-ride?bikeId=${bikeId}
 &bookingId=${bookingId}&startTime=${startTime}
 &endTime=${endTime}&userId=${userId}`,configTOken)

 export const payFineApi = (fineDetails) => API.post('/pay-fine?id='+ID,{fineDetails},configTOken)

 export const paymentSuccessApi =(fineDetails) => API.post('/payment-success',{fineDetails},config)


export const getWalletApi = () => API.get('/get-wallet?id='+ID,configTOken)

// chat
export const getAllUserContacts = (id) => API.get("/contacts?id=" + id, configTOken)
export const sendMessageAPI = (data) => API.post("/add-message", { data }, configTOken)
export const getAllMessagesAPI = (data) => API.post("/get-all-messages", { data }, configTOken)

export const getAllOwnersApi = () => API.get('/get-owners?id='+ID,configTOken)

export const sendMessageAPi = (data) => API.post('/send-message',{data})

export const imageSendApi = (data) => API.post('/send-image',{data})


