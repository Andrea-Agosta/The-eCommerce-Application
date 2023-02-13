
export const Dropdown = () => {
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-[#757575] bg-[#f2f2f2] hover:bg-gray-300 focus:outline-none font-medium rounded-l-lg text-sm px-4 py-2.5 text-center inline-flex items-cente"
        type="button"
      >Catalogue
        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-l-lg shadow w-44">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {
            // !MAPPING THE CATEGORY
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
          }
        </ul>
      </div>
    </>
  )
}