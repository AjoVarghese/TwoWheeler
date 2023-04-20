import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { salesReportAction } from '../../../redux/Actions/ADMIN_ACTIONS/salesReportAction'

function SalesReport() {
  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(salesReportAction())
    },[])

    const salesData = useSelector((state) => state.salesReportReducer.salesReportData)
    console.log('saleSData',salesData);
  return (
    <div>SalesReport</div>
  )
}

export default SalesReport