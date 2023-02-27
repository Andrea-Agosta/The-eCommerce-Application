import axios from "axios";
import { ChangeEvent, useState } from "react";
import { IProduct } from "../../../../../type/product";
import { decodeJwt } from "../../../utils/decodeJwt";
import { Select } from "../../Select";
import { InputGroup } from "../InputGroup";

interface ICloseModal {
  handleClose: () => void;
}

export const AddItemForm = ({ handleClose }: ICloseModal) => {
  const formInput = ["title", 'description', 'imageurl', 'price', 'quantity'];
  const [data, setData] = useState<IProduct>({ category: 'baby' } as IProduct);
  const cookieString = document.cookie;
  const cookieInfo = decodeJwt(cookieString);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, id } = event.currentTarget;
    setData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = event.currentTarget;
    setData(prev => ({ ...prev, [id]: value }));
  };

  const submitData = () => {
    if (data.title && data.price && data.quantity && data.category) {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/product',
        data: {
          role: cookieInfo.user.role,
          title: data.title,
          description: data.description,
          imageurl: data.imageurl,
          storeId: cookieInfo.user.storeId,
          price: data.price,
          quantity: data.quantity,
          category: data.category,
        },
        headers: {
          Authorization: `Bearer ${cookieString.split('=')[1]}`,
        }
      }).then((response) => {
        console.log(response);
        handleClose();
      }).catch((err) => {
        console.log(err)
        // setError({} as IRegistrationUser);
        // setError(prev => ({ ...prev, userNotFound: "User Not Found" }));
      });
    }
    // !emailRegex.test(login.email) && setError(prev => ({ ...prev, email: "Email" }));
    // !login.password && setError(prev => ({ ...prev, password: "Password" }));
  }

  return (
    <div className='p-5'>
      <h2 className='border-b'>Add new Item</h2>
      <div className="flex flex-col pt-2 pb-0">
        {formInput.map((input, index) => <InputGroup key={index} input={input} handleChange={handleChange} />)}
        <label htmlFor='category'>Category:</label>
        <Select handleCategoryChange={handleCategoryChange} name='category' />
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => submitData}
        > create </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleClose}
        > Cancel </button>
      </div>
    </div>

  )
}
