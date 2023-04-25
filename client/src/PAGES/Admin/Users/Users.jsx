import { Box, CircularProgress, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { blockUnblockApi } from '../../../api/Admin/ApiCalls';
import Loading from '../../../components/Loading/Loading';
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar'
import { adminUserAction } from '../../../redux/Actions/ADMIN_ACTIONS/adminUserActions';
// import UserTable from '../../../components/UserTable/UserTable';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';


function Users() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
  const dispatch = useDispatch()

  const [load,setLoading]=useState(false);
const [sucess,setSuccess]=useState(false);

const [page, setPage] = useState(1)
const [pageCount, setPageCount] = useState(0)



  const adminUserdata = useSelector((state) => state.adminUserGetReducer)
  const {loading,adminUserData} = adminUserdata;

 const handleAction = (id) => {
    blockUnblockApi(id).then((data) => {
      console.log(data.data);
      localStorage.removeItem("userInfo")
      if(data){
        dispatch(adminUserAction())
        setLoading(false)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000);
      }
    })
    .catch((err) => {
      console.log("SOME ERROR IN ADD BIKE",err);
      setLoading(false);
     })
 }


  useEffect(() => {
    dispatch(adminUserAction(page))
  },[])

  const handlePrev = () => {
    dispatch(adminUserAction(adminUserData.pagination.currentPage - 1))
    setPage(adminUserData.pagination.currentPage - 1)
   }
   
   const handleNext = () => {
    dispatch(adminUserAction(adminUserData.pagination.currentPage + 1))
    setPage(adminUserData.pagination.currentPage + 1)
   }
  return (
    <div>
      
     <Box sx={{ display : 'flex' }}>
     {/* <Loading/> */}
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Users</h1>
        <div className="card container md-12">
        <MDBPagination className='mb-2 mt-2 d-flex justify-content-end'>
        {
        page > 1 ? (
          <MDBPaginationItem>
          <MDBPaginationLink  aria-label='Previous' onClick={handlePrev}>
            <span aria-hidden='true'>« Prev</span>
          </MDBPaginationLink>
        </MDBPaginationItem>
        ) : (
          ''
        )
      }
        {/* <MDBPaginationItem>
          <MDBPaginationLink href='#'>1</MDBPaginationLink>
        </MDBPaginationItem> */}
        {/* <MDBPaginationItem>
          <MDBPaginationLink href='#'>2</MDBPaginationLink>
        </MDBPaginationItem> */}
        {/* <MDBPaginationItem>
          <MDBPaginationLink href='#'>3</MDBPaginationLink>
        </MDBPaginationItem> */}
      {
        page === pageCount ? (
          ''
        ) : (
          <MDBPaginationItem>
          <MDBPaginationLink  aria-label='Next' onClick={handleNext}>
            <span aria-hidden='true'>Next »</span>
          </MDBPaginationLink>
        </MDBPaginationItem>
        )
       }
      </MDBPagination>

<Table striped >
      <thead >
        <tr style={{backgroundColor : "grey"}}>
          <th>Sl.No</th>
          <th>Username</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        
          {
            loading? <Loading/> :adminUserData? adminUserData?.data.map((m,index )=>{
              // console.log(m);
              return(
                <>
                <tr>
                  <td>{index + 1}</td>
                  <td >{m.Name}</td>
                  <td>{m.Email}</td>
                  <td>{m.Mobile}</td>
                  <td>{m.Status?'Access Allowed':'Acces Suspended'}</td>
                  <td>
                    {
                      load ?  <button className='mb-4 container col-md-4 sm-3' style ={{backgroundColor : '#fed250'}} disabled ><CircularProgress /></button> :
                     <button button onClick={()=>{
                      handleAction(m._id)
                    }}>{m.Status ? 'Block' : "Unblock"}</button>
                    }
                    </td>
                </tr>
                </>
              )
            }) :'No data available'
          }
        
      </tbody>
    </Table>
    {/* <UserTable userData={adminUserData}/> */}
        </div>
      </Box>
      
      </Box>
      <Box>
      
      </Box>
      
    </div>
  )
}

export default Users