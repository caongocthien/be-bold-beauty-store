import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Slider from '~/components/Slider'
import { Link } from 'react-router-dom'
import Banner from '~/components/Banner'
import { AiOutlineStar } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'

import { brand, product } from '~/constants/utils'

export default function Home() {
  return (
    <div className='w-full'>
      {/* banner 1 */}
      <Banner
        classNameBanner='lg:bg-fixed'
        classNameTitle='float-right flex items-center mr-10'
        image={
          'https://thumbs.dreamstime.com/b/beauty-background-various-eco-friendly-cosmetic-skin-care-products-beauty-background-various-eco-friendly-cosmetic-184476996.jpg'
        }
        title={{
          title_1: 'New in town',
          title_2: 'The new beatuty collecttion',
          title_3: 'This new collection brings with it the most exciting lorem ipsum dolor sit amet.'
        }}
      />

      {/* slider brand */}
      <div className='py-8 px-[1px]'>
        <Slider
          spaceBetween={20}
          slidesPerView={5}
          slideItems={brand.map((item, index) => {
            return (
              <Link to={'/'} key={index}>
                <img src={item.img} alt='' className=' h-36 object-contain' />
              </Link>
            )
          })}
        />
      </div>

      {/* Product collection */}
      <div className='flex flex-col mt-10'>
        <div className='flex flex-col self-center items-center'>
          <div className=' text-sm uppercase font-thin'>POPULAR PRODUCTS</div>
          <div className=' text-[43px] capitalize'>Trending Now</div>
        </div>
        <div className='py-8 px-[1px]'>
          <Slider
            classNameSlideItem='border-none'
            spaceBetween={15}
            slidesPerView={4}
            slideItems={product.map((item, index) => {
              return (
                <Link to={'/'} key={index}>
                  <img className='h-auto w-full' src={item.img} alt='' />
                  <div className='mt-3'>
                    <div className='flex mt-1 text-sm'>
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                    </div>
                    <div className='mt-1 text-sm'>{item.name}</div>
                    <div className='mt-1 text-sm'>
                      <span className='line-through text-gray-500 font-bold'>d{item.price}</span>
                      <span className='ml-1 font-bold text-gray-700'>d{item.price_discount}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          />
        </div>
      </div>
      {/* Product collection */}
      <div className='flex flex-col mt-10'>
        <div className='flex flex-col self-center items-center'>
          <div className=' text-sm uppercase font-thin'>SHOP</div>
          <div className=' text-[43px] capitalize'>Best Selling</div>
        </div>
        <div className=' py-8 px-[1px]'>
          <Slider
            classNameSlideItem='border-none'
            spaceBetween={15}
            slidesPerView={4}
            slideItems={product.map((item, index) => {
              return (
                <Link to={'/'} key={index}>
                  <img className='h-auto w-full' src={item.img} alt='' />
                  <div className='mt-3'>
                    <div className='flex mt-1 text-sm'>
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                      <AiOutlineStar />
                    </div>
                    <div className='mt-1 text-sm'>{item.name}</div>
                    <div className='mt-1 text-sm'>
                      <span className='line-through text-gray-500 font-bold'>d{item.price}</span>
                      <span className='ml-1 font-bold text-gray-700'>d{item.price_discount}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          />
        </div>
      </div>
      {/* Promotion */}
      <div className='mt-10 flex justify-between'>
        <Banner
          classNameBanner='flex-grow mr-2'
          classNameTitle={'pl-32 pt-32'}
          bannerHeight={60}
          image={
            'https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg'
          }
          title={{
            title_1: 'New in town',
            title_2: 'The new beatuty collecttion',
            title_3: 'This new collection brings with it the most exciting lorem ipsum dolor sit amet.'
          }}
        />
        <Banner
          classNameBanner='flex-grow ml-2'
          classNameTitle={'pl-32 pt-32'}
          bannerHeight={60}
          image={
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          }
          title={{
            title_1: 'New in town',
            title_2: 'The new beatuty collecttion',
            title_3: 'This new collection brings with it the most exciting lorem ipsum dolor sit amet.'
          }}
        />
      </div>
      {/* Why choose us */}
      <div className='my-20 '>
        <div className='grid grid-cols-4 container mx-auto'>
          <div className='uppercase'>Why choose us</div>
          <div className='flex'>
            <div className='mr-2 text-2xl bg-[#e6bbca] w-20 h-10 flex justify-center items-center rounded-3xl text-white'>
              <FaShippingFast />
            </div>
            <div>
              <div className='text-2xl capitalize'>Fast Delivery</div>
              <div className='text-gray-500 mt-2 '>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='mr-2 text-2xl bg-[#e6bbca] w-20 h-10 flex justify-center items-center rounded-3xl text-white'>
              <FaShippingFast />
            </div>
            <div>
              <div className='text-2xl capitalize'>Fast Delivery</div>
              <div className='text-gray-500 mt-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='mr-2 text-2xl bg-[#e6bbca] w-20 h-10 flex justify-center items-center rounded-3xl text-white'>
              <FaShippingFast />
            </div>
            <div>
              <div className='text-2xl capitalize'>Fast Delivery</div>
              <div className='text-gray-500 mt-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
