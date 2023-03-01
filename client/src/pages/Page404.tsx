import { Link } from 'react-router-dom'
// @ts-ignore
import image404 from '../images/page404.png'

export const Page404 = () => {
  const buttonStyle: string = 'p-3 p-lg-1 px-20 bg-white text-violet-500 hover:text-orange-400 text:xl my-5 mx-3 border-2 rounded-md border-violet-400 hover:border-orange-400'
  return (
    <section className='flex justify-center items-center min-h-screen bg-gray-300 p-4'>
      <div className='text-center flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white'>
        <div className='mb-8'>
          <h1 className='text-6xl mt-8 md:mt-10'>404</h1>
          <h2 className='text-3xl p-4 mb-3 md:mb-10'>Sorry, we couldn't find that page</h2>
          <Link to='/' className={buttonStyle} > Home </Link>
        </div>
        <img src={image404} alt='page404' />
      </div>
    </section>
  )
}
