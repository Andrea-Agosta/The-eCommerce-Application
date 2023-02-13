
function LoginForm() {
  return (
    <div className="flex flex-col p-5">
      <label htmlFor="email_input">Email:</label>
      <input placeholder={"email"} id={"email_input"} className="border p-2 rounded-lg my-1" />
      <p className="text-red-500 text-xs mb-4">*please insert value</p>
      <label htmlFor="password_input">Password:</label>
      <input placeholder={"password"} id={"password_input"} className="border p-2 rounded-lg my-1" />
      <p className="text-red-500 text-xs">*please insert value</p>
    </div>
  )
}

export default LoginForm;