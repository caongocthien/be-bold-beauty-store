import { Link } from 'react-router-dom'
import { formatCurrency, generateNameId } from '~/utils/utils'

interface Props {
  id: number
  imgUrl: string
  name: string
  price: number
  price_discount?: number
}

export default function Product({ id, imgUrl, name, price, price_discount }: Props) {
  return (
    <Link to={`/product/${generateNameId({ name: name, id: id })}`}>
      <img className='h-auto w-full' src={imgUrl} alt='' />
      <div className='mt-3'>
        <div className='mt-1 text-sm truncate'>{name}</div>
        <div className='mt-1 text-sm'>
          <span className='line-through text-gray-500 font-bold'>đ{formatCurrency(Number(price))}</span>
          <span className='ml-1 font-bold text-gray-700'>đ{formatCurrency(Number(price_discount))}</span>
        </div>
      </div>
    </Link>
  )
}
