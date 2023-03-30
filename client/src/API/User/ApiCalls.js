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

export const signInGoogleApi = (accessToken) => API.post('/login',{
  googleAccessToken : accessToken
})

export const signUpGoogleApi = (accessToken) => API.post('/signup',{
  googleAccessToken : accessToken
})
export const userSignupApi = (Name,Email,Mobile,Password) => API.post('/signup',{Name,Email,Mobile,Password},config)
export const userLoginAPi = (Mobile,Password) => API.post('/login',{Mobile,Password},config)

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

export const userGetBikesApi = () => API.get('/bikes',config)
export const searchBikesApi = (searchTerm) => {
   return(
    console.log("search api",searchTerm),
    API.post('/search-bikes',{searchTerm},config)
   )
}



