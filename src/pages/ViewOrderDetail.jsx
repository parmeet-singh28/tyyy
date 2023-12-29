import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useFirebase } from '../context/Firbase';
function ViewOrderDetails() {
    const params = useParams();
    const firebase = useFirebase();
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        firebase.getOrders(params.bookId).then(orders => setOrders(orders.docs))
    },[])
  return (
    <div className='container mt-3'>
        <h1>Orders</h1>
        <div>
            {orders.map((order, idx)=>{
                const data = order.data();
                // console.log(data)
                return(
                    <div key={idx} className='mt-5' style={{border:"1px solid", padding:"10px"}}>
                        <h5>Ordered by: {data.userEmail}</h5>
                        <h6>Quantity: {data.quantity}</h6>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ViewOrderDetails
