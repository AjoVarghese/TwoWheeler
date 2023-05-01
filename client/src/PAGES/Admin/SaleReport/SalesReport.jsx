import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { salesReportAction } from "../../../redux/Actions/ADMIN_ACTIONS/salesReportAction";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import AdminSideBar from "../../../components/NAVBAR/AdminSideBar";
import PropTypes from "prop-types";
import AllReport from "../../../components/SalesReport/AllReport";
import WeeklyReport from "../../../components/SalesReport/WeeklyReport";
import MonthlyReport from "../../../components/SalesReport/MonthlyReport";
import YearlyReport from "../../../components/SalesReport/YearlyReport";

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

function SalesReport() {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(salesReportAction());
  }, []);

  const salesData = useSelector(
    (state) => state.salesReportReducer.salesReportData
  );

  const labelStyles = {
    fontWeight: "bold",
    fontSize: "16px",
  };

  const cellStyles = {
    textAlign: "center",
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminSideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <h1>Sales Report</h1>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
              >
                <Tab label="All" />
                <Tab label="Weekly Report" />
                <Tab label="Monthly Report" />
                <Tab label="Yearly Report" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              
                <AllReport salesData={salesData} />
             
            </TabPanel>
            <TabPanel value={value} index={1}>
             
                <WeeklyReport salesData={salesData} />
             
            </TabPanel>
            <TabPanel value={value} index={2}>
             
                <MonthlyReport salesData={salesData} />
              
            </TabPanel>
            <TabPanel value={value} index={3}>
              
              <YearlyReport salesData={salesData} />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default SalesReport;
