import { Box, Button, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../../components/NAVBAR/AdminSideBar'
import CouponTable from '../../../components/Tables/CouponTable';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../../../redux/Actions/ADMIN_ACTIONS/couponActions';
import AddCouponModal from '../../../components/Modal/AddCouponModal';

function Coupons() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const dispatch = useDispatch()

    const [modal,setModal] = useState(false)

    const coupons = useSelector((state) => state.getCouponReducer.couponData)

    useEffect(() => {
      dispatch(getCoupons())
    },[modal])

    
   
  return (
    <div>
       <Box sx={{ display : 'flex' }}>
      <AdminSideBar/>
      <Box component = 'main' sx={{flexGrow : 1,p:3}}>
        <DrawerHeader/>
        <h1>Coupons</h1>
        <Button variant="contained" color="info"
        className='mb-4 mt-3'
        onClick={(e) =>{
          setModal(true)
        }}
         >
            Add Coupon
        </Button>
        {
          modal ? <AddCouponModal open={modal} onClose={()=>setModal(false)}/> : " "
        }
        <CouponTable data={coupons}/>
      </Box>
      </Box>
    </div>
  )
}

export default Coupons