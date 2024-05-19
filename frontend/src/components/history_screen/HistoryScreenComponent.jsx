import React, { useEffect, useState } from "react";
import { ConfigProvider, Table, Tooltip } from "antd";
import { getAllDocumentAPI } from "../../services/UserServices";

export default function HistoryScreenComponent() {
  const [document, setDocument] = useState([]);

  useEffect(() => {
    getAllDocumentAPI().then((res) => {
      if (res.status === 200) setDocument(res.data);
    });
  }, []);

  const columns = [
    {
      title: "Index",
      dataIndex: "id",
      key: "name",
      width: "1px",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      width: "160px",
      render: (summary) => (
        <Tooltip title={summary}>
          <div className="truncate">{summary}</div>
        </Tooltip>
      ),
    },
    {
      title: "Read",
      dataIndex: "fullname", 
      width: "10px",
    },
    {
      title: "Remove",
      dataIndex: "id", 
      width: "10px",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  return (
    <div className="m-5 font-mono">
      <h1 className="mb-5 text-2xl font-bold">Reading history</h1>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#F8C70E", fontFamily: "monospace" },
        }}
      >
        <Table
          pagination={{ pageSize: 5 }}
          columns={columns}
          key={document.id} // Assuming each document has a unique id
          dataSource={document}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}
