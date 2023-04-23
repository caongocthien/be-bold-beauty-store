import { Link, NavLink } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { HiShoppingBag } from 'react-icons/hi'
import {
  FloatingPortal,
  useFloating,
  useHover,
  useInteractions,
  arrow,
  FloatingArrow,
  safePolygon,
  shift,
  offset
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Popover from '../Popover'

export default function Header() {
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      shift(),
      offset(10),
      arrow({
        element: arrowRef
      })
    ]
  })
  const hover = useHover(context, {
    handleClose: safePolygon()
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <header>
      <div className='max-w-full'>
        <nav className='flex items-center justify-between'>
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
          <ul className='flex text-base uppercase font-medium'>
            <li className='px-3'>
              <NavLink to={'./a'} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                Shop all
              </NavLink>
            </li>
            <li className='px-3'>
              <NavLink to={'/b'} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                Make up
              </NavLink>
            </li>
            <li className='px-3'>
              <NavLink to={'/c'} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                Skin care
              </NavLink>
            </li>
            <li className='px-3'>
              <NavLink to={'/d'} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                Hair Care
              </NavLink>
            </li>
            <li className='px-3'>
              <NavLink to={'/e'} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                About
              </NavLink>
            </li>
            <li className='px-3'>
              <NavLink to={'/f'} className={({ isActive }) => (isActive ? 'font-bold' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className='flex items-center'>
            <div className='flex ' ref={refs.setReference} {...getReferenceProps()}>
              <FaUserAlt className='text-lg ' />
              {/* <span className='font-bold'>Cao Ngoc Thien</span> */}
            </div>
            <AnimatePresence>
              {isOpen && (
                <FloatingPortal>
                  <motion.div
                    ref={refs.setFloating}
                    style={{
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0
                    }}
                    {...getFloatingProps()}
                    // framer motion
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                  >
                    <FloatingArrow
                      ref={arrowRef}
                      context={context}
                      fill={'#fff'}
                      stroke={'#d6d3d3'}
                      strokeWidth={1}
                      strokeOpacity={0.1}
                    />
                    <div className='bg-white rounded shadow flex flex-col  py-3 '>
                      {/* <>
                        <Link to={'/register'} className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'>
                          Sign up
                        </Link>
                        <Link to={'/login'} className='py-2 hover:bg-[#F6EDF0] px-10 hover:text-gray-500'>
                          Sign in
                        </Link>
                      </> */}

                      <>
                        <Link to={'/'} className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500'>
                          My account
                        </Link>
                        <Link to={'/'} className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500'>
                          My purcharse
                        </Link>
                        <Link to={'/'} className='py-2 hover:bg-[#F6EDF0] px-6 hover:text-gray-500'>
                          Logout
                        </Link>
                      </>
                    </div>
                  </motion.div>
                </FloatingPortal>
              )}
            </AnimatePresence>
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
                        Chuột Máy Tính Không Dây Chuột Gaming Chống Ồn Led Rgb T-WOLF Q13 Wireless Chuột Bluetooth
                        Laptop Pc Mouse Chơi Game
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
                        Chuột Máy Tính Không Dây Chuột Gaming Chống Ồn Led Rgb T-WOLF Q13 Wireless Chuột Bluetooth
                        Laptop Pc Mouse Chơi Game
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
                        Chuột Máy Tính Không Dây Chuột Gaming Chống Ồn Led Rgb T-WOLF Q13 Wireless Chuột Bluetooth
                        Laptop Pc Mouse Chơi Game
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
      </div>
    </header>
  )
}
