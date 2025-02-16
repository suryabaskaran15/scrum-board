import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./context/QueryClient"
import AppRoutes from "./router/router"


function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </>
  )
}

export default App
