import axios from "axios";

const API = axios.create({ baseURL: "https://twowheeler.online/api/admin" });

const admin = JSON.parse(localStorage.getItem("adminInfo"));
console.log("Admin Config", admin ? admin : "");

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const configToken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + " " + admin?.token,
  },
};

const configFormData = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer" + " " + admin?.token,
  },
};

// login
export const adminLoginApi = (Email, Password) =>
  API.post("/login", { Email, Password }, config);

  // users
export const getUsersApi = (page) =>
  API.get(`/users?page=${page}`, configToken);
export const blockUnblockApi = (id) =>
  API.get("/blockUnblock?id=" + id, configToken);

  // bikes
export const adminAddBikeApi = (formData) =>
  API.post("/add-bikes", formData, configFormData);
export const getAllBikesApi = (page) =>
  API.get(`/bikes?page=${page}`, configToken);
export const bikeSingleViewApi = (id) =>
  API.get("/bike-detailed-view?id=" + id, configToken);

  // rent-requests
export const getRentRequetsApi = () => API.get("/rent-requests", configToken);
export const acceptRentRequestsApi = (id, owner) =>
  API.get(`/accept-request?id=${id}&owner=${owner}`, configToken);
export const rejectRentRequetsApi = (id) =>
  API.get("/reject-requests?id=" + id, configToken);

  //bike-actions
export const deleteBikeAPi = (id) =>
  API.get("/delete-bike?id=" + id, configToken);
export const editBikeApi = (id, formData) =>
  API.post("/edit-bike?id=" + id, formData, configFormData);

export const adminSearchBikeApi = (searchTerm, page) => {
  return API.post(`/search-bikes?page=${page}`, { searchTerm }, configToken);
};

//location
export const getLocationApi = () => API.get("/locations", configToken);
export const addLocationApi = (location) =>
  API.post("/add-location", { location }, configToken);
export const deleteLocationApi = (id) =>
  API.get("/delete-location?id=" + id, configToken);
export const editLocationApi = (id, location) =>
  API.post("/edit-location?id=" + id, { location });

  //coupons
export const addCouponApi = (couponName, couponCode, couponPrice) =>
  API.post("/add-coupon", { couponName, couponCode, couponPrice }, configToken);
export const getCouponsApi = () => API.get("/coupons", configToken);
export const editCouponApi = (id, couponName, couponCode) =>
  API.post("/edit-coupon?id=" + id, { couponName, couponCode }, configToken);
export const deleteCouponApi = (id) =>
  API.delete("/delete-coupon?id=" + id, configToken);

  //booking-details
export const getBookedDetailsApi = () =>
  API.get("/booking-details", configToken);

export const getPendingBookingsApi = () =>
  API.get("/get-pending-bookings", configToken);

export const getOnRideBookingsApi = () =>
  API.get("/get-onRide-bookings", configToken);

export const cancelledBookingsApi = () =>
  API.get("/get-cancelled-bookings", configToken);

  //dashboard
export const getDashBoardDetailsApi = () =>
  API.get("get-dashboard-details", configToken);

  //sales-report
export const getSalesReportApi = () => API.get("/get-salesReport", configToken);
