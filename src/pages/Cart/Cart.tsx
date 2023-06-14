import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { queryClient } from '~/App'
import { BodyUpdate, updateCart } from '~/apis/cart.api'
import { useAppDispatch, useAppSelector } from '~/hooks/hooks'
import { getCart } from '~/slice/cart/cartSlice'
import { Cart } from '~/types/cart.type'
import { formatCurrency, generateNameId } from '~/utils/utils'

export default function Cart() {
  const dispatch = useAppDispatch()

  const cart = useAppSelector((state) => state.cart.cart)
  const cartItems = cart?.attributes.cart_item
  const [cartData, setCartData] = useState<Cart>(cart as Cart)

  const updateCartMutation = useMutation((cart: { cardId: number; body: BodyUpdate[] }) =>
    updateCart(cart.cardId, cart.body)
  )

  const calculateSumPrice = (): number => {
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
  }

  const calculateteQuantity = (): number => {
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

  const deleteProductInCart = (productId: number) => {
    cartItems &&
      updateCartMutation.mutate(
        {
          cardId: cart?.id,
          body: [
            ...cartItems
              .filter((item) => {
                return item.bb_product.data.id !== productId
              })
              .map((item) => ({
                quantity: item.quantity,
                bb_product: item.bb_product.data.id
              }))
          ]
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
          }
        }
      )
  }
  const increaseQuantityCartItem = (id: number) => {
    dispatch(
      getCart(
        cart && {
          ...cart,
          attributes: {
            ...cart?.attributes,
            cart_item: [
              ...cart.attributes.cart_item.map((item) => {
                if (item.bb_product.data.id === id) {
                  return { ...item, quantity: item.quantity + 1 }
                }
                return item
              })
            ]
          }
        }
      )
    )
  }

  const descreaseQuantityCartItem = (id: number) => {
    dispatch(
      getCart(
        cart && {
          ...cart,
          attributes: {
            ...cart?.attributes,
            cart_item: [
              ...cart.attributes.cart_item.map((item) => {
                if (item.bb_product.data.id === id) {
                  return { ...item, quantity: item.quantity - 1 }
                }
                return item
              })
            ]
          }
        }
      )
    )
  }

  const handleUpdateCart = (id: number, event: React.FocusEvent<HTMLInputElement, Element>) => {
    cart &&
      updateCartMutation.mutate(
        {
          cardId: cart.id as number,
          body: [
            ...cart.attributes.cart_item.map((item) => {
              if (item.id === id) {
                return {
                  quantity: Number(event.target.value),
                  bb_product: item.bb_product.data.id
                }
              }
              return {
                quantity: item.quantity,
                bb_product: item.bb_product.data.id
              }
            })
          ]
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            setCartData(cart)
            toast.success('Thêm vào giỏ hàng thành công.', {
              autoClose: 1000
            })
          }
        }
      )
  }

  return (
    <div className='container m-auto'>
      <div className=' mx-5'>
        <div className='flex justify-center text-4xl capitalize py-10'>Giỏ hàng</div>
        {calculateteQuantity() !== 0 ? (
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500 '>
              <thead className='text-gray-700 uppercase bg-gray-100 text-center'>
                <tr>
                  <th scope='col' className='px-6 py-3 rounded-l-lg'>
                    Sản phẩm
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Số lượng
                  </th>
                  <th scope='col' className='px-6 py-3 rounded-r-lg'>
                    Giá
                  </th>
                  <th scope='col' className='px-6 py-3 rounded-r-lg'>
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {cartItems?.map((item) => (
                  <tr key={item.id} className='text-base bg-white border-b-2'>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                      <Link
                        to={`/product/${generateNameId({
                          name: item.bb_product.data.attributes.name,
                          id: item.bb_product.data.id
                        })}`}
                        className='flex items-center '
                      >
                        <img
                          src={item.bb_product.data.attributes.productImage.data[0].attributes.url}
                          alt=''
                          className='w-16 pr-4'
                        />
                        {item.bb_product.data.attributes.name}
                      </Link>
                    </th>
                    <td className='px-6 py-4'>
                      <div>
                        <button
                          className='border px-3'
                          disabled={item.quantity <= 1}
                          onClick={() => descreaseQuantityCartItem(item.bb_product.data.id)}
                        >
                          -
                        </button>
                        <input
                          className='border max-w-[40px] text-center outline-none'
                          type='number'
                          value={item.quantity}
                          onBlur={(event) => handleUpdateCart(item.id, event)}
                          // onChange={(event) => handleUpdateCart(item.id, event)}
                        />
                        <button
                          className='border px-3'
                          onClick={() => increaseQuantityCartItem(item.bb_product.data.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      {formatCurrency(
                        Number(item.bb_product.data.attributes.discountPrice || item.bb_product.data.attributes.price) *
                          item.quantity
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      <button onClick={() => deleteProductInCart(item.bb_product.data.id)}>Xóa sản phẩm</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className='text-center'>
                <tr className='text-base font-semibold text-gray-900 '>
                  <th scope='row' className='px-6 py-3 text-base'>
                    Tổng
                  </th>
                  <td className='px-6 py-3'>{calculateteQuantity()}</td>
                  <td className='px-6 py-3'>{formatCurrency(calculateSumPrice())}</td>
                </tr>
              </tfoot>
            </table>
            <div>
              <button
                disabled={updateCartMutation.isLoading}
                className='float-right bg-pink-200 px-10 py-3 rounded-md shadow-sm'
              >
                Thanh toán
              </button>
            </div>
          </div>
        ) : (
          <div className='flex justify-center'>
            <img
              src='https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png'
              alt='Empty cart'
              className='max-w-xs '
            />
          </div>
        )}
      </div>
    </div>
  )
}
