import { Link, useLocation } from 'react-router-dom'

export default function RegisterHeader() {
  const { pathname } = useLocation()
  return (
    <header>
      <div className='max-w-full'>
        <nav className='flex items-center'>
          <Link to='/'>
            <img
              width={104}
              height={49}
              src='https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/logo-regular.png'
              className='py-4'
              alt='Be Bold'
              decoding='async'
              srcSet='https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/logo-regular.png 1x, https://websitedemos.net/be-bold-beauty-store-02/wp-content/uploads/sites/1117/2022/08/logo-retina.png 2x'
            />
          </Link>
          <div className='ml-5 text-2xl lg:text-3xl'>{pathname === '/register' ? 'Register' : 'Login'}</div>
        </nav>
      </div>
    </header>
  )
}
