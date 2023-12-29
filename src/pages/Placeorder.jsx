// import React from 'react'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firbase';
import {useParams,useNavigate} from 'react-router-dom'
function PlaceorderPage() {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const params = useParams();
    // name,
    //   email,
    //   contact,
    //   address,
    //   quantity,
    //   price
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState();
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState("");
    // const [price, setName] = useState("");
    const handelSubmit = async () => {
        await firebase.placeOrder(params.id, name, email, contact, address, quantity).then(navigate("/"))
    }
  return (
    <div className='container mt-5'>
       <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={e=>setName(e.target.value)} value={name} type="text" placeholder="Enter Your Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter Your Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control onChange={e=>setContact(e.target.value)} value={contact} type="number" placeholder="Enter Your Contact Numbe" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control onChange={e=>setAddress(e.target.value)} value={address} type="text" placeholder="Enter Your address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control onChange={e=>setQuantity(e.target.value)} value={quantity} type="number" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Place Order
        </Button>
    </Form>
    </div>
  )
}

export default PlaceorderPage
