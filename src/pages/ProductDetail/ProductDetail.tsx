import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetail } from '~/apis/product.api'
import Slider from '~/components/Slider'
import { formatCurrency, getIdFromNameId } from '~/utils/utils'
import { useRef, useState } from 'react'
import { ProductImage } from '~/types/product.type'
import Product from '~/components/Product'
import { Navigation } from 'swiper'
import classNames from 'classnames'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabPanel from '~/components/TabPanel'
import { useAppSelector } from '~/hooks/hooks'
import { BodyUpdate, updateCart } from '~/apis/cart.api'

export default function ProductDetail() {
  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.auth.isAuthentication)
  const [value, setValue] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [productImageIndex, setProductImageIndex] = useState(0)

  const imageRef = useRef<HTMLImageElement>(null)
  const { nameId } = useParams()

  const id = getIdFromNameId(nameId as string)

  // const cartMutate = useMutation({
  //   mutationFn: (cartId, cartItems) => updateCart(cartId, cartItems)
  // })

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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

  const getProductDetailQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id as string),
    staleTime: 5 * 1000 * 60,
    cacheTime: 10 * 1000 * 60
  })

  const product = getProductDetailQuery.data?.data.data

  const handleAddToCart = () => {
    if (!auth) {
      navigate('/login')
    } else {
      console.log(auth)
    }
  }

  if (!product) return null
  return (
    <div className='container m-auto py-10 px-5'>
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
            <div className='text-gray-400 text-base mb-5'>Home / Hair Care / Product Name 1</div>
            <div className='text-3xl text-gray-800 mb-5'>{product.attributes.name}</div>
            <div className='text-4xl mb-5 font-bold text-gray-700'>
              <span className='line-through text-gray-500 text-3xl relative'>
                {product.attributes.discountPrice && formatCurrency(Number(product.attributes.discountPrice))}đ
              </span>
              <span> {formatCurrency(Number(product.attributes.price))}đ</span>
              <span className='text-lg font-normal'> & Free Shipping</span>
            </div>
            <div className='text-lg mb-5 whitespace-pre-wrap'>{product.attributes.shortDescription}</div>
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
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>

            <div className='h-[1px] bg-pink-200 w-full mb-5'></div>
            <div>Category: {product.attributes.bb_product_category.data.attributes.name}</div>
          </div>
        </div>
      </div>
      <div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Thông số kỹ thuật' />
              <Tab label='Thông tin sản phẩm' />
              <Tab label='Sản phẩm liên quan' />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
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
          <TabPanel value={value} index={1}>
            <div className='whitespace-pre-wrap'>{product.attributes.description}</div>
          </TabPanel>
          <TabPanel value={value} index={2}>
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
                      price_discount={Number(item.attributes.discountPrice)}
                      price={Number(item.attributes.price)}
                    />
                  ))}
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  )
}
