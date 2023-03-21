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

const configTOken = {
  headers : {
   "Content-Type" : "application/json",
   Authorization:"Bearer"+' '+user?.token   
  }
}


export const userSignupApi = (Name,Email,Mobile,Password) => API.post('/signup',{Name,Email,Mobile,Password},config)
export const userLoginAPi = (Mobile,Password) => API.post('/login',{Mobile,Password},config)
export const userHomeApi = () => API.get('/',config)
export const userProfileApi = (id) =>API.get('/profile?id='+id,configTOken)
export const imageUploadApi = (id,image) => API.post('/profileImageUpdate?id='+id,{image},configTOken)