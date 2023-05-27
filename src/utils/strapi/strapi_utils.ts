import { StrapiResponse } from '@/interfaces/strapi';

export const fetchData = async <T>(request: RequestInfo): Promise<T> => {
  const response = await fetch(request);
  const body = await response.json();

  return body;
};

export const fromStrapiResponse = <T>(response: StrapiResponse): T[] => {
  const { data } = response;
  const result: T[] = [];

  data.forEach(({ attributes }) => {
    result.push(attributes as T);
  });

  return result;
};
