import axios, { AxiosResponse } from "axios";
import { httpClientErrorInterceptor } from "./HttpClientErrorInterceptor";

const apiUrl = import.meta.env.VITE_API_URL;
const httpClient = axios.create();
httpClientErrorInterceptor(httpClient)

// URL oluşturma fonksiyonu
const urlBuilder = (url: string): string => {
  return `${apiUrl}/${url}`;
};

// Generic get fonksiyonu
const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const newUrl = urlBuilder(url);
  const response: AxiosResponse<T> = await httpClient.get<T>(newUrl);
  return response;
};

// Generic post fonksiyonu
const post = async <T, B>(body: Partial<B>, url: string): Promise<AxiosResponse<T>> => {
  const newUrl = urlBuilder(url);
  const response: AxiosResponse<T> = await httpClient.post<T>(newUrl, body);
  return response;
};

// Generic put fonksiyonu
const put = async <T, B>(body: Partial<B>, url: string): Promise<AxiosResponse<T>> => {
  const newUrl = urlBuilder(url);
  const response: AxiosResponse<T> = await httpClient.put<T>(newUrl, body);
  return response;
};

// Generic delete fonksiyonu
const del = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const newUrl = urlBuilder(url);
  const response: AxiosResponse<T> = await httpClient.delete<T>(newUrl);
  return response;
};

const HttpClient = {
  get,
  post,
  put,
  delete: del
};

export default HttpClient;
