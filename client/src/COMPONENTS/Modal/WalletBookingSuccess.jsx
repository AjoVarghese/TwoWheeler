import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, styled } from '@mui/material';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { editLocation } from '../../redux/Actions/ADMIN_ACTIONS/locationActions';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { addCoupon } from '../../redux/Actions/ADMIN_ACTIONS/couponActions';


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