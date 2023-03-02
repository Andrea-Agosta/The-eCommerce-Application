interface IButtonGroup {
  handleClose(): void;
  submitData(): void;
  name: string;
}

export const ButtonGroup = ({ handleClose, submitData, name }: IButtonGroup) => {
  const deleteButtonStyle: string = "inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm";
  const submitButtonStyle: string = "inline-flex w-full justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"

  return (
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        type="button"
        className={(name === 'Delete Item' || name === 'Delete Store') ? deleteButtonStyle : submitButtonStyle}
        onClick={() => submitData()}
      > {name} </button>
      <button
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={handleClose}
      >
        Cancel
      </button>
    </div>
  )
}
