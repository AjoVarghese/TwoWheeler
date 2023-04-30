import React, { lazy, Suspense } from "react";
import "./App.js";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SalesReport from "./pages/Admin/SaleReport/SalesReport";
import BackdropLoading from "./components/BackDrop/BackDrop";
import ErrorPage from "./components/ErrorPages/404.jsx";

//LazyLoading
const Bookings = lazy(() => import("./pages/Admin/Bookings/Bookings"));
const Dashboard = lazy(() => import("./pages/Admin/DashBoard/Dashboard"));
const AddLocation = lazy(() => import("./pages/Admin/Locations/AddLocation"));
const Locations = lazy(() => import("./pages/Admin/Locations/Locations"));
const AdminLogin = lazy(() => import("./pages/Admin/Login/AdminLogin"));
const RentRequets = lazy(() => import("./pages/Admin/RentRequets/RentRequets"));
const Users = lazy(() => import("./pages/Admin/Users/Users"));
const AddVehicle = lazy(() => import("./pages/Admin/Vehicles/AddVehicle"));
const EditBike = lazy(() => import("./pages/Admin/Vehicles/EditBike"));
const SingleBikeView = lazy(() =>
  import("./pages/Admin/Vehicles/SingleBikeView")
);
const Vehicle = lazy(() => import("./pages/Admin/Vehicles/Vehicle"));
const Bikes = lazy(() => import("./pages/User/Bikes/Bikes"));
const Home = lazy(() => import("./pages/User/Home/Home"));
const Login = lazy(() => import("./pages/User/Login/Login"));
const Otplogin = lazy(() => import("./pages/User/OTPLogin/Otplogin"));
const Profile = lazy(() => import("./pages/User/Profile/Profile"));
const RentBikes = lazy(() => import("./pages/User/Rent Bikes/RentBikes"));
const ViewRentedBikes = lazy(() =>
  import("./pages/User/Rent Bikes/ViewRentedBikes")
);
const Signup = lazy(() => import("./pages/User/Signup/Signup"));
const SingleView = lazy(() => import("./pages/User/SingleView/SingleView"));
const Booking = lazy(() => import("./pages/User/Booking/Booking"));
const Coupons = lazy(() => import("./pages/Admin/Coupons/Coupons"));
const SuccessPage = lazy(() => import("./components/SuccessPage/SuccessPage"));
const RentedRides = lazy(() => import("./pages/User/RentedRides/RentedRides"));
const Wallet = lazy(() => import("./pages/User/Wallet/Wallet"));
const Chat = lazy(() => import("./pages/User/Chat/Chat"));
const PaymentSuccess = lazy(() =>
  import("./components/PaymentSuccess/PaymentSuccess")
);

function App() {
  const userdata = useSelector(
    (state) => state.userLoginReducer.userLoginDetails
  );
  const adminData = useSelector(
    (state) => state.adminLoginReducer.adminLoginData
  );

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<BackdropLoading />}>
          <Routes>
            <Route exact path="/" element={<Home />}>
              {" "}
            </Route>
            <Route
              exact
              path="/signup"
              element={userdata ? <Navigate to="../" /> : <Signup />}
            ></Route>
            <Route
              exact
              path="/login"
              element={userdata ? <Navigate to="../" /> : <Login />}
            ></Route>
            <Route exact path="/bikes" element={<Bikes />}></Route>
            <Route
              exact
              path="/bike-detailed-view"
              element={<SingleView />}
            ></Route>
            <Route
              exact
              path="/otp-login"
              element={userdata ? <Navigate to="../" /> : <Otplogin />}
            ></Route>
            <Route
              exact
              path="/profile"
              element={userdata ? <Profile /> : <Navigate to="/login" />}
            ></Route>
            <Route path="/rent-bikes" element={<RentBikes />} />
            <Route
              exact
              path="/rented-bikes"
              element={
                userdata ? <ViewRentedBikes /> : <Navigate to="/login" />
              }
            ></Route>
            <Route
              exact
              path="/booking-summary"
              element={userdata ? <Booking /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/booking-success"
              element={<SuccessPage />}
            ></Route>
            <Route
              exact
              path="/my-rents"
              element={userdata ? <RentedRides /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/my-wallet"
              element={userdata ? <Wallet /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/chat"
              element={userdata ? <Chat /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/payment-success"
              element={userdata ? <PaymentSuccess /> : <Navigate to="/login" />}
            ></Route>

            {/* admin */}
            <Route
              exact
              path="/admin/login"
              element={
                adminData ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
              }
            ></Route>
            <Route
              exact
              path="/admin/dashboard"
              element={
                adminData ? <Dashboard /> : <Navigate to="/admin/login" />
              }
            ></Route>
            <Route
              exact
              path="/admin/users"
              element={adminData ? <Users /> : <Navigate to="/admin/login" />}
            ></Route>
            <Route
              exact
              path="/admin/bikes"
              element={adminData ? <Vehicle /> : <Navigate to="/admin/login" />}
            ></Route>
            <Route
              exact
              path="/admin/bike-detailed-view"
              element={
                adminData ? <SingleBikeView /> : <Navigate to="/admin/login" />
              }
            ></Route>
            <Route
              exact
              path="/admin/add-bikes"
              element={
                adminData ? <AddVehicle /> : <Navigate to="/admin/login" />
              }
            ></Route>
            <Route
              exact
              path="/admin/rent-requests"
              element={
                adminData ? <RentRequets /> : <Navigate to="/admin/login" />
              }
            ></Route>
            <Route
              exact
              path="/admin/edit-bike"
              element={
                adminData ? <EditBike /> : <Navigate to="/admin/login" />
              }
            ></Route>
            <Route
              exact
              path="/admin/locations"
              element={
                adminData ? <Locations /> : <Navigate to="/admin/login" />
              }
            ></Route>
            <Route
              exact
              path="/admin/add-location"
              element={
                adminData ? <AddLocation /> : <Navigate to="/admin/login" />
              }
            ></Route>
            <Route
              exact
              path="/admin/bookings"
              element={
                adminData ? <Bookings /> : <Navigate to={"/admin/login"} />
              }
            ></Route>
            <Route
              exact
              path="/admin/coupons"
              element={adminData ? <Coupons /> : <Navigate to="/admin/login" />}
            ></Route>
            <Route
              exact
              path="/admin/sales-report"
              element={
                adminData ? <SalesReport /> : <Navigate to="/admin/login" />
              }
            ></Route>

            {/* 404 Page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
