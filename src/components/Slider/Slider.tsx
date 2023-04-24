import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import React from 'react'
interface Props {
  slideItems: React.ReactNode[]
  slidesPerView?: number
  spaceBetween?: number
  classNameSlideItem?: string
}
export default function Slider({
  slideItems,
  slidesPerView = 3,
  spaceBetween = 10,
  classNameSlideItem = 'border flex justify-center'
}: Props) {
  return (
    <Swiper spaceBetween={spaceBetween} slidesPerView={slidesPerView} pagination={true} grabCursor={true}>
      {slideItems.map((item, index) => {
        return (
          <SwiperSlide className={classNameSlideItem} key={index}>
            {item}
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
