import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FormData as Schema, schema } from '~/utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { login } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import { useAppDispatch } from '~/hooks/hooks'
import { saveJwtToLocalStorage } from '~/slice/auth/authSlice'

type FormData = Pick<Schema, 'identifier' | 'password'>

const loginSchema = schema.pick(['identifier', 'password'])

export default function Login() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        dispatch(saveJwtToLocalStorage(data.data))
        reset()
        toast.success('Login has been successfully!', {
          autoClose: 1000
        })
      },
      onError: (error: any) => {
        toast.error(error.response.data.error.message, {
          autoClose: 1000
        })
      }
    })
  })
  return (
    <div className='py-60 h-[calc(100vh_-_81px)]  bg-center bg-no-repeat bg-cover bg-white bg-[url("https://static.vecteezy.com/system/resources/previews/002/690/523/original/white-3d-pedestal-background-with-hibiscus-flower-for-cosmetic-product-presentation-fashion-magazine-copy-space-illustration-free-vector.jpg")]'>
      <div className=' bg-[#F6EDF0] p-10 max-w-xl  m-auto rounded-xl'>
        <form onSubmit={onSubmit} className='flex flex-col '>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='text'
            placeholder='Email or User name'
            {...register('identifier')}
          />
          <div className='mt-1 text-red-600 min-h-[2rem]'>{errors.identifier?.message}</div>
          <input
            className='p-3 w-full outline-none border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm '
            type='password'
            placeholder='Password'
            {...register('password')}
          />
          <div className='mt-1 text-red-600 min-h-[2rem]'>{errors.password?.message}</div>
          <button disabled={loginMutation.isLoading} className='p-3 bg-[#f7d0dd] text-gray-700 hover:opacity-80 '>
            {loginMutation.isLoading ? (
              <>
                <svg
                  aria-hidden='true'
                  role='status'
                  className='inline w-4 h-4 mr-3 text-white animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className='mt-5 flex justify-between items-center'>
          <Link to={'/'}>Quên mật khẩu</Link>
          <div>
            Bạn chưa chưa tài khoản?{' '}
            <Link to={'/register'} className='ml-1 text-[#da86a2]'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
