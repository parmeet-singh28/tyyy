import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firbase';
import { useNavigate } from "react-router-dom";

function BookCard(props) {
    const [url, setUrl] = useState("");
    const firebase = useFirebase();
    const navigate = useNavigate();
    useEffect(()=>{
        firebase.getImageURL(props.imgURL).then(url=>setUrl(url));
    }, [])
  return (
    <Card style={{ width: '18rem', margin:'5px' }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This Book has a title {props.name} and this book is Sold by {props.userEmail} and this book costs rs. {props.price}
        </Card.Text>
        <Button variant="primary" onClick={()=> navigate(props.link)}>View</Button>
      </Card.Body>
    </Card>
    
  )
}

export default BookCard
