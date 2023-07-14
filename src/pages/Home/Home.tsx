import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Slider from '~/components/Slider'
import { Link } from 'react-router-dom'
import Banner from '~/components/Banner'
import { FaShippingFast } from 'react-icons/fa'
import { product } from '~/constants/utils'
import { useQuery } from '@tanstack/react-query'
import { getBrands } from '~/apis/brand.api'
import Product from '~/components/Product'
import CONSTANTS from '~/constants/constants'
import { generateNameId } from '~/utils/utils'
import { Helmet } from 'react-helmet'

export default function Home() {
  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  })

  return (
    <div className='w-full'>
      <Helmet>
        <title>Trang chủ</title>
        <meta name='description' content='Trang chủ' />
      </Helmet>
      {/* banner 1 */}
      <Banner
        classNameBanner='lg:bg-fixed min-h-[70vh]'
        classNameTitle='float-right flex items-center mr-10'
        image={
          'https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg'
        }
        title={{
          title_1: 'New in town',
          title_2: 'The new beatuty collecttion',
          title_3: 'This new collection brings with it the most exciting lorem ipsum dolor sit amet.'
        }}
      />

      {/* slider brand */}
      {brandsQuery.data?.data.data && (
        <div className='py-8 px-[1px]'>
          <Slider
            spaceBetween={20}
            slidesPerView={5}
            slideItems={brandsQuery.data?.data.data.map((item) => {
              return (
                <Link
                  to={`/products/brand/${generateNameId({ name: item.attributes.name, id: item.id })}`}
                  key={item.id}
                  state={{ title: item.attributes.name, query2: CONSTANTS.queryParam.GET_PRODUCTS_BY_BRAND }}
                >
                  <img
                    src={item.attributes.logo.data.attributes.url}
                    alt={item.attributes.name}
                    width={170}
                    className=' h-36 object-contain'
                  />
                </Link>
              )
            })}
          />
        </div>
      )}

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
                <Product
                  id={item.id}
                  key={index}
                  imgUrl={item.img}
                  name={item.name}
                  price={item.price}
                  price_discount={item.price_discount}
                />
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
                <Product
                  id={item.id}
                  key={index}
                  imgUrl={item.img}
                  name={item.name}
                  price={item.price}
                  price_discount={item.price_discount}
                />
              )
            })}
          />
        </div>
      </div>
      {/* Promotion */}
      <div className='mt-10 flex justify-between'>
        <Banner
          classNameBanner='flex-grow mr-2 min-h-[60vh]'
          classNameTitle={'pl-32 pt-32'}
          bannerHeight={'60'}
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
          classNameBanner='flex-grow ml-2 min-h-[60vh]'
          classNameTitle={'pl-32 pt-32'}
          bannerHeight={'60'}
          image={
            'https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg'
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
