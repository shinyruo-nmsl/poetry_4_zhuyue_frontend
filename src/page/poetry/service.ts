import { request } from "../../util/httpUtil";
import { Pagination, PaginationQuery } from "../../global-type/model";

export interface AuthorAndKeyWordsQuery extends PaginationQuery {
  keyword1: string;
  keyword2: string;
  author?: string;
}

export type PoetryPagination = Pagination<{
  id: number;
  title: string;
  author: string;
  content: string;
}>;

export function fetchGetPoetriesByAuthorAndKeyWords(
  query: AuthorAndKeyWordsQuery
) {
  return request<PoetryPagination>({
    method: "get",
    url: "/poetry/getPoetriesByAuthorAndKeyWords",
    params: { ...query },
  });
}
