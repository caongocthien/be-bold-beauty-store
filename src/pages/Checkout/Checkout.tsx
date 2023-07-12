import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createOrder } from '~/apis/order.api'
import { updateProduct } from '~/apis/product.api'
import Address from '~/components/Address'
import { useAppSelector } from '~/hooks/hooks'
import { toast } from 'react-toastify'
import { User } from '~/types/user.type'
import { formatCurrency, getUserToLocalStorage } from '~/utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { BodyUpdate, updateCart } from '~/apis/cart.api'
import { queryClient } from '~/App'

type FormData = {
  userName: string
  phone: string
  additionalInfo: string
  provinces: string
  district: string
  ward: string
  detailAddress: string
}

export default function Checkout() {
  const navigate = useNavigate()
  const cart = useAppSelector((state) => state.cart.cart)
  const cartItems = cart?.attributes.cart_item

  const calculateSumPrice = useCallback((): number => {
    const arrPrice =
      cart &&
      cartItems?.map((item) => {
        const price = Number(item.bb_product.data.attributes.discountPrice || item.bb_product.data.attributes.price)
        return price * item.quantity
      })
    const price =
      arrPrice &&
      arrPrice?.reduce((prev, curr) => {
        return prev + curr
      }, 0)
    return price || 0
  }, [cart, cartItems])
  const [paymentMethod, setPaymentMethod] = useState(true)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { register, control, handleSubmit } = useForm<FormData>()
  const user: User = JSON.parse(getUserToLocalStorage() || '')

  const createOrderMutation = useMutation({
    mutationFn: (data: { body: any; userId: number }) => createOrder(data.body, data.userId)
  })
  const updateProductMutation = useMutation({
    mutationFn: (data: { productId: number; quantity: number }) => updateProduct(data.productId, data.quantity)
  })

  const updateCartMutation = useMutation((cart: { cardId: number; body: BodyUpdate[] }) =>
    updateCart(cart.cardId, cart.body)
  )

  const calculateQuantity = (): number => {
    const arrQuantity =
      cartItems &&
      cartItems.map((item) => {
        return item.quantity
      })

    const quantity =
      arrQuantity &&
      arrQuantity.reduce((prev, curr) => {
        return Number(prev) + Number(curr)
      }, 0)

    return quantity || 0
  }

  useEffect(() => {
    setTotalPrice(calculateSumPrice)
  }, [calculateSumPrice])

  const handlePaymentMethod = () => {
    setPaymentMethod(!paymentMethod)
  }
  const onSubmit = handleSubmit((data: FormData) => {
    createOrderMutation.mutate(
      {
        body: {
          userName: data.userName,
          phone: data.phone,
          address: `${data.provinces}-${data.district}-${data.ward}-${data.detailAddress}`,
          additionalInfo: data.additionalInfo,
          payment: paymentMethod ? 'cash' : 'bank',
          isPayment: paymentMethod === true ? false : true,
          subTotal: calculateSumPrice(),
          total: totalPrice,
          products: cartItems?.map((item) => ({
            productName: item.bb_product.data.attributes.name,
            quantity: item.quantity,
            priceOnProduct:
              Number(item.bb_product.data.attributes.discountPrice) || Number(item.bb_product.data.attributes.price),
            sumPrice:
              (Number(item.bb_product.data.attributes.discountPrice) || Number(item.bb_product.data.attributes.price)) *
              item.quantity,
            bb_product: item.bb_product.data.id
          }))
        },
        userId: user.id
      },
      {
        onSuccess: (data) => {
          data.data.data.attributes.products?.forEach((item: any) => {
            updateProductMutation.mutate(
              {
                productId: item.bb_product.data.id,
                quantity: item.bb_product.data.attributes.inventory - item.quantity
              },
              {
                onSuccess: () => {
                  toast.success('Order has been successfully!', {
                    autoClose: 1000
                  })
                  updateCartMutation.mutate(
                    {
                      cardId: cart?.id as number,
                      body: []
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['cart'] })
                      }
                    }
                  )
                  navigate('/')
                }
              }
            )
          })
        }
      }
    )
  })
  return (
    <div className='bg-[#F8F6F8] flex flex-col'>
      {calculateQuantity() !== 0 ? (
        <form onSubmit={onSubmit}>
          <div className='bg-white my-20 mx-60 border-gray-300 border rounded-xl'>
            <div className='grid grid-cols-12 p-10'>
              {/* infor */}
              <div className='col-span-8 pr-11'>
                <div>
                  <p className='font-bold text-xl mt-6 mb-5'>Thông tin khách hàng</p>
                  <input
                    className='border w-full outline-none rounded-sm p-3'
                    type='email'
                    placeholder='Email'
                    disabled
                    defaultValue={user.email}
                  />
                </div>
                <div>
                  <p className='font-bold text-xl mt-6 mb-5'>Chi tiết thanh toán</p>
                  <div className='flex'>
                    <input
                      className='border outline-none rounded-sm p-3 flex-1 mr-3'
                      type='text'
                      placeholder='Tên'
                      defaultValue={user.username}
                      {...register('userName')}
                    />
                    <input
                      className='border outline-none rounded-sm p-3 flex-1'
                      type='text'
                      placeholder='Số điện thoại'
                      defaultValue={user.phone}
                      {...register('phone')}
                    />
                  </div>
                  <Address control={control} defaultValue={user.address} />
                </div>
                <div>
                  <p className='font-bold text-xl mt-6 mb-5'>Ghi chú</p>
                  <textarea
                    className='border w-full outline-none rounded-sm p-3'
                    placeholder='Ghi chú'
                    {...register('additionalInfo')}
                  />
                </div>

                <div>
                  <p className='font-bold text-xl mt-6 mb-5'>Phương thức thanh toán</p>
                  <div className='border'>
                    <div className='flex items-center p-3 border-b bg-[#F8F6F8]'>
                      <input
                        defaultChecked
                        type='radio'
                        id='bank'
                        name='paymentMethod'
                        value={0}
                        onChange={handlePaymentMethod}
                      />
                      <label htmlFor='bank' className='ml-2 text-sm font-medium text-gray-900 '>
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                    {paymentMethod && (
                      <div className='p-5 border-b'>
                        Make your payment directly into our bank account. Please use your Order ID as the payment
                        reference. Your order will not be shipped until the funds have cleared in our account.
                      </div>
                    )}
                    <div className='flex items-center border-b p-3 bg-[#F8F6F8]'>
                      <input type='radio' id='cash' name='paymentMethod' value={1} onChange={handlePaymentMethod} />
                      <label htmlFor='cash' className='ml-2 text-sm font-medium text-gray-900'>
                        Thanh toán qua ngân hàng
                      </label>
                    </div>
                    {!paymentMethod && <div className='p-5'>Pay with cash upon delivery.</div>}
                  </div>
                </div>
                <button
                  disabled={createOrderMutation.isLoading || updateProductMutation.isLoading}
                  type='submit'
                  className='w-full rounded-sm p-3 bg-slate-400 my-5 text-white font-bold'
                >
                  Xác nhận thanh toán
                </button>
              </div>
              {/* order */}
              <div className='col-span-4'>
                <p className='font-bold text-xl mt-6 mb-5'>Đơn hàng của bạn</p>
                <div className='border rounded-md'>
                  <div className='flex justify-between font-bold text-gray-500 border-b p-4'>
                    <p>Product</p>
                    <p>Subtotal</p>
                  </div>
                  <div className=' border-b '>
                    {cartItems?.map((item) => {
                      return (
                        <div key={item.id} className='flex justify-between p-4 items-center'>
                          <div className='flex items-center'>
                            <img
                              src={item.bb_product.data.attributes.productImage.data[0].attributes.url}
                              width={50}
                              height={50}
                              alt={item.bb_product.data.attributes.name}
                              className='rounded-sm'
                            />
                            <p className='truncate ml-2 max-w-[150px]'>{item.bb_product.data.attributes.name}</p>
                          </div>
                          <div>x{item.quantity}</div>
                          <div>
                            {formatCurrency(
                              Number(
                                item.bb_product.data.attributes.discountPrice || item.bb_product.data.attributes.price
                              ) * item.quantity
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className='flex justify-between p-4 border-b items-center   '>
                    <div className='font-bold text-gray-500'>Subtotal</div>
                    <div>{formatCurrency(calculateSumPrice())}</div>
                  </div>
                  <div className='flex justify-between p-4 items-center'>
                    <div className='font-bold text-xl text-gray-600'>Total</div>
                    <div>{formatCurrency(totalPrice)}</div>
                  </div>
                </div>
                {/* <div className='flex py-3'>
                <input
                  type='text'
                  placeholder='Ma khuyen mai'
                  className='border w-full outline-none rounded-sm p-3 flex-[2] mr-1'
                />
                <button className='rounded-sm p-3 text-lg font-bold bg-slate-500 text-white flex-1 ml-1'>
                  Ap dung
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className='flex flex-col items-center bg-white p-7'>
          <img
            src='https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png'
            alt='Empty cart'
            className='max-w-xs '
          />
          <Link className='p-3 bg-pink-200 rounded shadow-sm' to={'/'}>
            Giỏ hàng rỗng hãy quay trở lại trang mua hàng
          </Link>
        </div>
      )}
    </div>
  )
}
