import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/NAVBAR/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getBikesAction } from '../../../redux/Actions/USER_ACTIONS/getBikesAction';
// import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { bikeSearchAction } from '../../../redux/Actions/USER_ACTIONS/bikeSearchAction';
import FilterSideBar from '../../../components/FilterSidebar/FilterSideBar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AllAcceptedBIkes from '../../../components/UserBikes/AllAcceptedBIkes';
import PriceAscSortedBikes from '../../../components/UserBikes/PriceAscSortedBikes';
import PriceDescSortedBikes from '../../../components/UserBikes/PriceDescSortedBikes';
import { userGetLocation } from '../../../redux/Actions/USER_ACTIONS/locationActions';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import BasicPagination from '../../../components/Pagination/BasicPagination';
import Paginator from '../../../components/Paginator/Paginator';

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



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function BikePagination() {
   const dispatch = useDispatch()

   const [searchTerm,setSearchTerm] = useState('')
 

   const [value, setValue] = React.useState(0);
   const [state,setState] = useState()
   const [page,setPage] = useState(1)
   const [pageCount,setPageCount] = useState(0)


   const handleChange = (event, newValue) => {
     setValue(newValue);
   };

  const bikes = useSelector((state) => state.bikesReducer)
  const {loading , bikesData , bikesDataError} = bikes

  const location = useSelector((state) => state.userLocationReducer.locationData)
  console.log("LocatioNNNN",location);

  // useEffect(() => {
  //    dispatch(getBikesAction())
  //    dispatch(userGetLocation())
  // },[state])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(bikeSearchAction(searchTerm))
    setSearchTerm('')
  }
  console.log("ddddd",page);

  return (
    
       <>
         <Navbar/>
           <div className='cards mt-5'>
       <div>
    <MDBContainer  className="my-1">
  
    <h2 style={{textAlign:"center"}}>Rent Bikes</h2>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item md={3}>
          <Item>
            <h4>FILTER</h4>
            
            <FilterSideBar loc={location} propState={setState} />
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Item>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item md={7}>
   
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'end', width: '20rem' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Bikes"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }}
       aria-label="search"
       onClick={submitHandler}
      >
        <SearchIcon />
      </IconButton>
      
    </Paper>
  
  </Grid>
  
</Grid>
          <AllAcceptedBIkes/>
    {/* <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Bikes"  />
          <Tab label="Price Low to High"  />
          <Tab label="Price High to Low"  />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

      <AllAcceptedBIkes acceptedBikes={bikesData} 
      selectedLoc = {state}
      setPage={setPage} 
      setPageCount = {setPageCount}/>

      </TabPanel>
      <TabPanel value={value} index={1}>

       <PriceAscSortedBikes priceAsc = {bikesData}/>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <PriceDescSortedBikes priceDesc={bikesData}/>
      </TabPanel>
    </Box> */}
    
          </Item>
          
        </Grid>
      </Grid>
      
    </Box>
    
    </MDBContainer>
    </div>    
    
           </div>
          
       </>   
  
  )
}

export default BikePagination