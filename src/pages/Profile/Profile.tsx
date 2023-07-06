import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateUser } from '~/apis/auth.api'
import Address from '~/components/Address'
import { User } from '~/types/user.type'
import { getUserToLocalStorage, setUserToLocalStorage } from '~/utils/utils'

type FormData = {
  phone: string
  provinces: string
  district: string
  detailAddress: string
  ward: string
}

export default function Profile() {
  const user: User = JSON.parse(getUserToLocalStorage() || '')

  const { register, control, handleSubmit } = useForm<FormData>()

  const updateUserMutation = useMutation({
    mutationFn: (user: { body: Pick<User, 'phone' | 'address'>; id: number }) => updateUser(user.body, user.id)
  })

  const onSubmit = handleSubmit((data) => {
    const address = `${data.provinces}-${data.district}-${data.ward}-${data.detailAddress}`
    const phone = data.phone
    updateUserMutation.mutate(
      { body: { phone, address }, id: user.id },
      {
        onSuccess: (data) => {
          setUserToLocalStorage(JSON.stringify(data.data))
          toast.success('Update user has been successfully!', {
            autoClose: 500
          })
        }
      }
    )
  })

  return (
    <div className='flex flex-col items-center my-10'>
      <p className='text-2xl font-bold uppercase p-10'>Thông tin tài khoản</p>
      <form onSubmit={onSubmit}>
        <div className='flex text-xl py-3 items-center'>
          <p className='min-w-[5rem]'>User:</p>
          <input className='ml-4 p-1' disabled defaultValue={user.username} />
        </div>
        <div className='flex text-xl py-3 items-center'>
          <p className='min-w-[5rem]'>Email:</p>
          <input className='ml-4 p-1' disabled defaultValue={user.email} />
        </div>
        <div className='flex text-xl py-3 items-center'>
          <p className='min-w-[5rem]'>Phone:</p>
          <input className='ml-4 p-1' defaultValue={user.phone} {...register('phone')} />
        </div>
        <Address control={control} defaultValue={user.address} />

        <button type='submit' className='float-left bg-blue-500 p-2 shadow-sm rounded'>
          Update
        </button>
      </form>
    </div>
  )
}
