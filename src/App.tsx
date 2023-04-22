import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer, toast } from 'react-toastify'
import useRouteElement from './useRouteElement'

const queryClient = new QueryClient()

function App() {
  const routeElements = useRouteElement()

  return (
    <QueryClientProvider client={queryClient}>
      {routeElements}
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
