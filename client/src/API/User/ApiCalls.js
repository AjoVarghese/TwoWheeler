import axios from "axios";
const API = axios.create({ baseURL: "https://twowheeler.online/api/user" });

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const user = JSON.parse(localStorage.getItem("userInfo"));

const ID = user?.id;

const configTOken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + " " + user?.token,
  },
};

const configFormData = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer" + " " + user?.token,
  },
};

//signup-login
export const googleSignupApi = (Name, Email, Phone, Photo) =>
  API.post("/google-signup", { Name, Email, Phone, Photo }, config);

export const userSignupApi = (Name, Email, Mobile, Password, Referral) =>
  API.post("/signup", { Name, Email, Mobile, Password, Referral }, config);

export const userLoginAPi = (Mobile, Password) =>
  API.post("/login", { Mobile, Password }, config);

export const OTPLoginApi = (mobile) =>
  API.post("/otp-login", { mobile }, config);


  //home
export const userHomeApi = () => API.get("/", config);

//bikes
export const getHomeBikesActionApi = () => API.get("/home-bikes", config);

//profile
export const userProfileApi = (id) => API.get("/profile?id=" + id, configTOken);
export const imageUploadApi = (id, image) =>
  API.post("/profileImageUpdate?id=" + id, { image }, configTOken);
export const editProfileApi = (name, email, mobile, id) => {
  return API.post(
    "/edit-profile?id=" + id,
    { name, email, mobile },
    configTOken
  );
};

//location
export const userGetLocationApi = () => API.get("/get-location", config);

//rent-bikes
export const userAddBikeApi = (formData) =>
  API.post("/rent-bikes?id=" + ID, formData, configFormData);
export const userGetRentedBikesAPi = () =>
  API.get("/rented-bikes?id=" + ID, configTOken);

  //bikes
export const userGetBikesApi = (page) =>
  API.get(`/bikes?id=${ID}&page=${page}`, config);
export const searchBikesApi = (searchTerm, page) => {
  return API.post(
    `/search-bikes?page=${page}&id=${ID}`,
    { searchTerm },
    config
  );
};

export const filterBikesApi = (location, brand, page) =>
  API.post(`/filter-bikes?page=${page}`, { location, brand }, config);

  //booking
export const bookBikeApi = (bookingData) =>
  API.post("/bike-booking", { bookingData }, config);

export const createOrderApi = (bookingDetails) =>
  API.post("/booking-success", { bookingDetails }, config);

  //rent-details
export const rentedRidesApi = () => API.get("/my-rents?id=" + ID, configTOken);

export const cancelRideApi = (
  bikeId,
  bookingId,
  startTime,
  endTime,
  userId,
  price
) =>
  API.get(
    `/cancel-ride?bikeId=${bikeId}&bookingId=${bookingId}
 &startTime=${startTime}&endTime=${endTime}&userId=${userId}
 &price=${price}`,
    configTOken
  );

export const endRideApi = (bikeId, bookingId, startTime, endTime, userId) =>
  API.get(
    `/end-ride?bikeId=${bikeId}
 &bookingId=${bookingId}&startTime=${startTime}
 &endTime=${endTime}&userId=${userId}`,
    configTOken
  );


  //fine
export const payFineApi = (fineDetails) =>
  API.post("/pay-fine?id=" + ID, { fineDetails }, configTOken);

export const paymentSuccessApi = (fineDetails) =>
  API.post("/payment-success", { fineDetails }, config);

  //wallet
export const getWalletApi = () => API.get("/get-wallet?id=" + ID, configTOken);

// chat
export const getAllUserContacts = (id) =>
  API.get("/contacts?id=" + id, configTOken);
export const sendMessageAPI = (data) =>
  API.post("/add-message", { data }, configTOken);
export const getAllMessagesAPI = (data) =>
  API.post("/get-all-messages", { data }, configTOken);

export const getAllOwnersApi = () =>
  API.get("/get-owners?id=" + ID, configTOken);

export const sendMessageAPi = (data) => API.post("/send-message", { data });

export const imageSendApi = (data) => API.post("/send-image", { data });
