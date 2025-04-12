import type { Tag } from '../models';

export interface GetTagsResponse {
  /** The array of tags returned by the API call */
  tags: Array<Tag>;
}

export type CreateTagResponse = Tag;
