import { AxiosInstance } from 'axios'
import TokenService from './TokenService'
import NotifyService from './NotifyService'

interface ErrorType {
    timestamp: Date;
    status: number;
    path: string;
    errors: Record<string, string>;  // Map<String, String> karşılığı
}

export function httpClientErrorInterceptor(httpClient: AxiosInstance): void {
  // Request interceptor
  httpClient.interceptors.request.use(
    config => {
      // Her isteğin öncesinde yapılacak işlemler (örneğin, header eklemek)

      const token = TokenService.getToken() // Token'i al

      if (token) {
        config.headers.Authorization = `Bearer ${token}` // Header'a Bearer token ekle
      }

      return config
    },
    error => {
      // İstek hataları burada yakalanır
      return Promise.reject(error)
    }
  )

  // Response interceptor
  httpClient.interceptors.response.use(
    response => {
      // Yanıt başarılı ise yapılacak işlemler
      //   if (response.status >= 200 && response.status < 300) {
      //     console.log('Success:', response.status)
      //   } else if (response.status >= 300 && response.status < 400) {
      //     console.log('Redirection:', response.status)
      //   }

      return response
    },
    error => {
      if (error.response) {
        // Sunucu hatası
        switch (error.response.status) {
          case 400:
            const errorResponse: ErrorType = error.response.data
            //console.log(error)
            console.error(error.response)
            NotifyService.messageHot(`${errorResponse.errors["error"]}`, {type:'error'})
            break
          case 401:
            NotifyService.messageHot('Lütfen Giriş Yapın', {type:'error'})
            break
          case 403:
            NotifyService.messageHot('Yetkisiz İşlem', {type:'error'})
            break
          case 404:
            NotifyService.messageHot('Yetkisiz İşlem', {type:'error'})
            break
          case 500:
            NotifyService.messageHot('Server Error', {type:'error'})
            break
          default:
            NotifyService.messageHot('Beklenmeyen bir hata', {type:'error'})

          //console.error(`Hata ${error.response.status}:`, error.response.data)
        }
      }
     

       else if (error.request) {
         // İstek yapıldı ama yanıt alınamadı
         //console.error('No response received from API')
         NotifyService.messageHot('İstek yapıldı ama yanıt alınamadı! Api çalışmıyor olabilir!!!', {type:'error'})
       } else {
         // İstek hazırlanırken hata oluştu
         //console.error(`Request Error: ${error.message}`)
         NotifyService.messageHot('İstek hazırlanırken hata oluştu!', {type:'error'})
       }

      return Promise.reject(error)
    }
  )
}