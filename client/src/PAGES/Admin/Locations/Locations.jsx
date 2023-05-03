import { Box, Button, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../components/NAVBAR/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../../redux/Actions/ADMIN_ACTIONS/locationActions";
import AddLocationModal from "../../../components/Modal/AddLocationModal";
import LocationTable from "../../../components/Tables/LocationTable";

function Locations() {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const location = useSelector((state) => state.getLocationReducer.location);

  useEffect(() => {
    dispatch(getLocation());
  }, [modal]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminSideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <h1>Locations</h1>
          <div className="d-flex justify-content-start ms-5 mt-3">
            <Button
              variant="outlined"
              color="info"
              onClick={(e) => {
                setModal(true);
              }}
            >
              Add Location
            </Button>
          </div>

          {modal ? (
            <AddLocationModal
              open={modal}
              onClose={() => setModal(false)}
              message="Add a new location"
            />
          ) : (
            ""
          )}

          <LocationTable data={location} />
        </Box>
      </Box>
    </div>
  );
}

export default Locations;
