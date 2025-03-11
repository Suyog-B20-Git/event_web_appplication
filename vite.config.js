import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['redux-thunk','redux-debounced'],
  },
  server: {
    host: '0.0.0.0', // This binds the server to all network interfaces.
  },
})
