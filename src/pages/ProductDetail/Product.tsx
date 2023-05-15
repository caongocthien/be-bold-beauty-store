import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '~/apis/product.api'
import Slider from '~/components/Slider'
import { getIdFromNameId } from '~/utils/utils'
import { useState } from 'react'
import { ProductImage } from '~/types/product.type'
import Product from '~/components/Product'
import { Navigation } from 'swiper'
import classNames from 'classnames'

export default function ProductDetail() {
  const [productImageIndex, setProductImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)

  const getImageUrl = (slideImage: ProductImage[]) => {
    const imageItem = slideImage.filter((_, index) => index === productImageIndex)
    return imageItem
  }

  const getProductDetailQuery = useQuery({
    queryKey: ['product'],
    queryFn: () => getProductDetail(id as string)
  })
  const product = getProductDetailQuery.data?.data.data
  if (!product) return null

  return (
    <div className='container m-auto py-10 px-5'>
      <div className='grid grid-cols-12 gap-9 '>
        <div className='col-span-5 '>
          <div className='relative w-full pt-[100%] shadow'>
            <img
              src={getImageUrl(product.attributes.productImage.data)[0].attributes.url}
              alt={product.attributes.name}
              className='absolute top-0 left-0 h-full w-full bg-white object-cover'
            />
          </div>
          <div className='relative mt-4'>
            {/* <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text'></button> */}
            <Slider
              modules={[Navigation]}
              navigation={true}
              slidesPerView={5}
              slideItems={product.attributes.productImage.data.map((item, index) => {
                const isActive = index === productImageIndex
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div className='relative w-full pt-[100%]' key={item.id} onClick={() => setProductImageIndex(index)}>
                    <img
                      src={item.attributes.url}
                      alt={product.attributes.name}
                      className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                    />

                    {isActive && <div className='absolute inset-0 border-2 border-pink-200'></div>}
                  </div>
                )
              })}
            />
          </div>
          <div></div>
        </div>
        <div className='col-span-7'>
          <div>
            <div className='text-gray-400 text-base mb-5'>Home / Hair Care / Product Name 1</div>
            <div className='text-lg text-gray-700 mb-5'>Hair Care</div>
            <div className='text-4xl mb-5 font-bold text-gray-700'>
              <span className='line-through text-gray-500 text-3xl'>$75.00</span> $59.00{' '}
              <span className='text-lg font-normal'> & Free Shipping</span>
            </div>
            <div className='text-lg mb-5 '>
              Ut quis sollicitudin orci. Aliquam at libero non purus sodales sagittis eu ac neque. Nunc ipsum felis,
              vehicula eu aliquam sed, ultricies ac lacus. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Nam viverra commodo finibus. Morbi laoreet lacus quis lobortis tempor. Nam
              tincidunt, lectus a suscipit fringilla, mauris turpis dapibus dolor, eu venenatis diam nibh id massa.
              Nulla eget tortor ultrices, ultricies turpis a, accumsan turpis. Quisque dignissim semper leo ac accumsan.
              Quisque est nisl, bibendum ut elit quis, pellentesque vehicula tellus. Sed luctus mattis ante ac posuere.
            </div>
            <div className='flex mb-10'>
              <div className='flex '>
                <button disabled={quantity <= 1} className='border p-3' onClick={() => setQuantity((prev) => prev - 1)}>
                  -
                </button>
                <input
                  type='number'
                  className='outline-none border text-center'
                  value={quantity}
                  onChange={(event) =>
                    Number(event.target.value) < 1 ? setQuantity(1) : setQuantity(Number(event.target.value))
                  }
                />
                <button className='border p-3' onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
            </div>

            <button
              disabled={quantity > product.attributes.inventory}
              className={classNames('p-4 bg-pink-300 mb-5', {
                'bg-gray-400': quantity > product.attributes.inventory
              })}
            >
              Them vao gio hang
            </button>

            <div className='h-[1px] bg-pink-200 w-full mb-5'></div>
            <div>Category: Hair Care</div>
          </div>
        </div>
      </div>
      <div>
        <div>Related products</div>
        <div className='grid grid-cols-4'>
          <Product
            id={1}
            imgUrl='https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg'
            name='product 1'
            price={1000}
          />
          <Product
            id={1}
            imgUrl='https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg'
            name='product 1'
            price={1000}
          />
          <Product
            id={1}
            imgUrl='https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg'
            name='product 1'
            price={1000}
          />
          <Product
            id={1}
            imgUrl='https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg'
            name='product 1'
            price={1000}
          />
        </div>
      </div>
    </div>
  )
}
