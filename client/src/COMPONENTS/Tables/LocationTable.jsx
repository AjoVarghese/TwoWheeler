import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import EditLocationModal from '../Modal/EditLocationModal';
import DeleteLocationModal from '../Modal/DeleteLocationModal';
import { useEffect } from 'react';
import { getLocation } from '../../redux/Actions/ADMIN_ACTIONS/locationActions';

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

function LocationTable({data}) {
    const [editModal,setEditModal] = React.useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [selected,setSelected]  = useState('')

    useEffect(() => {
      getLocation()
    },[editModal,deleteModal])

    if (!data || data.length === 0) {
        return <h4>No location available</h4>;
      }

      
  return (
    <div className='container mt-2'>
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

        {
          editModal ? <EditLocationModal locationId={selected} open={editModal} onClose={() =>setEditModal(false)}/> : ""
        }

        {
          deleteModal ? <DeleteLocationModal locationId={selected} open={deleteModal} onClose={() =>setDeleteModal(false)}/> : ""
        }

        <TableBody>
         {
          data ? data.map((row,i) => {
              return(
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Location}</StyledTableCell>
                <StyledTableCell align="center">
                <Tooltip title="Edit Details" variant="soft">
                <Button variant="contained" color="info"
                  onClick={(e) => {
                    setEditModal(true)
                    // editLoc(true)
                    setSelected(row._id,row.Location)

                  }}
                >
                  Edit
                </Button>
                </Tooltip>
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
          }) : <h4>No data available</h4>
         }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default LocationTable