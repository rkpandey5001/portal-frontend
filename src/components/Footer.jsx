import React from 'react';

const Footer = () => {
  return (
    <div>
    <footer className="bg-[#282c34] text-white text-align-center p-[20px]">
      <div className="footer-content">
        <p className='flex justify-center'>&copy; {new Date().getFullYear()} Your Company Name</p>
        <ul className="flex justify-center gap-5 mt-5">
          <li><a href="/about" className='text-white text-decoration-none hover:text-decoration-underline'>About</a></li>
          <li><a href="/contact" className='text-white text-decoration-none hover:text-decoration-underline'>Contact</a></li>
          <li><a href="/privacy" className='text-white text-decoration-none hover:text-decoration-underline'>Privacy Policy</a></li>
          <li><a href="/terms" className='text-white text-decoration-none hover:text-decoration-underline'>Terms of Service</a></li>
        </ul>
      </div>
    </footer>
    </div>
  )
}

export default Footer;
