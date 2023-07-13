import { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from '../layouts/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import { useAppSelector } from './hooks'
// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import Profile from '../pages/Profile'
// import Product from '../pages/ProductDetail'
// import Products from '../pages/Products'
// import Cart from '~/pages/Cart'
// import Checkout from '~/pages/Checkout'
// import NotFound from '~/pages/NotFound'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Profile = lazy(() => import('../pages/Profile'))
const Product = lazy(() => import('../pages/ProductDetail'))
const Products = lazy(() => import('../pages/Products'))
const Cart = lazy(() => import('../pages/Cart'))
const Checkout = lazy(() => import('../pages/Checkout'))
const NotFound = lazy(() => import('../pages/NotFound'))

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
          <Suspense>
            <Home />
          </Suspense>
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
              <Suspense>
                <Profile />
              </Suspense>
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/product/:nameId',
      element: (
        <MainLayout>
          <Suspense>
            <Product />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/products/all-products',
      element: (
        <MainLayout>
          <Suspense>
            <Products />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/products/category/:nameId',
      element: (
        <MainLayout>
          <Suspense>
            <Products />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '/products/brand/:nameId',
      element: (
        <MainLayout>
          <Suspense>
            <Products />
          </Suspense>
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
              <Suspense>
                <Cart />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/checkout',
          element: (
            <MainLayout>
              <Suspense>
                <Checkout />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}
