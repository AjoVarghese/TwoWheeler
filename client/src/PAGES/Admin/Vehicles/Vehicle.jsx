import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../components/NAVBAR/AdminSideBar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Figure from "react-bootstrap/Figure";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSearchBikeAction,
  deleteBikeAction,
  getAllBikesAction,
} from "../../../redux/Actions/ADMIN_ACTIONS/getAllBikesAction";
import { useNavigate } from "react-router-dom";

import AlertDialog from "../../../components/AlertDialog/AlertDialog";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Toaster } from "react-hot-toast";

function Vehicle() {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  // const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedBike, setSelectedBike] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const bikes = useSelector((state) => state.admingetAllBikesReducer);
  const { bikesData } = bikes;

  const deleteBike = () => {
    dispatch(deleteBikeAction(selectedBike));
  };

  console.log("this is serch term", searchTerm);

  useEffect(() => {
    dispatch(getAllBikesAction(page));
  }, []);

  useEffect(() => {
    onSubmitSearch(page);
  }, [searchTerm]);

  const onSubmitSearch = (e, page) => {
    console.log("CALLED");
    dispatch(adminSearchBikeAction(searchTerm, page));
  };

  const handlePrev = () => {
    dispatch(getAllBikesAction(bikesData.pagination.currentPage - 1));
    setPage(bikesData.pagination.currentPage - 1);
  };

  const handleNext = () => {
    dispatch(getAllBikesAction(bikesData.pagination.currentPage + 1));
    setPage(bikesData.pagination.currentPage + 1);
  };
  return (
    <>
      {deleteDialog ? (
        <AlertDialog
          message="Do you want to delete the bike from the store"
          bikeId={selectedBike}
          functionToBeDone={deleteBike}
          closeDialog={setDeleteDialog}
        />
      ) : (
        ""
      )}
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 4000 }}
        />
        <Box sx={{ display: "flex" }}>
          <AdminSideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <h1>Bikes</h1>

            <div className="card container md-12 h-75">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Bikes"
                  onChange={(e) => {
                    console.log("E", e);
                    setSearchTerm(e.target.value);
                  }}
                />
              </Paper>
              <MDBPagination className="mb-0 d-flex justify-content-end">
                {page > 1 ? (
                  <MDBPaginationItem>
                    <MDBPaginationLink
                      aria-label="Previous"
                      onClick={handlePrev}
                    >
                      <span aria-hidden="true">« Prev</span>
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                ) : (
                  ""
                )}
                {page === pageCount ? (
                  ""
                ) : (
                  <MDBPaginationItem>
                    <MDBPaginationLink aria-label="Next" onClick={handleNext}>
                      <span aria-hidden="true">Next »</span>
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                )}
              </MDBPagination>
              <TableContainer
                component={Paper}
                sx={{
                  height: 600,
                }}
              >
                <Table
                  sx={{
                    height: "max-content",
                  }}
                  aria-label="simple table"
                >
                  <TableHead
                    sx={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      backgroundColor: "#fff",
                    }}
                  >
                    <TableRow>
                      <TableCell style={{ position: "sticky", top: 0 }}>
                        <h4>Sl.No</h4>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ position: "sticky", top: 0 }}
                      >
                        <h4>Vehicle Name</h4>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ position: "sticky", top: 0 }}
                      >
                        <h4>Image</h4>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ position: "sticky", top: 0 }}
                      >
                        <h4>Brand</h4>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ position: "sticky", top: 0 }}
                      >
                        <h4>Vehicle Model</h4>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ position: "sticky", top: 0 }}
                      >
                        <h4>Color</h4>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ position: "sticky", top: 0 }}
                      >
                        <h4>Price</h4>
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ position: "sticky", top: 0 }}
                      >
                        <h4>Action</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    style={{
                      maxHeight: 400,
                      overflowY: "auto",
                    }}
                  >
                    {bikesData
                      ? bikesData?.data.map((data, i) => {
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <h5>{i + 1}</h5>
                              </TableCell>
                              <TableCell align="center">
                                <h5>{data.vehicleName}</h5>
                              </TableCell>
                              <TableCell align="center">
                                <Figure>
                                  <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src={data.Photo[0]}
                                  />
                                  <Figure.Caption></Figure.Caption>
                                </Figure>
                              </TableCell>
                              <TableCell align="center">
                                <h5>{data.Brand}</h5>
                              </TableCell>
                              <TableCell align="center">
                                <h5>{data.vehicleModel}</h5>
                              </TableCell>
                              <TableCell align="center">
                                <h5>{data.Color}</h5>
                              </TableCell>
                              <TableCell align="center">
                                <h5>{data.Price} /hr</h5>
                              </TableCell>
                              <TableCell align="center">
                                {/* <Button
                                  variant="contained"
                                  color="info"
                                  onClick={(e) => {
                                    navigate("/admin/edit-bike", {
                                      state: { data },
                                    });
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  className="ms-3"
                                  onClick={(e) => {
                                    setDeleteDialog(true);
                                    setSelectedBike(data._id);
                                  }}
                                >
                                  Delete
                                </Button> */}
                                <style jsx>{`
                                  @media (max-width: 600px) {
                                    .button-container {
                                      display: flex;
                                      flex-direction: column;
                                      align-items: center;
                                      justify-content: center;
                                      margin-top: 10px;
                                    }
                                    .button-container button {
                                      margin: 5px 0;
                                    }
                                  }
                                `}</style>
                                <div className="button-container">
                                  <Button
                                    variant="contained"
                                    color="info"
                                    onClick={(e) => {
                                      navigate("/admin/edit-bike", {
                                        state: { data },
                                      });
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    className="ms-3"
                                    onClick={(e) => {
                                      setDeleteDialog(true);
                                      setSelectedBike(data._id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : "No data available"}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Vehicle;
