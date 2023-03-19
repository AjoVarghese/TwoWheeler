
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './AdminSideBar.css'
function AdminSideBar() {

  return (
    <div>
        <Navbar collapseOnSelect expand="lg"className='nav-custom'>
      <Container>
        <Navbar.Brand className='nav-title'><Link to = '/admin/dashboard' style={{color : 'black' , textDecoration : "none"}}>Two Wheeler</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto sub-menu">
            <Nav.Link  className='ms-4 '><Link to = '/admin/users' style={{color : 'black' , textDecoration : "none"}}>Users</Link></Nav.Link>
            <Nav.Link  className='ms-4 sub-menu'><Link to = '/admin/rent-requests' style={{color : 'black' , textDecoration : "none"}}>Rent Requests</Link></Nav.Link>
            <NavDropdown title="Bikes" id="collasible-nav-dropdown" className='ms-4'>
            <NavDropdown.Item ><Link to = '/admin/view-bikes' style={{color : 'black' , textDecoration : "none"}}>View Bikes</Link></NavDropdown.Item>
            <NavDropdown.Item ><Link to = '/admin/add-bikes' style={{color : 'black' , textDecoration : "none"}}>Add Bikes</Link></NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
             <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to = '/admin/admin-profile' style={{color : 'black' , textDecoration : "none"}}>Profile</Link></NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default AdminSideBar
