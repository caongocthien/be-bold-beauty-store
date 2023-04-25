import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Slider from '~/components/Slider'
import { Link } from 'react-router-dom'
import Banner from '~/components/Banner'
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
  const banner = {
    image:
      'https://thumbs.dreamstime.com/b/beauty-background-various-eco-friendly-cosmetic-skin-care-products-beauty-background-various-eco-friendly-cosmetic-184476996.jpg',
    title: {
      title_1: 'New in town',
      title_2: 'The new beatuty collecttion',
      title_3: 'This new collection brings with it the most exciting lorem ipsum dolor sit amet.'
    }
    // classNameBanner: string,
    // classNameTitle: string
  }
  return (
    <div className='w-full'>
      {/* banner 1 */}
      <Banner image={banner.image} title={banner.title} />

      {/* slider brand */}
      <div className='py-8 px-[1px]'>
        <Slider
          spaceBetween={20}
          slidesPerView={5}
          slideItems={brand.map((item, index) => {
            return (
              <Link to={'/'} key={index}>
                <img src={item.img} alt='' className=' h-36 object-contain' />
              </Link>
            )
          })}
        />
      </div>
    </div>
  )
}
