import React from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function BookingGraph({pending,cancelled,onRide,title,rejected,accepted}) {

    const data = {
        labels : [''],
        datasets : [
         {
            label : 'Pending',
            data : [pending],
            backgroundColor : '#EBD060',
            borderColor : 'black',
            borderWidth : 1
         },
         {
            label : 'On-Ride',
            data : [onRide],
            backgroundColor : '#5ADB96',
            borderColor : 'black',
            borderWidth : 1
         },
         {
            label : 'Cancelled',
            data : [cancelled],
            backgroundColor : '#F55E47',
            borderColor : 'black',
            borderWidth : 1
         }
        ]
    }

   

    const options = {

    }

  return (
    <div>
        <h5>{title}</h5>

        <div>
          <Bar
            
            data={data}
            options={options}
          ></Bar>  
        </div>
    </div>
  )
}

export default BookingGraph