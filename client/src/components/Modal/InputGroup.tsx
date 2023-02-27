import { ChangeEvent } from "react";

interface IPropsInputGroup {
  input: string,
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const InputGroup = ({ input, handleChange }: IPropsInputGroup) => {
  const inputStyle: string = "border p-2 rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none";
  return (
    <>
      <label htmlFor={input}>{input}:</label>
      <input placeholder={input} id={input} type={(input === 'price' || input === 'quantity') ? "number" : "text"} className={inputStyle} onChange={handleChange} />
      {/* {error.email && <p className="text-red-500 text-xs mb-4">*please insert correct {error.email} </p>} */}
    </>
  )
}