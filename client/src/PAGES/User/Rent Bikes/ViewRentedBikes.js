import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../COMPONENTS/NAVBAR/Navbar'
import { getAccepted, getAcceptedDataAction, getPending, getPendingDataAction, getRejected, getRejectedDataAction, getRentedBikesAction } from '../../../REDUX/Actions/USER_ACTIONS/getRentedBikes'
import Figure from 'react-bootstrap/Figure';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ViewRentedBikes() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const dispatch = useDispatch()

    const getAll = () => {
      getRentedBikesAction()
    }

    // const getRejectedData = () => {
    //   console.log("getAccepted");
    //    dispatch(getRejected())
    // }

    // const getPendingData = () => {
    //   console.log("getRejected Data");
    //   dispatch(getPending())
    // }

    const getAcceptedData = () =>{
      dispatch(getAcceptedDataAction())
    }

    const getRejectedData = () => {
      dispatch(getRejectedDataAction())
    }

    const getPendingData = () => {
      dispatch(getPendingDataAction())
    }


    useEffect(() => {
        dispatch(getRentedBikesAction())
        
    },[dispatch])

    const rentedBikes = useSelector((state) => state.getRentedBikesReducer.rentedBikesData)
    console.log("Rented Bikes",rentedBikes);

    const rejected = useSelector((state) => state.getRejectedDataReducer.rejectedData)
    console.log("REJECTED",rejected);

    const pending = useSelector((state) => state.getPendingDataReducer.pendingData)
    console.log("PENDING",pending);

    const accepted = useSelector((state) => state.getAcceptedDataReducer.acceptedData)
    console.log("ACCEPTEDDD",accepted);
    // const accepted = useSelector((state) => state.getRentedBikesReducer.acceptedData)
    // console.log("Accepted",accepted);
  return (
    <>
    <Navbar/>
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2} className='mt-3'>
        <Item><h3>Rented Bikes</h3></Item>
        {/* <Item>Item 2</Item>
        <Item>Item 3</Item> */}
      </Stack>
    </Box>

    <Box sx={{ width: '100%' }} className='mt-3 container'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="All "  onClick={getAll}/>
          
          <Tab label="Accepted Requests" onClick={getAcceptedData} ></Tab>
          <Tab label="Pending Requests"  onClick={getPendingData}/>
          <Tab label="Rejected Requests" onClick={getRejectedData } />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell align="center">Sl No</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Status</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          {
            rentedBikes ? rentedBikes.map((x,i) => {
              return(
                <TableRow
              key={i+1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                {i+1}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {x.vehicleName}
              </TableCell>
              <TableCell align="center">
              <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={x.Photo[0]}
                  />
                <Figure.Caption>
        {/* Nulla vitae elit libero, a pharetra augue mollis interdum. */}
        </Figure.Caption>
        </Figure>
              </TableCell>
              <TableCell align="center">{x.Brand}</TableCell>
              <TableCell align="center">{x.Status}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
              )
            }) : "No Data Available..."
          }
            
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>


      <TabPanel value={value} index={1}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>Sl No</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Status</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          {
            accepted? accepted.map((x,i) => {
              return(
                <TableRow
              key={i+1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               <TableCell component="th" scope="row" align="center">
                {i+1}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {x.vehicleName}
              </TableCell>
              <TableCell align="center">
              <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={x.Photo[0]}
                  />
                <Figure.Caption>
        {/* Nulla vitae elit libero, a pharetra augue mollis interdum. */}
        </Figure.Caption>
        </Figure>
              </TableCell>
              <TableCell align="center">{x.Brand}</TableCell>
              <TableCell align="center">{x.Status}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
              )
            }) : "No Data Available..."
          }
            
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>


      <TabPanel value={value} index={2}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>Sl No</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Status</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          {
            pending ? pending.map((x,i) => {
              return(
                <TableRow
              key={i+1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               <TableCell component="th" scope="row" align="center">
                {i+1}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {x.vehicleName}
              </TableCell>
              <TableCell align="center">
              <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={x.Photo[0]}
                  />
                <Figure.Caption>
        {/* Nulla vitae elit libero, a pharetra augue mollis interdum. */}
        </Figure.Caption>
        </Figure>
              </TableCell>
              <TableCell align="center">{x.Brand}</TableCell>
              <TableCell align="center">{x.Status}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
              )
            }) : "No Data Available..."
          }
            
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl No</TableCell>
            <TableCell align="center">Bike Name</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Status</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          {
            rejected ? rejected.map((x,i) => {
              return(
                <TableRow
              key={i+1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell component="th" scope="row" align="center">
                {i+1}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {x.vehicleName}
              </TableCell>
              <TableCell align="center">
              <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={x.Photo[0]}
                  />
                <Figure.Caption>
        {/* Nulla vitae elit libero, a pharetra augue mollis interdum. */}
      </Figure.Caption>
    </Figure>
              </TableCell>
              <TableCell align="center">{x.Brand}</TableCell>
              <TableCell align="center">{x.Status}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
              )
            }) : "No Data Available..."
          }
            
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
    </Box>
    </>
  )
}

export default ViewRentedBikes