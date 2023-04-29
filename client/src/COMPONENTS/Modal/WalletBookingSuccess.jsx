import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { Box } from '@mui/material';



function WalletBookingSuccess({open,onClose,message}) {
  console.log("MODAL MESSAGE",message);
  return (
    <div>
        <BasicModal
           open={open}
           onClose={onClose}
           title = "Wallet Booking"
           content={
            <Box>
                <h3>
                 {message}
                </h3>
            </Box>
           }
        />
    </div>
  )
}

export default WalletBookingSuccess