import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import { getProducts } from '~/apis/product.api'
import Product from '~/components/Product'
import ProductSkeleton from '~/components/ProductSkeleton'

export default function Products() {
  const { state, pathname } = useLocation()
  const { id } = useParams()
  const productsQuery = useQuery({
    queryKey: ['products', pathname],
    queryFn: () => getProducts({ [state.query]: `${id}` }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  })
  return (
    <div className='container m-auto '>
      <div className='py-16 mx-5'>
        <div className='text-base text-gray-400 mb-4'>Home/Skin Care</div>
        <div className='text-6xl mb-16'>{state.title}</div>
        <div className='text-lg my-4 flex justify-between text-gray-600'>
          <div>Showing 1-8 of 13 results</div>
          <div>Showing 1-8 of 13 results</div>
        </div>
        {productsQuery.isFetching && (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        )}
        {!productsQuery.isFetching && (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
            {productsQuery.data?.data.data.map((item, index) => {
              return (
                <div key={index} className='border p-4'>
                  <Product
                    id={item.id}
                    imgUrl={item.attributes.productImage.data[0].attributes.url}
                    name={item.attributes.name}
                    price={Number(item.attributes.price)}
                    price_discount={Number(item.attributes.discountPrice)}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
