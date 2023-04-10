// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// export default function BasicPagination({pageLimit,pageNo}) {
//   console.log(pageLimit,pageNo);
//   React.useEffect(() => {
   
//   })
//   const handleChangePage = () => {
//     console.log('dsdsd');
//   }
//   return (
//     <Stack spacing={2}>
//       <Pagination count={10} variant="outlined" 
//       onChange={handleChangePage}
//       />
//     </Stack>
//   );
// }

import React, { useState } from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';

export default function BasicPagination({pageLimit,pageNo}) {

  const [selectedPage,setSelectedPage] = useState(1)
  console.log("rrrrrrrr",pageLimit,pageNo);
  pageNo(selectedPage)
  return (
    <nav aria-label='Page navigation example'>
      <MDBPagination className='mb-0'>
        <MDBPaginationItem>
          <MDBPaginationLink 
          value={1}
          onClick={(e) => 
            setSelectedPage(e.target.value)
          }
          >Previous</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink
          value={2}
          onClick={(e) => 
            setSelectedPage(e.target.value)
          }
           >1</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink 
          onClick={(e) => 
            setSelectedPage(e.target.value)
          }
          >2</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink 
          >3</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink 
         onClick={(e) => 
          setSelectedPage(e.target.value)
        }
          >Next</MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
      {/* <div>
        <label htmlFor="pageLimit">Page Limit:</label>
        <input id="pageLimit" type="number" value={pageLimit} />
      </div> */}
    </nav>
  );
}