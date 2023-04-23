import * as yup from 'yup'

export const schema = yup
  .object({
    email: yup.string().required('Email is required').email('Email invalidate'),
    username: yup
      .string()
      .required('User name is required')
      .min(6, 'User name should be 6 - 60 characters')
      .max(60, 'User name should be 6 - 60 characters'),
    phone: yup
      .string()
      .required('Phone is required')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Phone invalidate'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password should be 6 - 60 characters')
      .max(60, 'Password should be 6 - 60 characters'),
    confirm_password: yup
      .string()
      .required('Confirm password is required')
      .min(6, 'Confirm password should be 6 - 60 characters')
      .max(60, 'Confirm password should be 6 - 60 characters')
      .oneOf([yup.ref('password')], 'Confirm password is not match'),
    identifier: yup
      .string()
      .required('Email or User name is required')
      .min(6, 'Email or User name should be 6 - 60 characters')
      .max(60, 'Email or User name should be 6 - 60 characters')
  })
  .required()

export type FormData = yup.InferType<typeof schema>
