import type { Tag } from '../models';
export interface GetTagsResponse {
    tags: Array<Tag>;
}
export type CreateTagResponse = Tag;
