import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='py-64 h-[calc(100vh_-_81px)]  bg-center bg-no-repeat bg-cover bg-white bg-[url("https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg")]'>
      <div className=' bg-[#F6EDF0] p-10 max-w-xl  m-auto '>
        <form className='flex flex-col '>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='email'
            placeholder='Email'
          />
          <div className='mt-1 text-red-600 min-h-[1rem]'></div>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='password'
            placeholder='Password'
          />
          <div className='mt-1 text-red-600 min-h-[1rem]'></div>
          <button className='p-3 bg-[#f7d0dd] text-gray-700 hover:opacity-80 uppercase '>Login</button>
        </form>
        <div className='mt-5 flex justify-between items-center'>
          <Link to={'/'}>Quên mật khẩu</Link>
          <div>
            Bạn chưa chưa tài khoản?{' '}
            <Link to={'/register'} className='ml-1 text-[#da86a2]'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
