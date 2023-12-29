import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firbase';
const MyNavBar = () => {
  const firebase = useFirebase();
  // const [l, sl] = useState(false)
  // useEffect(()=>{
  //   sl(firebase.isLoggedIn);
  // },[firebase.isLoggedIn]);
  // if(1===1){
    // }
    if(firebase.isLoggedIn){
      return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
          </Nav>
          <Button variant="danger" onClick={firebase.signoutUser}>Signout</Button>;
        </Container>
      </Navbar>
    )
  }
  else{
    return(
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )

  }
}
export default MyNavBar