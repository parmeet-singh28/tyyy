import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login';
import MyNavBar from './components/Navbar';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Detail';
// import PlaceorderPage from './pages/Placeorder';
import OrdersPage from './pages/Vieworder';
import ViewOrderDetails from './pages/ViewOrderDetail';

function App() {
  return (
    <div>
      <MyNavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/book/list" element={<ListingPage/>}/>
        <Route path="/book/view/:bookId" element={<BookDetailPage/>}/>
        {/* <Route path="/placeorder/:id" element={<PlaceorderPage/>}/> */}
        <Route path="/book/orders" element={<OrdersPage/>}/>
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
