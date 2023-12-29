import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firbase'
import BookCard from '../components/Card';
function OrdersPage() {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    useEffect( ()=>{
      if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid)?.then(books=>(setBooks(books.docs)))
    },[firebase])
    // console.log(books)
    if(!firebase.isLoggedIn){
      return (
        <h1>Please Login</h1>
      )
    }
  return (
    <div>
      {books.map((book, idx) => <BookCard key={idx} id={book.id} {...book.data()} link={`/books/orders/${book.id}`} />)}
    </div>
  )
}

export default OrdersPage
