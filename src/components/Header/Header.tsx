import { Link, NavLink } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { HiShoppingBag } from 'react-icons/hi'
import classNames from 'classnames'
import Popover from '../Popover'
import { useAppDispatch, useAppSelector } from '~/hooks/hooks'
import { removeJwtToLocalStorage } from '~/auth/authSlide'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '~/apis/category.api'
import CONSTANTS from '~/constants/constants'
import { generateNameId } from '~/utils/utils'

export default function Header() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth.isAuthentication)
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  })
  const handleLogout = () => {
    dispatch(removeJwtToLocalStorage())
  }

  return (
    <header className='sticky top-0 z-30 bg-white w-full border-b-[1px] border-[#f7dee6]'>
      <nav className='flex items-center justify-between h-20 '>
        <Link to='/'>
          <img
            width={104}
            height={49}
            src='https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/logo-regular.png'
            alt='Be Bold'
            decoding='async'
            srcSet='https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/logo-regular.png 1x, https://websitedemos.net/be-bold-beauty-store-02/wp-content/uploads/sites/1117/2022/08/logo-retina.png 2x'
          />
        </Link>
        <div className='flex text-base uppercase font-medium items-center h-full'>
          <NavLink
            to={'/products/all-products'}
            end
            className={({ isActive }) =>
              classNames('px-3 h-full flex items-center border-t-[1px] hover:text-[#f09db8]', {
                'font-bold  border-[#f09db8] text-[#f09db8]': isActive,
                'border-transparent': !isActive
              })
            }
            state={{ title: CONSTANTS.allProducts, query: '' }}
          >
            {CONSTANTS.allProducts}
          </NavLink>
          {categoriesQuery.data?.data.data &&
            categoriesQuery.data?.data.data.map((item) => (
              <NavLink
                key={item.id}
                to={`/products/category/${generateNameId({ name: item.attributes.name, id: item.id })}`}
                className={({ isActive }) =>
                  classNames('px-3 h-full flex items-center border-t-[1px] hover:text-[#f09db8]', {
                    'font-bold  border-[#f09db8] text-[#f09db8]': isActive,
                    'border-transparent': !isActive
                  })
                }
                state={{ title: item.attributes.name, query: CONSTANTS.queryParam.GET_PRODUCTS_BY_CATEGORY }}
              >
                {item.attributes.name}
              </NavLink>
            ))}
        </div>
        <div className='flex items-center'>
          <Popover refElement={<FaUserAlt className='text-lg ' />}>
            <div className='bg-white rounded shadow flex flex-col  py-3 '>
              {auth ? (
                <>
                  <Link to={'/profile'} className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500'>
                    My account
                  </Link>
                  <Link to={'/'} className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500'>
                    My purcharse
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500 text-start'
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to={'/register'} className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'>
                    Sign up
                  </Link>
                  <Link to={'/login'} className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'>
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </Popover>
          <div className='font-bold mx-4'>$0.00</div>
          <Popover
            refElement={
              <div className='relative'>
                <HiShoppingBag className='text-2xl relative' />
                <span className='absolute top-[-4px] right-[-10px] bg-black text-white rounded-[50%] h-4 w-4 text-xs flex justify-center items-center'>
                  2
                </span>
              </div>
            }
          >
            <div className='bg-white rounded shadow flex flex-col py-3  max-w-md'>
              <div className='text-gray-500 px-7'>Recently added product </div>
              <div className='mt-5'>
                <div className='flex items-center justify-between hover:bg-[#F6EDF0] hover:text-gray-500 px-7 py-3'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-11 w-11'
                      src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80'
                      alt='img'
                    />
                  </div>
                  <div className='flex-grow ml-2 overflow-hidden'>
                    <div className='truncate'>
                      Chuột Máy Tính Không Dây Chuột Gaming Chống Ồn Led Rgb T-WOLF Q13 Wireless Chuột Bluetooth Laptop
                      Pc Mouse Chơi Game
                    </div>
                  </div>
                  <div className='text-[#f5b1c7] '>₫299.000</div>
                </div>
                <div className='flex py-3 items-center justify-between hover:bg-[#F6EDF0] hover:text-gray-500 px-7'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-11 w-11'
                      src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80'
                      alt='img'
                    />
                  </div>
                  <div className='flex-grow ml-2 overflow-hidden'>
                    <div className='truncate'>
                      Chuột Máy Tính Không Dây Chuột Gaming Chống Ồn Led Rgb T-WOLF Q13 Wireless Chuột Bluetooth Laptop
                      Pc Mouse Chơi Game
                    </div>
                  </div>
                  <div className='text-[#f5b1c7] '>₫299.000</div>
                </div>
                <div className='flex py-3 items-center justify-between hover:bg-[#F6EDF0] hover:text-gray-500 px-7'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-11 w-11'
                      src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80'
                      alt='img'
                    />
                  </div>
                  <div className='flex-grow ml-2 overflow-hidden'>
                    <div className='truncate'>
                      Chuột Máy Tính Không Dây Chuột Gaming Chống Ồn Led Rgb T-WOLF Q13 Wireless Chuột Bluetooth Laptop
                      Pc Mouse Chơi Game
                    </div>
                  </div>
                  <div className='text-[#f5b1c7] '>₫299.000</div>
                </div>
                <button className='bg-[#F6EDF0] p-2 float-right mt-3'>View shopping cart</button>
              </div>
            </div>
          </Popover>
        </div>
      </nav>
    </header>
  )
}
