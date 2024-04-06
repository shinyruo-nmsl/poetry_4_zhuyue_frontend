import { Table, TableProps, Pagination as PaginationComp } from "antd";

import { Pagination } from "../../global-type/model";

import "./index.less";

interface Props<T> {
  tableProps?: TableProps<T>;
  paginationData?: Pagination<T>;
  data?: T[];
  pageNo: number;
  limit: number;
  onChangePage: (no: number, size: number) => void;
}

function PaginationTable<T extends Record<any, any>>(props: Props<T>) {
  const {
    tableProps = {},
    paginationData,
    data = [],
    pageNo,
    limit,
    onChangePage,
  } = props;

  const isRealPagination = !!paginationData;
  const dataSource = isRealPagination
    ? paginationData.data
    : data.slice(pageNo * limit, limit);
  const total = isRealPagination ? paginationData.total : data.length;

  return (
    <div className="pagination-table">
      <Table {...tableProps} dataSource={dataSource} pagination={false}></Table>
      <PaginationComp
        current={pageNo + 1}
        pageSize={limit}
        total={total}
        onChange={(no, size) => onChangePage(no - 1, size)}
      ></PaginationComp>
    </div>
  );
}

export default PaginationTable;
