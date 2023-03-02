export const CheckoutDeliveryInfo = () => {
  const deliveryInfo: string[] = ['Address', 'Postcode', 'City']

  return (
    <section className="mx-auto p-5 bg-white rounded-lg shadow-md m-10 flex flex-col">
      <h2 className="text-xl font-bold mb-5">Delivery Information</h2>
      {deliveryInfo.map((info, index) => <InputGroupDelivery key={index} info={info} />)}
      <div className="mb-5">
        <label htmlFor="textarea" className="block text-gray-700 font-bold mb-2"> More info: </label>
        <textarea
          id="textarea"
          name="name"
          placeholder="John Doe"
          className="w-full px-3 py-2 text-gray-700 border rounded"
        />
      </div>
    </section>
  )
}

const InputGroupDelivery = ({ info }: { info: string }) => {
  return (
    <div className="mb-5">
      <label htmlFor={info} className="block text-gray-700 font-bold mb-2"> {info} </label>
      <input
        type="text"
        id={info}
        name={info}
        placeholder={info}
        className="w-full px-3 py-2 text-gray-700 border rounded"
      />
    </div>
  );
};
