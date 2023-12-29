import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firbase';

function ListingPage() {
    const firebase = useFirebase();
    const [name, setName] = useState("")
    const [isbnNumber, setIsbnNumber] = useState("")
    const [price, setPrice] = useState("")
    const [coverPic, setcoverPic] = useState("")

    const handelSubmit = async (e) => {
        // taki page reload na ho jae
        e.preventDefault();
        await firebase.handelCreateNewListing(name, isbnNumber, price, coverPic);
    }
  return (
      <div className='container mt-5'>
       <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book Name</Form.Label>
            <Form.Control onChange={e=>setName(e.target.value)} value={name} type="text" placeholder="Enter Book Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN Number</Form.Label>
            <Form.Control onChange={e=>setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="Enter ISBN Number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control onChange={e=>setPrice(e.target.value)} value={price} type="text" placeholder="Enter Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cover Pic</Form.Label>
            <Form.Control onChange={e=>setcoverPic(e.target.files[0])} type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Create
        </Button>
    </Form>
    </div>
  )
}

export default ListingPage
