export const CheckoutPayment = () => {
  return (
    <form className="mx-auto p-5 bg-white rounded-lg shadow-md m-10 flex flex-col">
      <h2 className="text-xl font-bold mb-5">Payment Information</h2>
      <div className="mb-5">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2"> Name on Card </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          className="w-full px-3 py-2 text-gray-700 border rounded"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">Card Number</label>
        <input
          type="number"
          id="cardNumber"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          className="w-full px-3 py-2 text-gray-700 border rounded"
        />
      </div>
      <div className="flex justify-between">
        <div className="w-1/3 mr-3">
          <label htmlFor="expDate" className="block text-gray-700 font-bold mb-2"> Expiration Date</label>
          <input
            type="text"
            id="expDate"
            name="expDate"
            placeholder="MM/YY"
            className="w-full px-3 py-2 text-gray-700 border rounded"
          />
        </div>
        <div className="w-1/3 ml-3">
          <label htmlFor="cvc" className="block text-gray-700 font-bold mb-2">CVC</label>
          <input
            type="number"
            id="cvc"
            name="cvc"
            placeholder="123"
            className="w-full px-3 py-2 text-gray-700 border rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white p-2 mt-5 rounded-lg"
      > Proceed to Payment </button>
    </form>
  )
}
