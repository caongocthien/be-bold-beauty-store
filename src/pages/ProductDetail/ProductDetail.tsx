import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductDetail } from '~/apis/product.api'
import Slider from '~/components/Slider'
import { formatCurrency, generateNameId, getIdFromNameId } from '~/utils/utils'
import { useRef, useState } from 'react'
import { ProductImage } from '~/types/product.type'
import Product from '~/components/Product'
import { Navigation } from 'swiper'
import classNames from 'classnames'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useAppSelector } from '~/hooks/hooks'
import { BodyUpdate, updateCart } from '~/apis/cart.api'
import { queryClient } from '~/App'
import { toast } from 'react-toastify'
import QuantityController from '~/components/QuantityController'
import { Helmet } from 'react-helmet'

export default function ProductDetail() {
  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.auth.isAuthentication)
  const cart = useAppSelector((state) => state.cart.cart)

  const [buyCount, setBuyCount] = useState(1)
  const [productImageIndex, setProductImageIndex] = useState(0)

  const imageRef = useRef<HTMLImageElement>(null)
  const { nameId } = useParams()

  const id = getIdFromNameId(nameId as string)

  const quantityItemInCart =
    cart?.attributes.cart_item.find((item) => item.bb_product.data.id === Number(id))?.quantity || 0

  const updateCartMutation = useMutation((cart: { cardId: number; body: BodyUpdate[] }) =>
    updateCart(cart.cardId, cart.body)
  )

  const getProductDetailQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id as string),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  })
  const product = getProductDetailQuery.data?.data.data

  const getImageUrl = (slideImage: ProductImage[]) => {
    const imageItem = slideImage.filter((_, index) => index === productImageIndex)
    return imageItem
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const react = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / react.height)
    const left = offsetX * (1 - naturalWidth / react.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleAddToCart = () => {
    if (!auth) {
      navigate('/login')
    } else {
      cart &&
        updateCartMutation.mutate(
          {
            cardId: cart.id as number,
            body: [
              ...cart.attributes.cart_item.map((item) => ({
                quantity: product?.id === item.bb_product.data.id ? item.quantity + buyCount : item.quantity,
                bb_product: item.bb_product.data.id
              }))
            ].concat(
              cart.attributes.cart_item.filter((item) => item.bb_product.data.id === product?.id).length === 0
                ? [
                    {
                      quantity: buyCount,
                      bb_product: product?.id as number
                    }
                  ]
                : []
            )
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['cart'] })
              setBuyCount(1)
              toast.success('Thêm vào giỏ hàng thành công.', {
                autoClose: 500
              })
            }
          }
        )
    }
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  if (!product) return null
  return (
    <div className='container m-auto py-10 px-5'>
      <Helmet>
        <title>{product.attributes.name}</title>
        <meta name='description' content={product.attributes.name} />
      </Helmet>
      <div className='grid grid-cols-12 gap-9 mb-10'>
        <div className='col-span-5 '>
          <div
            className='relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in'
            onMouseMove={handleZoom}
            onMouseLeave={handleRemoveZoom}
          >
            <img
              src={getImageUrl(product.attributes.productImage.data)[0].attributes.url}
              alt={product.attributes.name}
              className='absolute top-0 left-0 h-full w-full bg-white object-cover pointer-events-none'
              ref={imageRef}
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
            <div className='text-gray-400 text-base mb-5'>
              <Link to='/'>Trang chủ</Link> /{' '}
              <Link
                to={`/products/brand/${generateNameId({
                  name: product.attributes.bb_brand.data.attributes.name,
                  id: product.attributes.bb_brand.data.id
                })}`}
              >
                {product.attributes.bb_brand.data.attributes.name}
              </Link>{' '}
              / {product.attributes.name}
            </div>
            <div className='text-3xl text-gray-800 mb-5'>{product.attributes.name}</div>
            <div className='text-4xl mb-5 font-bold text-gray-700'>
              <span className='line-through text-gray-500 text-2xl relative'>
                {product.attributes.discountPrice && formatCurrency(Number(product.attributes.price))}đ
              </span>
              <span className='px-2'>
                {formatCurrency(Number(product.attributes.discountPrice || product.attributes.price))}đ
              </span>
              <span className='text-lg font-normal'> & Miễn phí vận chuyển</span>
            </div>
            <div className='text-lg mb-5 whitespace-pre-wrap'>{product.attributes.shortDescription}</div>
            {/* quantity controller */}
            <div className=' mb-10 flex items-center'>
              <QuantityController
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onType={handleBuyCount}
                value={buyCount}
                max={product.attributes.inventory - quantityItemInCart}
              />
              <div className='pl-5 text-gray-500'>
                {product.attributes.inventory - quantityItemInCart} sản phẩm có sẳn
              </div>
            </div>
            {product.attributes.inventory === 0 ? (
              <div className='p-4 text-xl font-bold'>Sản phẩm tạm hết hàng</div>
            ) : (
              <button
                disabled={updateCartMutation.isLoading}
                className={classNames('p-4 bg-pink-300 mb-5')}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
            )}

            <div className='h-[1px] bg-pink-200 w-full mb-5'></div>
            <div>Category: {product.attributes.bb_product_category.data.attributes.name}</div>
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab>Thông số kỹ thuật</Tab>
          <Tab>Thông tin sản phẩm</Tab>
          <Tab>Sản phẩm liên quan</Tab>
        </TabList>
        <TabPanel>
          <div>
            <div className='flex'>
              <div className='min-w-[200px]'>Đối tượng sử dụng:</div>
              <div>{product.attributes.bb_product_category.data.attributes.name}</div>
            </div>
            <div className='flex'>
              <div className='min-w-[200px]'>Đường kính mặt:</div>
              <div>{product.attributes.face_diameter} mm</div>
            </div>
            <div className='flex'>
              <div className='min-w-[200px]'>Chất liệu mặt kính:</div>
              <div>{product.attributes.glass_material}</div>
            </div>
            <div className='flex'>
              <div className='min-w-[200px]'>Chất liệu dây:</div>
              <div>{product.attributes.wire_material}</div>
            </div>
            <div className='flex'>
              <div className='min-w-[200px]'>Bộ máy:</div>
              <div>{product.attributes.mechanism}</div>
            </div>
            <div className='flex'>
              <div className='min-w-[200px]'>Chống nước:</div>
              <div>{product.attributes.water_resistance}</div>
            </div>
            <div className='flex'>
              <div className='min-w-[200px]'>Thương hiệu:</div>
              <div>{product.attributes.trademark}</div>
            </div>
            <div className='flex'>
              <div className='min-w-[200px]'>Hãng:</div>
              <div>{product.attributes.bb_brand.data.attributes.name}</div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='whitespace-pre-wrap'>{product.attributes.description}</div>
        </TabPanel>
        <TabPanel>
          <div>
            <div className='grid grid-cols-5 gap-4'>
              {product.attributes.bb_brand.data.attributes.bb_products.data
                .filter((item) => item.id !== product.id)
                .slice(0, 5)
                .map((item) => (
                  <Product
                    key={item.id}
                    id={item.id}
                    imgUrl={item.attributes.productImage.data[0].attributes.url}
                    name={item.attributes.name}
                    price_discount={Number(item.attributes.price)}
                    price={Number(item.attributes.discountPrice)}
                  />
                ))}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
