import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import React from 'react'
import { Swiper as SwiperType, SwiperModule } from 'swiper/types'

interface Props {
  slideItems: React.ReactNode[]
  slidesPerView?: number
  spaceBetween?: number
  classNameSlideItem?: string
  modules?: SwiperModule[]
  onSlideChange?: ((swiper: SwiperType) => void) | undefined
  navigation?: boolean
}
export default function Slider({
  slideItems,
  slidesPerView = 3,
  spaceBetween = 10,
  classNameSlideItem = 'border flex justify-center',
  navigation = false,
  modules,
  onSlideChange
}: Props) {
  return (
    <Swiper
      navigation={navigation}
      modules={modules}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={true}
      grabCursor={true}
      onSlideChange={onSlideChange}
    >
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
