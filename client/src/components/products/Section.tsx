import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/product';
import Card from './Card';

interface Props {
  category: string;
}

const Section = ({ category }: Props) => {
  const { products } = useContext(ProductContext);

  return (
    <section>
      <div className='flex flex-wrap justify-between items-center mx-auto mt-5 mb-5'>
        <h2 className='text-2xl ml-3'> {category}</h2>
        <Link to={`/category/${'name'}`} className='text-violet-500 hover:text-orange-400 mr-8' > See all </Link>
      </div>
      <div className='bg-white p-4 transition duration-200 ease-in-out overflow-hidden' >
        <div className='grid grid-cols-12 overflow-x-scroll gap-40'>
          {products.map((product, index) => <Card key={index} product={product} />)}
        </div>
      </div>
    </section>
  )
}

export default Section;