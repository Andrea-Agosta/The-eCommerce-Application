import { ChangeEvent } from "react";

interface ICount {
  storage: number | undefined;
  handleAmountChange(event: ChangeEvent<HTMLInputElement>): void;
  rangeValue: number | undefined;
}

export const Count = ({ storage, handleAmountChange, rangeValue }: ICount) => {
  return (
    <div className="flex flex-row">
      <input
        type="range"
        className="mt-5 w-full h-6 p-0 focus:outline-none focus:ring-0 accent-orange-400"
        min="range"
        max={storage}
        step="1"
        defaultValue={rangeValue}
        id="rangeSelect"
        onChange={handleAmountChange}
        data-testid="rangeSelect"
      />
      <p className="mt-2 text-base bg-white px-4 py-2 rounded w-24 text-center" data-testid='quantityOrder'> {rangeValue} pz</p>
    </div>
  )
}
