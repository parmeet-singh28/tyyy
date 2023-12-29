import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firbase';
import {useNavigate} from 'react-router-dom'

function RegisterPage() {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handelSubmit = (e) =>{
        e.preventDefault();
        firebase.signUpWithEmailAndPassord(email, password)
    }
    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate("/")
        }
    },[firebase])
  return (
    <div className='container mt-5'>
       <Form onSubmit={handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Create Account
        </Button>
    </Form>
    <h2 className='mt-3 mb-3'>OR</h2>
    <Button onClick={firebase.signupWihGoogle} variant='danger'>Signup With Google</Button>
    </div>
  )
}

export default RegisterPage
