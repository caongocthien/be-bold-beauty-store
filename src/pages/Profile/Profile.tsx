import { useMutation, useQuery } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateUser } from '~/apis/auth.api'
import { getProvinces } from '~/apis/provinces.api'
import { Districts, Provinces, Ward } from '~/types/provinces.type'
import { User } from '~/types/user.type'
import { getUserToLocalStorage, setUserToLocalStorage } from '~/utils/utils'

type FormData = {
  phone: string
  provinces: string
  district: string
  ward: string
}

export default function Profile() {
  const user: User = JSON.parse(getUserToLocalStorage() || '')
  const userAddress = user.address && user.address.split('-')

  const { register, control, handleSubmit } = useForm<FormData>()

  const updateUserMutation = useMutation({
    mutationFn: (user: { body: Pick<User, 'phone' | 'address'>; id: number }) => updateUser(user.body, user.id)
  })

  const getProvincesQuery = useQuery({
    queryKey: ['provinces'],
    queryFn: getProvinces
  })

  const [provinces, setProvinces] = useState<Provinces[]>([])
  const [districts, setDistricts] = useState<Districts[]>([])
  const [wards, setWards] = useState<Ward[]>([])

  useLayoutEffect(() => {
    setProvinces(getProvincesQuery.data?.data)
  }, [getProvincesQuery.data?.data])

  useLayoutEffect(() => {
    setDistricts(getProvincesQuery.data?.data.find((item: Provinces) => item.code === Number(userAddress[0])).districts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProvincesQuery.data?.data])

  useLayoutEffect(() => {
    setWards(
      getProvincesQuery.data?.data
        .find((item: Provinces) => item.code === Number(userAddress[0]))
        .districts.find((item: Districts) => item.code === Number(userAddress[1])).wards
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProvincesQuery.data?.data])

  function handleChangeProvinces(event: React.ChangeEvent<HTMLSelectElement>) {
    const provinceCurrent = Number(event.target.value)
    const province = provinces.find((item) => item.code === provinceCurrent)
    setDistricts(province?.districts as Districts[])
    setWards([])
  }

  const handleChangeDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtCurrent = Number(event.target.value)
    const district = districts.find((item) => item.code === districtCurrent)
    setWards(district?.wards as Ward[])
  }

  const onSubmit = handleSubmit((data) => {
    const address = `${data.provinces}-${data.district}-${data.ward}`
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
        <div className='flex text-xl py-3 items-center'>
          <p className='min-w-[5rem]'>Tỉnh:</p>
          <Controller
            control={control}
            name='provinces'
            defaultValue={userAddress[0]}
            render={({ field: { onChange, value } }) => (
              <select
                className='ml-4 p-1'
                value={value}
                onChange={(e) => {
                  onChange(e)
                  handleChangeProvinces(e)
                }}
              >
                <option>Chọn Tỉnh / Thành Phố</option>
                {provinces &&
                  provinces.map((province) => {
                    return (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    )
                  })}
              </select>
            )}
          />
        </div>
        <div className='flex text-xl py-3 items-center'>
          <p className='min-w-[5rem]'>Quận:</p>
          <Controller
            control={control}
            name='district'
            defaultValue={userAddress[1]}
            render={({ field: { onChange, value } }) => (
              <select
                className='ml-4 p-1'
                value={value}
                onChange={(e) => {
                  onChange(e)
                  handleChangeDistrict(e)
                }}
              >
                <option>Chọn Quận / Huyện</option>
                {districts &&
                  districts.map((district) => {
                    return (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    )
                  })}
              </select>
            )}
          />
        </div>
        <div className='flex text-xl py-3 items-center'>
          <p className='min-w-[5rem]'>Phường:</p>
          <Controller
            control={control}
            name='ward'
            defaultValue={userAddress[2]}
            render={({ field: { onChange, value } }) => (
              <select
                className='ml-4 p-1'
                value={value}
                onChange={(e) => {
                  onChange(e)
                }}
              >
                <option>Chọn Phường / Xã</option>
                {wards &&
                  wards.map((ward) => {
                    return (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    )
                  })}
              </select>
            )}
          />
        </div>

        <button type='submit' className='float-left bg-blue-500 p-2 shadow-sm rounded'>
          Update
        </button>
      </form>
    </div>
  )
}
