import qs from 'qs';

import { addDays } from '@/utils';
import { fetchData, fromStrapiResponse } from '@/utils/strapi';
import { Attributes, Meta, StrapiResponse } from '@/interfaces/strapi';

export type Post = Attributes;

export interface PostResponse {
  posts: Post[];
  meta: Meta;
}

export const getAllPostsBetweenDates = async ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}): Promise<PostResponse> => {
  const query = qs.stringify({
    filters: {
      $and: [
        {
          publishedAt: {
            $gt: startDate ?? new Date('1900-01-01'),
          },
        },
        {
          publishedAt: {
            $lt: endDate ?? addDays(new Date(), 1),
          },
        },
      ],
    },
  });

  const response: StrapiResponse = await fetchData<StrapiResponse>(
    `${process.env.TINCODE_API_URL}/posts?${query}`
  );

  return {
    posts: fromStrapiResponse<Post>(response as StrapiResponse),
    meta: response.meta,
  };
};
