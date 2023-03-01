import { ChangeEvent } from "react";
import { IProductError } from "../../../../type/product";
import { IRegistrationUser } from "../../../../type/user";

interface IPropsInputGroup {
  input: string,
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  error: IProductError | IRegistrationUser;
  defaltValue: string;
}

export const InputGroup = ({ input, handleChange, error, defaltValue }: IPropsInputGroup) => {
  const inputStyle: string = "border p-2 rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none";
  return (
    <>
      <label htmlFor={input}>{input === 'confirmed_password' ? 'confirm password' : input}:</label>
      <input
        placeholder={input === 'confirmed_password' ? 'confirm password' : input}
        id={input}
        type={(input === 'price' || input === 'quantity') ? "number" : (input === 'password' || input === 'confirmed_password') ? 'password' : 'text'}
        className={inputStyle}
        onChange={handleChange}
        defaultValue={defaltValue}
      />
      {error[input] && <p className="text-red-500 text-xs mb-4">*{error[input] === 2 ? "Please insert the quantity value" : error[input]} </p>}
    </>
  )
}