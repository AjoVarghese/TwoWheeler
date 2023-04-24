import React from 'react'
import MUIDataTable from "mui-datatables";

function UserTable({userData}) {
    console.log('usrDa',userData);

    const columns = [
        {
            name : "Name",
            label : " UserName",
            options : {
                filter : true,
                sort : true
            }
        },
        {
            name : "Email",
            label : "Email",
            options : {
                filter : true,
                sort : true
            }
        },
        {
            name : "Mobile",
            label : "Mobile No",
            options : {
                filter : true,
                sort : true
            }
        },
        {
            name : "Status",
            label : 'Status',
            options : {
                filter : true,
                sort : true
            }
        },
        {
            name: 'UserId',
            label: 'User Id',
            options: {
              display: false,
            },
          },
          {
            name : 'Action'

          }
      
        
    ]

    const data = Array.isArray(userData) ? userData.map(x => ({
      Name : x.Name,
      Email: x.Email,
      Mobile : x.Mobile,
      Status : x.Status === true ? "Unblocked" : "Blocked",
      UserId: x.UserId,
    })) : []

    const options = {
        filterType: 'checkbox',
        customHeadLabelStyle: {
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            const userId = userData[tableMeta.rowIndex].UserId;
            // if (tableMeta.columnData.name === 'Status') {
            //   const isBlocked = value === 'Blocked';
            // //   const blockButton = (
            // //     <button onClick={() => handleBlockClick(userId)}>
            // //       {isBlocked ? 'Unblock' : 'Block'}
            // //     </button>
            // //   );
            //   return <div style={{ textAlign: 'center' }}>{blockButton}</div>;
            // }
            return <div style={{ textAlign: 'center' }}>{value}</div>;
          },
        };
      

  return (
    <div>
      <MUIDataTable
        title={"Sales Data"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  )
}

export default UserTable