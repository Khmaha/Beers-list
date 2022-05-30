import React from "react";
import { Table } from "antd";

const TableComponent = ({ columns, data }) => (
  <Table columns={columns} dataSource={data} />
);

export default TableComponent;
