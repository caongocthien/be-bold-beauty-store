import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterLayout from '../layouts/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import Profile from '../pages/Profile'
import { useAppSelector } from './hooks'
import Product from '../pages/ProductDetail'
import Products from '../pages/Products'
import Cart from '~/pages/Cart'

export default function useRouteElement() {
  const isAuthentication = useAppSelector((state) => state.auth.isAuthentication)

  const ProtectedRoute = () => {
    return isAuthentication ? <Outlet /> : <Navigate to='/login' />
  }
  const RejectedRoute = () => {
    return !isAuthentication ? <Outlet /> : <Navigate to='/' />
  }

  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/product/:nameId',
      element: (
        <MainLayout>
          <Product />
        </MainLayout>
      )
    },
    {
      path: '/products/all-products',
      element: (
        <MainLayout>
          <Products />
        </MainLayout>
      )
    },
    {
      path: '/products/category/:nameId',
      element: (
        <MainLayout>
          <Products />
        </MainLayout>
      )
    },
    {
      path: '/products/brand/:nameId',
      element: (
        <MainLayout>
          <Products />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/cart',
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
