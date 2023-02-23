import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Products';
import ProductID from './pages/ProductID';
import axios from 'axios';
import { ICategory } from '../../type/product';
import { CategoriesContext } from './context/categories';
import { CartItemsContext } from './context/cart';
import { decodeJwt } from './utils/decodeJwt';
import { UserContext } from './context/user';
import PrivateRoutes from './utils/privateRoute';


const App = () => {
    const { categories, setCategories } = useContext(CategoriesContext);
    const { cartItems, setCartItems } = useContext(CartItemsContext);
    const { setUser } = useContext(UserContext);
    const cookieString = document.cookie;

    useEffect(() => {
        if (cookieString) {
            const data = decodeJwt(cookieString);
            setUser(data);
        }
        axios({
            method: 'get',
            url: `http://localhost:8080/api/product/categories`,
        })
            .then(async response => {
                const categoriesList: string[] = response.data.map((category: ICategory) => category.category);
                setCategories(categoriesList);
            })
            .catch(err => console.log(err));

        const cart = localStorage.getItem('cart');
        if (cart !== null) {
            const items = JSON.parse(cart);
            setCartItems(items);
        }
    }, []);

    return (
        <div className="max-w-screen-lg mx-auto bg-white">
            <Router>
                <NavBar />
                <div className="min-h-screen">
                    <Routes>
                        <Route element={<PrivateRoutes />}>

                            {/* <Route path='/create-new-user' element={<NewUserForm />}></Route>
<Route path='/login' element={<LoginForm />}></Route> */}
                            <Route path='/'
                                // element={<ProductList products={fakeProducts} addToCart={addToCart} />}></Route>
                                element={<Home />}></Route>
                            <Route path='/:category'
                                element={<Product />}></Route>
                            <Route path='/:category/product/:id'
                                element={<ProductID />}></Route>
                            {/* <Route path='/cart'
                            element={< Cart products={currentCart} removeFromCart={removeFromCart} />}></Route>
                        <Route path='/admin' element={< AdminPage />}></Route>
                        <Route path='/admin/super' element={< SuperAdminPage />}></Route> */}
                        </Route>

                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;
