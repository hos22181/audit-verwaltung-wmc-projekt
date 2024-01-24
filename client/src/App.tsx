import AuditTable from './components/Audit/AuditTable'
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuditTable />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
