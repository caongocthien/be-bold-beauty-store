/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { HiShoppingBag } from 'react-icons/hi'
import classNames from 'classnames'
import Popover from '../Popover'
import { useAppDispatch, useAppSelector } from '~/hooks/hooks'
import { removeJwtToLocalStorage } from '~/slice/auth/authSlice'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '~/apis/category.api'
import CONSTANTS from '~/constants/constants'
import { formatCurrency, generateNameId } from '~/utils/utils'
import { getCarts } from '~/apis/cart.api'
import { User } from '~/types/user.type'
import { getCart } from '~/slice/cart/cartSlice'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'

export default function Header() {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth.isAuthentication)
  const cart = useAppSelector((state) => state.cart.cart?.attributes.cart_item)

  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(true)

  const user: User = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') as string)
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

  const getCartQuery = useQuery({
    queryKey: ['cart', user && user.id],
    queryFn: () => getCarts(user && user.id.toString())
  })

  useEffect(() => {
    !auth ? dispatch(getCart(undefined)) : dispatch(getCart(getCartQuery.data?.data.data[0]))
  }, [auth, dispatch, getCartQuery.data?.data.data])

  const calculateSumPrice = (): number => {
    const arrPrice =
      cart &&
      cart?.map((item) => {
        const price = Number(item.bb_product.data.attributes.discountPrice || item.bb_product.data.attributes.price)
        return price * item.quantity
      })
    const price =
      arrPrice &&
      arrPrice?.reduce((prev, curr) => {
        return prev + curr
      }, 0)
    return price || 0
  }

  const handleChangeLanguage = (lng: 'vi' | 'en') => {
    i18n.changeLanguage(lng)
  }
  return (
    <header className='sticky top-0 z-10 bg-white w-full border-b-[1px] border-[#f7dee6]'>
      <nav className='hidden items-center justify-between h-20 md:flex'>
        <Link to='/'>
          <img
            width={50}
            height={50}
            src='/src/assets/pngwing.com.png'
            alt='Be Bold'
            decoding='async'
            srcSet='/src/assets/pngwing.com.png'
          />
        </Link>
        <div className='flex text-base uppercase font-medium items-center h-full'>
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
          {auth && (
            <>
              {cart?.length !== 0 && <div className='font-bold mx-4'>{formatCurrency(calculateSumPrice())} đ</div>}
              <Popover
                refElement={
                  <Link to={'/cart'} className='relative'>
                    <HiShoppingBag className='text-2xl relative' />
                    {cart && (
                      <span className='absolute top-[-4px] right-[-10px] bg-black text-white rounded-[50%] h-4 w-4 text-xs flex justify-center items-center'>
                        {cart.length}
                      </span>
                    )}
                  </Link>
                }
              >
                <div className='bg-white rounded shadow flex flex-col py-3  max-w-md'>
                  <div className='text-gray-500 px-7'> {t('products in cart')}</div>
                  {cart && cart?.length > 0 ? (
                    <div className='mt-5'>
                      {cart?.map(
                        (item) =>
                          item && (
                            <div
                              key={item.id}
                              className='flex items-center justify-between hover:bg-[#F6EDF0] hover:text-gray-500 px-7 py-3'
                            >
                              <div className='flex-shrink-0 border'>
                                <img
                                  className='h-11 w-11'
                                  src={item.bb_product.data.attributes.productImage.data[0].attributes.url}
                                  alt='img'
                                />
                              </div>
                              <div className='flex-grow ml-2 overflow-hidden'>
                                <div className='truncate'>{item.bb_product.data?.attributes.name}</div>
                              </div>
                              <div className='px-2 text-gray-600'>x{item.quantity}</div>
                              <div className='font-bold'>
                                {formatCurrency(
                                  Number(
                                    item.bb_product.data.attributes.discountPrice ||
                                      item.bb_product.data.attributes.price
                                  ) * item.quantity
                                )}
                                <span>đ</span>
                              </div>
                            </div>
                          )
                      )}
                      <Link to={'/cart'} className='bg-[#F6EDF0] p-2 float-right mt-3'>
                        Xem giỏ hàng của bạn
                      </Link>
                    </div>
                  ) : (
                    <div className='py-14 px-5'>
                      <img
                        src='https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png'
                        alt='Empty cart'
                      />
                    </div>
                  )}
                </div>
              </Popover>
            </>
          )}
          <Popover
            refElement={
              <img
                className='w-6 h-6 ml-4 mr-3 rounded-full'
                src={
                  i18n.language === 'vi'
                    ? 'https://cdn-icons-png.flaticon.com/512/323/323319.png'
                    : 'https://cleandye.com/wp-content/uploads/2020/01/English-icon.png'
                }
                alt='lang'
              />
            }
          >
            <div className='bg-white rounded shadow flex flex-col py-3'>
              <button
                onClick={() => handleChangeLanguage('vi')}
                className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => handleChangeLanguage('en')}
                className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'
              >
                English
              </button>
            </div>
          </Popover>

          <Popover refElement={<FaUserAlt className='text-lg' />}>
            <div className='bg-white rounded shadow flex flex-col py-3'>
              {auth ? (
                <>
                  <Link to={'/profile'} className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500'>
                    {t('my account')}
                  </Link>
                  <Link to={'/cart'} className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500'>
                    {t('my cart')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500 text-start'
                  >
                    {t('log out')}
                  </button>
                </>
              ) : (
                <>
                  <Link to={'/register'} className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'>
                    {t('sign up')}
                  </Link>
                  <Link to={'/login'} className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'>
                    {t('sign in')}
                  </Link>
                </>
              )}
            </div>
          </Popover>
        </div>
      </nav>

      <nav className='md:hidden h-14 flex items-center justify-between'>
        <Link to='/'>
          <img
            width={40}
            height={40}
            src='/src/assets/pngwing.com.png'
            alt='Be Bold'
            decoding='async'
            srcSet='/src/assets/pngwing.com.png'
          />
        </Link>
        <div className='flex items-center'>
          {auth && cart?.length !== 0 && (
            <Link to={'/cart'} className='font-bold mx-4 flex justify-end'>
              {formatCurrency(calculateSumPrice())} đ
            </Link>
          )}
          <RxHamburgerMenu className='cursor-pointer' onClick={() => setIsOpenMobileMenu((prev) => !prev)} />
        </div>
        <div hidden={isOpenMobileMenu} className='bg-white absolute inset-0 h-screen'>
          <div className='h-14 flex items-center justify-end'>
            <AiOutlineClose onClick={() => setIsOpenMobileMenu((prev) => !prev)} />
          </div>
          <div>
            <div className='border-b py-10'>
              {categoriesQuery.data?.data.data &&
                categoriesQuery.data?.data.data.map((item) => (
                  <Link
                    onClick={() => setIsOpenMobileMenu((prev) => !prev)}
                    key={item.id}
                    to={`/products/category/${generateNameId({ name: item.attributes.name, id: item.id })}`}
                    className='px-3 py-1 h-full text-xl font-bold flex items-center hover:text-[#f09db8]'
                    state={{ title: item.attributes.name, query: CONSTANTS.queryParam.GET_PRODUCTS_BY_CATEGORY }}
                  >
                    {item.attributes.name}
                  </Link>
                ))}
            </div>
            <div className='flex flex-col py-3'>
              <button
                onClick={() => handleChangeLanguage('vi')}
                className={classNames('py-2 px-3 text-start', {
                  'text-red-400': i18n.language === 'vi'
                })}
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => handleChangeLanguage('en')}
                className={classNames('py-2 px-3 text-start', {
                  'text-red-400': i18n.language === 'en'
                })}
              >
                English
              </button>
              {auth ? (
                <>
                  <Link to={'/profile'} className='py-2 px-3'>
                    {t('my account')}
                  </Link>
                  <Link to={'/cart'} className='py-2 px-3'>
                    {t('my cart')}
                  </Link>
                  <button onClick={handleLogout} className='py-2 px-3 text-start'>
                    {t('log out')}
                  </button>
                </>
              ) : (
                <>
                  <Link to={'/register'} className='py-2 px-10'>
                    {t('sign up')}
                  </Link>
                  <Link to={'/login'} className='py-2 px-10'>
                    {t('sign in')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
