import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../components/NAVBAR/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../../redux/Actions/ADMIN_ACTIONS/locationActions";
import AddLocationModal from "../../../components/Modal/AddLocationModal";
import EditLocationModal from "../../../components/Modal/EditLocationModal";
import DeleteLocationModal from "../../../components/Modal/DeleteLocationModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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

  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState("");

  const location = useSelector((state) => state.getLocationReducer.location);

  useEffect(() => {
    dispatch(getLocation());
  }, [modal, editModal, deleteModal]);

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

          <div className="container mt-2">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sl.No</StyledTableCell>
                    <StyledTableCell align="center">Location</StyledTableCell>
                    <StyledTableCell align="center">Edit</StyledTableCell>
                    <StyledTableCell align="center">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>

                {editModal ? (
                  <EditLocationModal
                    locationId={selected}
                    open={editModal}
                    onClose={() => setEditModal(false)}
                  />
                ) : (
                  ""
                )}

                {deleteModal ? (
                  <DeleteLocationModal
                    locationId={selected}
                    open={deleteModal}
                    onClose={() => setDeleteModal(false)}
                  />
                ) : (
                  ""
                )}

                <TableBody>
                  {location?.length > 0 ? (
                    location.map((row, i) => {
                      return (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {i + 1}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.Location}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Tooltip title="Edit Details" variant="soft">
                              <Button
                                variant="contained"
                                color="info"
                                onClick={(e) => {
                                  setEditModal(true);

                                  setSelected(row._id, row.Location);
                                }}
                              >
                                Edit
                              </Button>
                            </Tooltip>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={(e) => {
                                setDeleteModal(true);
                                setSelected(row._id);
                              }}
                            >
                              Delete
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                  ) : (
                    <h4>No data available</h4>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Locations;
