import { Navigation, Pagination, Scrollbar, A11y } from 'node_modules/swiper/swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Slider from '~/components/Slider'
export default function Home() {
  const brand = [
    {
      img: 'https://logos-world.net/wp-content/uploads/2020/04/LOreal-Logo.png'
    },
    {
      img: 'https://logos-download.com/wp-content/uploads/2016/05/Bior%C3%A9_logo_logotype.png'
    },
    {
      img: 'https://i.pinimg.com/originals/4b/c7/1b/4bc71be1e103635a2f5d1ca0299e42a8.png'
    },
    {
      img: 'https://logos-world.net/wp-content/uploads/2020/04/LOreal-Logo.png'
    },
    {
      img: 'https://logos-download.com/wp-content/uploads/2016/05/Bior%C3%A9_logo_logotype.png'
    },
    {
      img: 'https://i.pinimg.com/originals/4b/c7/1b/4bc71be1e103635a2f5d1ca0299e42a8.png'
    },
    {
      img: 'https://logos-world.net/wp-content/uploads/2020/04/LOreal-Logo.png'
    },
    {
      img: 'https://logos-download.com/wp-content/uploads/2016/05/Bior%C3%A9_logo_logotype.png'
    },
    {
      img: 'https://i.pinimg.com/originals/4b/c7/1b/4bc71be1e103635a2f5d1ca0299e42a8.png'
    }
  ]
  return (
    <div className='w-full'>
      {/* banner 1 */}
      <div className='bg-fixed min-h-[80vh] bg-center bg-no-repeat bg-cover bg-[url("https://thumbs.dreamstime.com/b/beauty-background-various-eco-friendly-cosmetic-skin-care-products-beauty-background-various-eco-friendly-cosmetic-184476996.jpg")]'>
        <div className='flex items-center min-h-[80vh] pl-12'>
          <div className='text-white max-w-screen-sm flex-grow'>
            <div className='text-base mb-5 uppercase'>New in town</div>
            <div className='text-6xl mb-5 capitalize'>The new beatuty collecttion</div>
            <div className='text-2xl mb-5'>
              This new collection brings with it the most exciting lorem ipsum dolor sit amet.
            </div>
            <button className='bg-white text-black mt-3 py-3 px-8 rounded uppercase'>Shop now</button>
          </div>
        </div>
      </div>
      {/* slider brand */}

      <div className='py-8'>
        <Slider
          spaceBetween={20}
          slidesPerView={5}
          slideItems={brand.map((item, index) => {
            return (
              <div key={index}>
                <img src={item.img} alt='' className=' h-36 object-contain' />
              </div>
            )
          })}
        />
      </div>
    </div>
  )
}
