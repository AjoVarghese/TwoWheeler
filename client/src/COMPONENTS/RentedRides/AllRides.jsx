// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { rentedRidesAction } from '../../redux/Actions/USER_ACTIONS/getRentedRides';

// const columns = [
//   { id: 'sl.no', label: 'Sl.No', minWidth: 170 },
//   { id: 'image', label: 'Image', minWidth: 100 },
//   {
//     id: 'BikeName',
//     label: 'BikeName',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'BikeModel',
//     label: 'BikeModel',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'Starting Time',
//     label: 'Starting Time',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: 'Ending Time',
//     label: 'Ending Time',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: 'Status',
//     label: 'Status',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];


// export default function AllRides() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const dispatch = useDispatch()

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

  // useEffect(() => {
  //   dispatch(rentedRidesAction())
  // },[])

  // const rentedRides = useSelector((state) => state.rentedBikesReducer.rentedRidesData)
  // console.log(rentedRides);

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//             rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {rentedRides ? rentedRides.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     }) : "no data"
//                   }
//                   </TableRow>
//                 );
//               })
//               }
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import Figure from 'react-bootstrap/Figure';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { rentedRidesAction } from '../../redux/Actions/USER_ACTIONS/getRentedRides';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(rentedRidesAction())
  },[])

  const rentedRides = useSelector((state) => state.rentedBikesReducer.rentedRidesData)
  console.log(rentedRides);
  console.log(rentedRides ? rentedRides.photo : "ff");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl.No</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Bike Name</StyledTableCell>
            <StyledTableCell align="center">Bike Model</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Starting Time</StyledTableCell>
            <StyledTableCell align="center">Ending Time</StyledTableCell>
            <StyledTableCell align="center">Total Hours</StyledTableCell>
            <StyledTableCell align="center">Total Amount</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentedRides ? rentedRides.map((row,i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              
              <StyledTableCell align="center">
              <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="llll"
                    src={rentedRides[i].photo}
                  />
                <Figure.Caption>
      
        </Figure.Caption>
        </Figure>
        {/* <img src={rentedRides[i].photo} alt="fedfdfdf" /> */}
              </StyledTableCell>
              <StyledTableCell align="center">{row.bikeName}</StyledTableCell>
              <StyledTableCell align="center">{row.bikeModel}</StyledTableCell>
              <StyledTableCell align="center">{row.location}</StyledTableCell>
              <StyledTableCell align="center">{row.startingTime}</StyledTableCell>
              <StyledTableCell align="center">{row.endingTime}</StyledTableCell>
              <StyledTableCell align="center">{row.totalHours}</StyledTableCell>
              <StyledTableCell align="center">{row.totalAmount}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
            </StyledTableRow>
          )) : "no data"
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
        