import axios, { Method } from "axios";
import { useState } from "react";

axios.defaults.baseURL = "http://localhost:3000";

const useRequest = () => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const postData = async (
    incomingData: any,
    method: Method = "POST",
    url: string = "/users"
  ) => {
    try {
      setIsloading(true);
      const { data } = await axios({ method, url, data: { ...incomingData } });
      setResponse(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsloading(false);
    }
  };

  return { postData, response, error, isLoading };
};

export default useRequest;
