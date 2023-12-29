import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firbase'
import BookCard from '../components/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function HomePage() {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        firebase.listAllBooks().then(books=>setBooks(books.docs));
    },[])
  return (

      <div className='container mt-5'>
            <Row xs={1} md={3} className="g-4">
               {books.map((book, idx) => (
                <Col key={idx}>
                  <BookCard
                    name={book.data().name}
                            userEmail={book.data().userEmail}
                            price={book.data().price}
                            imgURL={book.data().imgURL}
                            id={book.id}
                            link={`/book/view/${book.id}`}
                  />
                </Col>
              ))}
            </Row>
    </div>
  )
}

export default HomePage
