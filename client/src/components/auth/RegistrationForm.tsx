
function NewUserForm() {
  const inputStyle = 'p-2 border rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none';
  const errorStyle = 'text-red-500 text-xs mb-2';

  return (
    <div className="flex flex-col p-3">
      <label htmlFor="email_input">Email:</label>
      <input className={inputStyle} placeholder={"email"} id={"email_input"} />
      <p className={errorStyle}>*please insert value</p>
      <label htmlFor="password_input">Password:</label>
      <input className={inputStyle} placeholder={"password"} id={"password_input"} />
      <p className={errorStyle}>*please insert value</p>
      <label htmlFor="confirmed_password_input">Confirm password:</label>
      <input className={inputStyle} placeholder={"confirm password"} id={"confirmed_password_input"} />
      <p className={errorStyle}>*please insert value</p>
      <label htmlFor="type_input">Type of User:</label>
      <select className={inputStyle} placeholder={"user"} id={"type_input"}>
        <option value={"user"}>User</option>
        <option value={"admin"}>Admin</option>
      </select>
    </div>
  )
}

export default NewUserForm;