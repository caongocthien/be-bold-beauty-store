import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Address from '~/components/Address'
import { useAppDispatch, useAppSelector } from '~/hooks/hooks'
import { User } from '~/types/user.type'
import { formatCurrency, getUserToLocalStorage } from '~/utils/utils'

export default function Checkout() {
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
  const [payment, setPayment] = useState(true)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { register, control, handleSubmit } = useForm()
  const user: User = JSON.parse(getUserToLocalStorage() || '')

  useEffect(() => {
    setTotalPrice(calculateSumPrice)
  }, [calculateSumPrice])

  const handlePayment = () => {
    setPayment(!payment)
  }
  return (
    <div className='bg-[#F8F6F8] flex flex-col'>
      <form action=''>
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
                  />
                  <input
                    className='border outline-none rounded-sm p-3 flex-1'
                    type='text'
                    placeholder='Số điện thoại'
                    defaultValue={user.phone}
                  />
                </div>
                <Address control={control} />
                <input
                  className='border w-full outline-none rounded-sm p-3'
                  type='text'
                  placeholder='Địa chỉ chi tiết'
                />
              </div>
              <div>
                <p className='font-bold text-xl mt-6 mb-5'>Ghi chú</p>
                <textarea className='border w-full outline-none rounded-sm p-3' placeholder='Ghi chú' />
              </div>

              <div>
                <p className='font-bold text-xl mt-6 mb-5'>Phương thức thanh toán</p>
                <div className='border'>
                  <div className='flex items-center p-3 border-b bg-[#F8F6F8]'>
                    <input defaultChecked type='radio' id='bank' name='payment' value={0} onChange={handlePayment} />
                    <label htmlFor='bank' className='ml-2 text-sm font-medium text-gray-900 '>
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  {payment && (
                    <div className='p-5 border-b'>
                      Make your payment directly into our bank account. Please use your Order ID as the payment
                      reference. Your order will not be shipped until the funds have cleared in our account.
                    </div>
                  )}
                  <div className='flex items-center border-b p-3 bg-[#F8F6F8]'>
                    <input type='radio' id='cash' name='payment' value={1} onChange={handlePayment} />
                    <label htmlFor='cash' className='ml-2 text-sm font-medium text-gray-900'>
                      Thanh toán qua ngân hàng
                    </label>
                  </div>
                  {!payment && <div className='p-5'>Pay with cash upon delivery.</div>}
                </div>
              </div>
              <button className='w-full rounded-sm p-3 bg-slate-400 my-5 text-white font-bold'>
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
              <div className='flex py-3'>
                <input
                  type='text'
                  placeholder='Ma khuyen mai'
                  className='border w-full outline-none rounded-sm p-3 flex-[2] mr-1'
                />
                <button className='rounded-sm p-3 text-lg font-bold bg-slate-500 text-white flex-1 ml-1'>
                  Ap dung
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
