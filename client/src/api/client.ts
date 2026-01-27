import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
})

// Request interceptor - logging
apiClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        config.data
      )
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors consistently
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.data
      )
    }
    return response
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const message =
        (error.response.data as { message?: string })?.message || error.message

      switch (status) {
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Server error - please try again later')
          break
        default:
          console.error(`API Error: ${message}`)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - please check your connection')
    } else {
      // Something else happened
      console.error('Request error:', error.message)
    }

    return Promise.reject(error)
  }
)

// Generic API methods with type safety
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data)
}

export default apiClient
