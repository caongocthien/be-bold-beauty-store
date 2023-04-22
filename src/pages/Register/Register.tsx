import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormData as Schema, schema } from '~/utils/rule'
import { registerUser } from '~/apis/auth.api'
type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerUserMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerUser(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerUserMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success('Register has been successfully!')
      },
      onError: (errors: any) => {
        toast.error(errors.response.data.error.message)
      }
    })
  })
  return (
    <div className='py-44 h-[calc(100vh_-_81px)] bg-center bg-no-repeat bg-cover bg-white bg-[url("https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg")]'>
      <div className=' bg-[#F6EDF0] p-10 max-w-xl  m-auto '>
        <form onSubmit={onSubmit} className='flex flex-col '>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='text'
            placeholder='Email'
            {...register('email')}
          />
          <div className='mt-1 text-red-600 min-h-[2rem] text-sm'>{errors.email?.message}</div>

          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='text'
            placeholder='User name'
            {...register('username')}
          />
          <div className='mt-1 text-red-600 min-h-[2rem] text-sm'>{errors.username?.message}</div>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='text'
            placeholder='Phone'
            {...register('phone')}
          />
          <div className='mt-1 text-red-600 min-h-[2rem] text-sm'>{errors.phone?.message}</div>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='password'
            placeholder='Password'
            {...register('password')}
          />
          <div className='mt-1 text-red-600 min-h-[2rem] text-sm'>{errors.password?.message}</div>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='password'
            placeholder='Confirm password'
            {...register('confirm_password')}
          />
          <div className='mt-1 text-red-600 min-h-[2rem] text-sm'>{errors.confirm_password?.message}</div>
          <button className='p-3 bg-[#f7d0dd] text-gray-700 hover:opacity-80 uppercase '>Sign Up</button>
        </form>
        <div className='mt-5 flex justify-between items-center'>
          <div>
            Bạn đã có tài khoản?{' '}
            <Link to={'/login'} className='ml-1 text-[#da86a2]'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
