import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import {

  RouterProvider,
} from "react-router-dom";
import route from './routes/route.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right"
          reverseOrder={false} />
        <RouterProvider router={route} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode >,
)
