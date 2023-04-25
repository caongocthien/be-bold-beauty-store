import React from 'react'

type title = {
  title_1?: string
  title_2?: string
  title_3?: string
}

interface Props {
  image: string
  title?: title
  classNameBanner?: string
  classNameTitle?: string
}

export default function Banner({ image, title, classNameBanner = 'min-h-[80vh]', classNameTitle }: Props) {
  return (
    <div className={`${classNameBanner} bg-fixed bg-center bg-no-repeat bg-cover bg-[url("${image}")]`}>
      <div className={`${classNameTitle} flex items-center min-h-[80vh] pl-12`}>
        <div className='text-white max-w-screen-sm flex-grow'>
          <div className='text-base mb-5 uppercase'>{title?.title_1}</div>
          <div className='text-6xl mb-5 capitalize'>{title?.title_2}</div>
          <div className='text-2xl mb-5'>{title?.title_3}</div>
          <button className='bg-white text-black mt-3 py-3 px-8 rounded uppercase'>Shop now</button>
        </div>
      </div>
    </div>
  )
}
