import { useContext } from 'react'
import { CartItemsContext } from '../../context/cart';

export const CheckoutSummary = () => {
  const { cartItems } = useContext(CartItemsContext);

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.total.slice(2)), 0);
  const taxPrice = (totalPrice * 0.1).toFixed(2);
  const shippingPrice = (totalPrice > 20 ? 0 : 10).toFixed(2);
  const grandTotalPrice = (Number(totalPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Order Items</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={item.product.imageurl} alt={item.product.title} />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{item.product.title}</div>
                      <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{item.total}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h2>
        <div className="bg-white shadow sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {/* //todo with react component */}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                <dd className="mt-1 text-sm text-gray-900">${totalPrice}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Tax</dt>
                <dd className="mt-1 text-sm text-gray-900">${taxPrice}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Shipping</dt>
                <dd className="mt-1 text-sm text-gray-900">${shippingPrice}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-lg font-medium text-gray-900">Total</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">${grandTotalPrice}</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
    </section>
  )
}
