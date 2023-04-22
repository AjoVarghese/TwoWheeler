import React, { useState } from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';

export default function Paginator() {

  return (
    <nav aria-label='Page navigation example'>
      <MDBPagination className='mb-0'>
        
              <MDBPaginationItem>
            <MDBPaginationLink  aria-label='Previous'
            >
              <span aria-hidden='true'>« Prev</span>
            </MDBPaginationLink>
          </MDBPaginationItem>
         <MDBPaginationItem>
            <MDBPaginationLink  aria-label='Next'
           
            >
              <span aria-hidden='true'>Next »</span>
            </MDBPaginationLink>
          </MDBPaginationItem> 
        
        
      </MDBPagination>
    </nav>
  );
}