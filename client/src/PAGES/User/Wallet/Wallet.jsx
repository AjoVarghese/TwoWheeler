import React, { useEffect } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box, Button, Card, CardActions, CardContent, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Wallet() {
  const location = useLocation()
  let data = location.state.wallet.walletHistory

  if (!data || data.length === 0) {
    return <h4>No data available</h4>;
  }

  return (
    <>
    <Navbar/>
    <Box sx={{ width: '100%' }}>
        <Stack spacing={2} className='mt-3'>
        <Item><h3>Wallet History</h3></Item>
      </Stack>
        </Box>

        <Box sx={{ width: '100%' }}>
        <TableContainer component={Paper} 
        className='container mt-5'
        sx={{
          height: 350
        }} 
        >
      <Table  sx={{
            height: "max-content"
          }}
          aria-label="customized table">
        <TableHead
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#fff"
        }}
        >
          <TableRow>
            <StyledTableCell>Sl.No</StyledTableCell>
            <StyledTableCell align="center">Transactions</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data ? data.map((row,i) => {
              return (
                <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Type}</StyledTableCell>
              {
                row.amountAdded ? 
                <StyledTableCell align="center" style={{color:'green'}}>+ Rs.{row.amountAdded}</StyledTableCell> :
                <StyledTableCell align="center" style={{color:'red'}}>- Rs.{row.amountDeducted}</StyledTableCell>
              }
              
              <StyledTableCell align="center">{row.Date}</StyledTableCell>
             
            </StyledTableRow>
              )
            }) : <h4>No data available</h4>
          }
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    </>
  )
}

export default Wallet