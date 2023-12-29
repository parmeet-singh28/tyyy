import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firbase';
import Button from 'react-bootstrap/Button';
import PlaceorderPage from './Placeorder';
import Form from 'react-bootstrap/Form';
function BookDetailPage() { 
    const navigate = useNavigate();
    const params = useParams();
    const firebase = useFirebase();
    const [data, setData] = useState(null);
    const [url, setUrl] = useState("");
    const [quantity, setQuantity] = useState(1);
    useEffect(()=>{
        firebase.getBookById(params.bookId).then(value=>setData(value))
    }, [])

    if(data == null){
        return (
            <h1>Loading...</h1>
        )
    }
    if(data){
        firebase.getImageURL(data.imgURL).then(url=>setUrl(url));
    }
    const placeOrder = async () => {
        if(!firebase.isLoggedIn){
            alert("Please Login")
            return
        }
        const res = await firebase.placeOrder(params.bookId, quantity)
        console.log("order placed", res)
    }
  return (
    // data.map(data=><li></li>)
    <div className='container mt-5'>
       {/* console.log(data); */}
        <h2>Name:- {data.name}</h2>
        <img src={url} alt="Loading" />
        <h2>Price:- {data.price}</h2>
        <h2>ISBN Number:- {data.isbnNumber}</h2>
        <h2>Email:- {data.userEmail}</h2>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control onChange={e=>setQuantity(e.target.value)} value={quantity} type="number" placeholder="Enter Quantity" />
        </Form.Group>
        <Button onClick={placeOrder} variant='success'>Buy Now</Button>
    </div>
  )
}

export default BookDetailPage
