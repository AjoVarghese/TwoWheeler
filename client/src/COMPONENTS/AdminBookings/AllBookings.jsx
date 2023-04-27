import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Figure } from 'react-bootstrap';



export default function AllBookings({data}) {
    console.log("DATAA",data);
  return (
    <TableContainer component={Paper}
    sx={{
      height: 600   
    }} 
    >
      <Table
          sx={{
            height: "max-content"
          }}
      
      >
        <TableHead
         sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#fff"
        }}
        >
          <TableRow>
            <TableCell>Sl.No</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Bike Model</TableCell>
            <TableCell align="center">Starting Time</TableCell>
            <TableCell align="center">Ending Time</TableCell>
            <TableCell align="center">Total Hours</TableCell>
            <TableCell align="center">Total Amount</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? data.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="center">
              <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="llll"
                    src={row.photo[0]}
                  />
                <Figure.Caption>
      
        </Figure.Caption>
        </Figure>
              </TableCell>
              <TableCell align="center">{row.bikeName}</TableCell>
              <TableCell align="center">{row.bikeModel}</TableCell>
              <TableCell align="center">{row.startingTime}</TableCell>
              <TableCell align="center">{row.endingTime}</TableCell>
              <TableCell align="center">{row.totalHours}</TableCell>
              <TableCell align="center">Rs.{row.totalAmount}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          )) : "no data"
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';


  // { id: 'name', label: 'Name', minWidth: 170 },
  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
// ];



// export default function AllBookings({data}) {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const columns = [
//     {
//       id : 'image', label : 'Image' , minWidth: 170 
//     },
//     {
//       id : 'bikeName', label : 'Bike Name' , minWidth: 170 
//     },
//     {
//       id : 'bikeModel' , label : 'Bike Model' , minWidth: 170 
//     },
//     {
//       id : 'startTime' , label : 'Starting Time' , minWidth: 170 
//     },
//     {
//       id : 'endTime' , label : 'Ending Time' , minWidth: 170 
//     },
//     {
//       id : 'totalHours' , label : 'Total Hours' , minWidth: 170 
//     },
//     {
//       id : 'totalAmount' , label : 'Total Amount' , minwidth : 170
//     },
//     {
//       id : 'status' , label : 'Status' , minWidth: 170 
//     }
//   ]  


//   function createData(image,bikeName,bikeModel,startTime,endTime,totalHours,totalAmount,status) {
//     // const density = population / size;
//     return { image,bikeName,bikeModel,startTime,endTime,totalHours,totalAmount,status };
//   }
  
//   const rows = [
//      data ? data.map((booking) => {
//       console.log(booking);
//       return createData(
//         booking.photo[0],
//         booking.bikeName,
//         booking.bikeModel,
//         booking.startingTime,
//         booking.endingTime,
//         booking.totalHours,
//         booking.totalAmount,
//         booking.status
//       )
//      }) : []
  
//   ];

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
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
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
