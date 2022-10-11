import axios from "axios";
import { useCallback, useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3000";

export interface RequestResultProps {
  meta: {
    total: number;
    page: number;
    limit: number;
    count: number;
  };
  data: {
    id: number;
    name: string;
    githubUser: string;
    quantityFollowers: number;
    quantityFollowing: number;
    quantityStars: number;
    lastYearContributions: number;
    avatarUrl: string;
    organization?: string;
    localization?: string;
  }[];
}

const useGetList = (route = "/users") => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getRefreshedData = useCallback(
    async (page = 0, name = "") => {
      try {
        setIsloading(true);
        const theData = await axios.get<RequestResultProps>(route, {
          params: {
            limit: 10,
            page: page,
            filter: {
              name,
            },
          },
        });
        setResponse(theData.data);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsloading(false);
      }
    },
    [route]
  );

  useEffect(() => {
    (async function () {
      await getRefreshedData();
    })();
  }, [getRefreshedData]);

  return { response, error, isLoading, getRefreshedData };
};

export default useGetList;
