import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { CartItemsContestProvider } from './context/cart';
import { CategoriesContestProvider } from './context/categories';
import { ProductContestProvider } from './context/product';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CategoriesContestProvider>
      <ProductContestProvider>
        <CartItemsContestProvider>
          <App />
        </CartItemsContestProvider>
      </ProductContestProvider>
    </CategoriesContestProvider>
  </React.StrictMode >,
)
