import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { CartItemsContestProvider } from './context/cart';
import { CategoriesContestProvider } from './context/categories';
import { ProductContestProvider } from './context/product';
import { UserContestProvider } from './context/user';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContestProvider>
      <CategoriesContestProvider>
        <ProductContestProvider>
          <CartItemsContestProvider>
            <App />
          </CartItemsContestProvider>
        </ProductContestProvider>
      </CategoriesContestProvider>
    </UserContestProvider>
  </React.StrictMode >,
)
