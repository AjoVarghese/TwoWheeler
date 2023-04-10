import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { Box, Button, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteCoupon } from '../../redux/Actions/ADMIN_ACTIONS/couponActions'

function DeleteCouponModal({open,onClose,couponId}) {

    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteCoupon(id))
        onClose()
    }
  return (
    <div>
        <BasicModal
    open={open}
    onClose={onClose}
    title = "Are u sure?"
    content={
             <Box>
              <p>Delete coupon</p>
              <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
        </Grid>
        <Grid item xs={8}>
          <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                handleDelete(couponId)
              }}
              >
               Delete
          </Button>
        </Grid>
      </Grid>
             </Box>
         }
    >
    </BasicModal>
    </div>
  )
}

export default DeleteCouponModal