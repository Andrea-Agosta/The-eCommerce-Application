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
import { StoreList } from './pages/StoreList';
import { StoreProducts } from './pages/StoreProducts';
import { Page404 } from './pages/Page404';
import AdminRoutes from './utils/AdminRoutes';
import SuperAdminRoutes from './utils/SuperAdminRoutes';


const App = () => {
    const { setCategories } = useContext(CategoriesContext);
    const { setCartItems } = useContext(CartItemsContext);
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
                        <Route path='/'
                            element={<Home />}></Route>
                        <Route path='/category/:category'
                            element={<Product />}></Route>
                        <Route path='/category/:category/product/:id'
                            element={<ProductID />}></Route>

                        <Route path='/*' element={<Page404 />} ></Route>

                        {/* protected routes */}
                        <Route element={<AdminRoutes />}>
                            <Route path='/admin/store/product'
                                element={<StoreProducts />}></Route>
                        </Route>
                        <Route element={<SuperAdminRoutes />}>
                            <Route path='/admin/store'
                                element={<StoreList />}></Route>
                        </Route>

                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    )
}

export default App;
