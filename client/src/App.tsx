// import './App.css';
import { useState } from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import { fakeProducts } from './fakedata/Fakedata.js';
import { fakecart } from './fakedata/fakecart.js';
import NavBar from './components/Navbar';
import Cart from './components/checkout/Cart.jsx';
import AdminPage from "./admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from './components/Products/ProductList.jsx';
import LoginForm from './components/auth/LoginForm.js';
import NewUserForm from './components/auth/RegistrationForm.js';
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import { Footer } from './components/Footer';
import Home from './pages/Home.js';
import { ProductContestProvider } from './context/product.js';
import { CategoriesContestProvider } from './context/categories.js';

function addToCart(productId: string) {
    console.log("Add " + productId + " From the App")
    //add item to the current Cart
}

function removeFromCart(productId: string) {
    console.log("Remove " + productId + " From the App")
    //remove item from the current Cart
}

function getCurrentCart() {
    return fakecart;
    //update to get from localstorage
}


function App() {
    const [currentCart, setCurrentCart] = useState(getCurrentCart());
    return (
        <div className="App">
            <Router>
                <NavBar />
                <div className="min-h-screen">
                    <ProductContestProvider>
                        <CategoriesContestProvider>
                            <Routes>
                                {/* <Route path='/create-new-user' element={<NewUserForm />}></Route>
                    <Route path='/login' element={<LoginForm />}></Route> */}
                                <Route path='/'
                                    // element={<ProductList products={fakeProducts} addToCart={addToCart} />}></Route>
                                    element={<Home />}></Route>
                                <Route path='/cart'
                                    element={< Cart products={currentCart} removeFromCart={removeFromCart} />}></Route>
                                <Route path='/admin' element={< AdminPage />}></Route>
                                <Route path='/admin/super' element={< SuperAdminPage />}></Route>
                            </Routes>
                        </CategoriesContestProvider>
                    </ProductContestProvider>
                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;
