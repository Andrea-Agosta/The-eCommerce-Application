import { Github } from 'react-bootstrap-icons';
import { Linkedin } from 'react-bootstrap-icons';

export const Footer = () => {
  return (
    <footer className="bg-[#2F2D2E] text-gray-400 flex flex-col text-center py-3" data-testid='footer'>
      <div className="text-3xl m-2 mt-0 flex justify-center" >
        <a href="https://github.com/Andrea-Agosta" data-testid='github-link'><Github className='mr-3 hover:text-orange-400' data-testid='github-icon' /></a>
        <a href="https://uk.linkedin.com/in/andrea-agosta-276ab866" data-testid='linkedin-link'><Linkedin className='hover:text-orange-400' data-testid='linkedin-icon' /></a>
      </div>
      <h6> &#169; Designed By <a href="http://agostadev.great-site.net/" className='hover:text-orange-400 underline'>Andrea Agosta</a> </h6>
    </footer>
  )
}