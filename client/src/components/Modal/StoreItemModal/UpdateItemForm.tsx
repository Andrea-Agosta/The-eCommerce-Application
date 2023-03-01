import { ChangeEvent, useState } from 'react';
import { IProduct, IProductError } from '../../../../../type/product';
import { decodeJwt } from '../../../utils/decodeJwt';
import { restCall } from '../../../utils/restCall';
import { Select } from '../../Select'
import { ButtonGroup } from '../ButtonGroup'
import { InputGroup } from '../InputGroup';

export const UpdateItemForm = ({ handleClose, product }: { handleClose: () => void, product: IProduct }) => {
  const formInput = ["title", 'description', 'imageurl', 'price', 'quantity'];
  const [data, setData] = useState<IProduct>(product);
  const [error, setError] = useState<IProductError>({} as IProductError);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, id } = event.currentTarget;
    setData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = event.currentTarget;
    setData(prev => ({ ...prev, [id]: value }));
  };

  const submitData = () => {
    const cookieString = document.cookie;
    const cookieInfo = decodeJwt(cookieString);
    setError({} as IProductError);
    if (JSON.stringify(data) !== JSON.stringify(product) && data.title && data.price && data.quantity && data.category) {
      const headers = { Authorization: `Bearer ${cookieString.split('=')[1]}` }
      const dataBody = { ...data, role: cookieInfo.user.role, price: `$ ${data.price}` }
      restCall('patch', `product/${product.id} `, dataBody, headers)
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
      <h2 className='border-b'>Update Item</h2>
      <div className="flex flex-col pt-2 pb-4">
        {formInput.map((input, index) => <InputGroup
          key={index}
          input={input}
          handleChange={handleChange}
          error={error}
          defaltValue={input === 'price' ? product[input].split(' ')[1] : product[input]}
        />)}
        <label htmlFor='category'>Category:</label>
        <Select handleCategoryChange={handleCategoryChange} name='category' selected={product.category} />
      </div>
      <ButtonGroup name='Update' submitData={submitData} handleClose={handleClose} />
    </div>
  )
}
