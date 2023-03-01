import axios from "axios";
import { ChangeEvent, useState } from "react";
import { IProduct, IProductError } from "../../../../../type/product";
import { decodeJwt } from "../../../utils/decodeJwt";
import { Select } from "../../Select";
import { ButtonGroup } from "../ButtonGroup";
import { InputGroup } from "../InputGroup";

export const AddItemForm = ({ handleClose }: { handleClose: () => void }) => {
  const formInput = ["title", 'description', 'imageurl', 'price', 'quantity'];
  const [data, setData] = useState<IProduct>({ category: 'baby' } as IProduct);
  const [error, setError] = useState<IProductError>({} as IProductError);
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
    setError({} as IProductError);
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
          price: `$ ${data.price}`,
          quantity: data.quantity,
          category: data.category,
        },
        headers: {
          Authorization: `Bearer ${cookieString.split('=')[1]}`,
        }
      })
        .then(() => handleClose())
        .catch(() => {
          setError({} as IProductError);
          setError(prev => ({ ...prev, serverError: 'please try again' }));
        });
    }
    !data.title && setError(prev => ({ ...prev, title: "Plese insert the title value" }));
    !data.price && setError(prev => ({ ...prev, price: "Please insert the price value" }));
    !data.quantity && setError(prev => ({ ...prev, quantity: 2 }));
  }

  return (
    <div className='p-5'>
      <h2 className='border-b'>Add new Item</h2>
      <div className="flex flex-col pt-2 pb-4">
        {formInput.map((input, index) => <InputGroup key={index} input={input} handleChange={handleChange} error={error} defaltValue='' />)}
        <label htmlFor='category'>Category:</label>
        <Select handleCategoryChange={handleCategoryChange} name='category' selected='' />
      </div>
      <ButtonGroup name='Create' submitData={submitData} handleClose={handleClose} />
    </div>
  )
}
