import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
 
interface UseAxiosReturn<T> {
  data: T | null; 
  loading: boolean;  
  error: AxiosError | null; 
  makeRequest: (config: AxiosRequestConfig) => Promise<void>;  
}

const useAxios = <T>(): UseAxiosReturn<T> => {
  const [data, setData] = useState<T | null>(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<AxiosError | null>(null);  
 
  const makeRequest = async (config: AxiosRequestConfig) => {
    setLoading(true); 
    setError(null);  

    try {
      const response = await axios(config);  
      setData(response.data as T);  
    } catch (error) {
      setError(error as AxiosError); 
    } finally {
      setLoading(false);  
    }
  };

  return { data, loading, error, makeRequest };
};

export default useAxios;