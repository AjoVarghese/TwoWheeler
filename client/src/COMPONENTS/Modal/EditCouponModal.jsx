import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, styled } from '@mui/material';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { editCoupon } from '../../redux/Actions/ADMIN_ACTIONS/couponActions';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  const schema = yup.object().shape({
    couponName: yup
        .string("Coupon name should be a string")
        .min(3, "Coupon name should hae min length of 5")
        .max(20, 'Coupon name should have max length of 20')
        .required("Coupon name is required"),
   couponCode: yup
        .string("Coupon code should be a string")
        .min(3, "Coupon code should hae min length of 5")
        .max(20, 'Coupon code should have max length of 20')
        .required("Coupon code is required")    
  })

function EditCouponModal({open,onClose,couponId}) {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })
    
    const submitHandler = (data) => {
        console.log(data);
        let couponName = data.couponName
        let couponCode = data.couponCode
        dispatch(editCoupon(couponId,couponName,couponCode))
        onClose()
    }

  return (
    <div>
      <BasicModal
    open={open}
    onClose={onClose}
    title = "Edit Coupon"
    content={
             <Box
                 component="form" onSubmit={handleSubmit(submitHandler)}>
                 <TextField
                     id="outlined-basic"
                     label="Coupon Name"
                     variant="outlined"
                     name='couponName'
                     error={!!errors.couponName}
                     helperText={errors.couponName ? errors.couponName.message : ""}
                     {...register("couponName")}
                     style={{width:"100%"}}
                 /> 
                 <TextField
                 className='mt-3'
                 id="outlined-basic"
                 label="Coupon Code"
                 variant="outlined"
                 name='couponCode'
                 error={!!errors.couponCode}
                 helperText={errors.couponCode ? errors.couponCode.message : ""}
                 {...register("couponCode")}
                 style={{width:"100%"}}
             />

                  <Box sx={{ flexGrow: 1 }} className='mt-3'>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
            <Button
              variant="contained"
              color="error"
              onClick={onClose}
            >
              Cancel
            </Button>
        </Grid>
        <Grid item xs={8}>
          <Button
              variant="contained"
              color="info"
              type='submit'
              >
               Edit
          </Button>
        </Grid>
      </Grid>
    </Box>
             </Box>
         }
    >
    </BasicModal>
    </div>
  )
}

export default EditCouponModal