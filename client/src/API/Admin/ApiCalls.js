import axios from "axios"
// let token = user?.token
const API = axios.create({baseURL : "http://localhost:3001/api/admin"})

const admin = JSON.parse(localStorage.getItem('adminInfo'))
console.log("Admin Config",admin);

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

export const adminLoginApi = (Email,Password) => API.post('/login',{Email,Password},config)
export const getUsersApi = () => API.get('/users',configToken)
export const blockUnblockApi = (id) => API.get('/blockUnblock?id=' +id,configToken)