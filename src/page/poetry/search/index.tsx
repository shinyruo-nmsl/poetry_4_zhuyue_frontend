import { useCallback, useState } from "react";
import { Input, Button } from "antd";

import { withLogin } from "../../../hoc/login";
import {
  fetchGetPoetriesByAuthorAndKeyWords,
  splitPoetryContentByKeyWords,
  PoetryPagination,
} from "./service";
import PaginationTable from "../../../component/PaginationTable";
import "./index.less";

function PoetrySearch() {
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [author, setAuthor] = useState("");

  const [pageNo, setPageNo] = useState(0);
  const [limit, setLimit] = useState(10);

  const [poetryPagination, setPoetryPagination] = useState<PoetryPagination>();

  const tableColumns = [
    {
      title: "名字",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      render: useCallback(
        (text: string) => {
          const fragments = splitPoetryContentByKeyWords(
            text,
            keyword1,
            keyword2
          );
          return (
            <div className="poetry-content">
              {fragments.map((frag, index) => (
                <span
                  key={index}
                  className={
                    [keyword1, keyword2].includes(frag) ? "keyword" : ""
                  }
                >
                  {frag}
                </span>
              ))}
            </div>
          );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [poetryPagination]
      ),
      width: 750,
    },
  ];

  const handleChangePage = async (no: number, size: number) => {
    setPageNo(no);
    setLimit(size);
    const data = await fetchGetPoetriesByAuthorAndKeyWords({
      pageNo: no,
      limit: size,
      keyword1,
      keyword2,
      author,
    });
    setPoetryPagination(data);
  };

  const handleClickSearchButton = async () => {
    setPageNo(0);
    const data = await fetchGetPoetriesByAuthorAndKeyWords({
      pageNo: 0,
      limit,
      keyword1,
      keyword2,
      author,
    });
    setPoetryPagination(data);
  };

  return (
    <div className="poetry-search">
      <div className="search">
        <div className="author">
          <span>作者：</span>
          <Input
            placeholder="请输入作者"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></Input>
        </div>
        <div className="keyword">
          <span>关键词1：</span>
          <Input
            placeholder="请输入关键词"
            value={keyword1}
            onChange={(e) => setKeyword1(e.target.value)}
          ></Input>
        </div>
        <div className="keyword">
          <span>关键词2：</span>
          <Input
            placeholder="请输入关键词"
            value={keyword2}
            onChange={(e) => setKeyword2(e.target.value)}
          ></Input>
        </div>
        <Button onClick={handleClickSearchButton}>搜索</Button>
      </div>

      <PaginationTable
        tableProps={{
          columns: tableColumns,
          rowKey: (row) => row.id,
          scroll: { y: 600 },
        }}
        paginationData={poetryPagination}
        pageNo={pageNo}
        limit={limit}
        onChangePage={handleChangePage}
      ></PaginationTable>
    </div>
  );
}

const Search = withLogin(PoetrySearch);

export default Search;
