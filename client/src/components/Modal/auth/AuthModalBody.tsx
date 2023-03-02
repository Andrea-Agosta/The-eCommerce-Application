import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

interface IAuthModalBody {
  handleClose: () => void;
  buttonClick(event: React.MouseEvent<HTMLButtonElement>): void;
  isRegistrationButton: boolean;
}

export const AuthModalBody = ({ handleClose, buttonClick, isRegistrationButton }: IAuthModalBody) => {
  return (
    <div className="bg-white pt-5 sm:p-6 sm:pb-4 px-2 pb-0">
      <div className='flex flex-row'>
        <button
          className={`bg-white  hover:text-orange-400 text:xl w-full py-2 ${isRegistrationButton ? 'text-gray-700 border-b' : 'border border-b-0 rounded-t-lg text-orange-400'}`}
          name="login"
          onClick={buttonClick}
        > Login</button>
        <button
          className={`bg-white hover:text-orange-400 text:xl w-full py-2 ${isRegistrationButton ? 'border border-b-0 rounded-t-lg text-orange-400' : 'border-b  text-gray-700'}`}
          name="registation"
          onClick={buttonClick}
        > Registration </button>
      </div>
      {isRegistrationButton ? <RegistrationForm handleClose={handleClose} /> : <LoginForm handleClose={handleClose} />}
    </div>
  )
}
