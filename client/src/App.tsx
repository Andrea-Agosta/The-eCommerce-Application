import { useState, useContext, useEffect } from 'react';

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
import Product from './pages/Products';
import ProductID from './pages/ProductID.js';
import axios from 'axios';
import { ICategory } from '../../type/product.js';
import { CategoriesContext } from './context/categories.js';

const addToCart = (productId: string) => {
    console.log("Add " + productId + " From the App")
    //add item to the current Cart
}

const removeFromCart = (productId: string) => {
    console.log("Remove " + productId + " From the App")
    //remove item from the current Cart
}

const getCurrentCart = () => {
    return fakecart;
    //update to get from localstorage
}

const App = () => {
    const [currentCart, setCurrentCart] = useState(getCurrentCart());
    const { categories, setCategories } = useContext(CategoriesContext);

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/product/categories`,
        })
            .then(async response => {
                const categoriesList: string[] = response.data.map((category: ICategory) => category.category);
                setCategories(categoriesList);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="max-w-screen-lg mx-auto bg-white">
            <Router>
                <NavBar />
                <div className="min-h-screen">
                    <Routes>
                        {/* <Route path='/create-new-user' element={<NewUserForm />}></Route>
<Route path='/login' element={<LoginForm />}></Route> */}
                        <Route path='/'
                            // element={<ProductList products={fakeProducts} addToCart={addToCart} />}></Route>
                            element={<Home />}></Route>
                        <Route path='/:category'
                            element={<Product />}></Route>
                        <Route path='/:category/product/:id'
                            element={<ProductID />}></Route>
                        <Route path='/cart'
                            element={< Cart products={currentCart} removeFromCart={removeFromCart} />}></Route>
                        <Route path='/admin' element={< AdminPage />}></Route>
                        <Route path='/admin/super' element={< SuperAdminPage />}></Route>
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;
