import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai'

export default function Footer() {
  return (
    <footer className='pb-5 '>
      <div className='bg-[#F6EDF0]'>
        <div className='w-full border-b border-red-200'>
          <div className='flex p-5 py-12  max-w-[1340px] mx-auto items-center justify-between '>
            <div className='text-3xl'>Subscribe to our newsletter</div>
            <form>
              <input className='p-3 outline-none border-none w-96' type='text' placeholder='Your email address...' />
              <button className='ml-2 bg-black text-white text-base uppercase px-7 py-2'>Subcribe</button>
            </form>
          </div>
        </div>
        <div className='w-full border-b border-red-200'>
          <div className='flex p-5 py-12  max-w-[1340px] mx-auto items-center justify-between '>
            <img
              width={104}
              height={49}
              src='https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/logo-regular.png'
              className='py-4'
              alt='Be Bold'
              decoding='async'
              srcSet='https://websitedemos.net/be-bold-beauty-store-04/wp-content/uploads/sites/1117/2022/08/logo-regular.png 1x, https://websitedemos.net/be-bold-beauty-store-02/wp-content/uploads/sites/1117/2022/08/logo-retina.png 2x'
            />
            <div className='grid grid-cols-3 gap-16 text-base'>
              <div>
                <ul>
                  <li className='mb-4'>Shop All</li>
                  <li className='mb-4'>Makeup</li>
                  <li className='mb-4'>SkinCare</li>
                  <li className='mb-4'>Hair Care</li>
                  <li className='mb-4'>About</li>
                  <li className='mb-4'>Contact</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li className='mb-4'>Refund Policy</li>
                  <li className='mb-4'>Term & Conditions</li>
                  <li className='mb-4'>FAQ</li>
                  <li className='mb-4'>Privacy Policy</li>
                </ul>
              </div>
              <div className='flex '>
                <AiFillFacebook className='text-xl mr-3' />
                <AiOutlineTwitter className='text-xl mr-3' />
                <AiFillInstagram className='text-xl mr-3' />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex p-5 py-6  max-w-[1340px] mx-auto items-center justify-between '>
            <div className='text-lg text-[#5b5d5b]'>Copyright © 2023 Be Bold | Powered by Be Bold</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
