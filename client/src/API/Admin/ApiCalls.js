import axios from "axios"
// let token = user?.token
const API = axios.create({baseURL : "http://localhost:3001/api/admin"})

const admin = JSON.parse(localStorage.getItem('adminInfo'))
console.log("Admin Config",admin?admin:"");

const config = {
    headers : {
      "Content-Type" : "application/json",
    }
}

const configToken = {
  headers : {
   "Content-Type" : "application/json",
   Authorization:"Bearer"+' '+admin?.token   
  }
}

const configFormData = {
  headers : {
    "Content-Type": "multipart/form-data",
    Authorization:"Bearer"+' '+admin?.token   
  }
}

export const adminLoginApi = (Email,Password) => API.post('/login',{Email,Password},config)
export const getUsersApi = () => API.get('/users',configToken)
export const blockUnblockApi = (id) => API.get('/blockUnblock?id=' +id,configToken)
export const adminAddBikeApi = (formData) => API.post('/add-bikes',formData,configFormData)
export const getAllBikesApi = () => API.get('/bikes',configToken)
export const bikeSingleViewApi = (id) => API.get('/bike-detailed-view?id='+id , configToken)
export const getRentRequetsApi = () => API.get('/rent-requests',configToken)
export const acceptRentRequestsApi = (id) => API.get('/accept-request?id='+id,configToken)
export const rejectRentRequetsApi = (id) => API.get('/reject-requests?id='+id,configToken)
export const deleteBikeAPi =(id) => API.get('/delete-bike?id='+id,configToken)
export const editBikeApi = (id,formData) => API.post('/edit-bike?id='+id,formData,configFormData)

export const adminSearchBikeApi = (searchTerm)=> {
  return(
   console.log("search api",searchTerm),
   API.post('/search-bikes',{searchTerm},configToken)
  )
}

export const getLocationApi = () => API.get('/locations',configToken)
export const addLocationApi = (location) => API.post('/add-location',{location},configToken)
export const deleteLocationApi = (id) => API.get('/delete-location?id='+id,configToken)
export const editLocationApi = (id,location) => API.post('/edit-location?id='+id,{location})

export const addCouponApi = (couponName,couponCode,couponPrice) => API.post('/add-coupon',{couponName,couponCode,couponPrice},configToken)
export const getCouponsApi = () => API.get('/coupons',configToken)
export const editCouponApi = (id,couponName,couponCode) => API.post('/edit-coupon?id='+id,{couponName,couponCode},configToken)
export const deleteCouponApi = (id) => API.delete('/delete-coupon?id='+id,configToken)

export const getBookedDetailsApi = () => API.get('/booking-details',configToken)