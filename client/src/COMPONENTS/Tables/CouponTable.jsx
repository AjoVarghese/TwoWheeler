import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState } from 'react';
import EditCouponModal from '../Modal/EditCouponModal';
import DeleteCouponModal from '../Modal/DeleteCouponModal';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CouponTable({data}) {
  const [editModal,setEditModal] = React.useState(false)
  const [deleteModal,setDeleteModal] = useState(false)
  const [selected,setSelected]  = useState('')
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl.No</StyledTableCell>
            <StyledTableCell align="center">Coupon Name</StyledTableCell>
            <StyledTableCell align="center">Coupon Code</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        {
          editModal ? <EditCouponModal couponId={selected} open={editModal} onClose={() =>setEditModal(false)}/> : ""
        }

        {
          deleteModal ? <DeleteCouponModal couponId={selected} open={deleteModal} onClose={() =>setDeleteModal(false)}/> : ""
        }

        <TableBody>
         {
          data ? data.map((row,i) => {
              return(
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.couponName}</StyledTableCell>
                <StyledTableCell align="center">{row.couponCode}</StyledTableCell>
                <StyledTableCell align="center">
                <Button variant="contained" color="info"
                  onClick={(e) => {
                    setEditModal(true)
                    setSelected(row._id)

                  }}
                >
                  Edit
                </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                <Button variant="contained" color="error"
                onClick={(e) => {
                  setDeleteModal(true)
                  setSelected(row._id)
                }}
                >
                  Delete
                </Button>
                </StyledTableCell>
              </StyledTableRow>
              )
          }) : "no data available"
         }
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
