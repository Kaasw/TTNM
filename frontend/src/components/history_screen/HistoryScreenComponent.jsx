import React, { useEffect, useState } from "react";
import { ConfigProvider, Table, Tooltip, Button, Popconfirm } from "antd";
import { getAllDocumentAPI } from "../../services/UserServices";
import { deleteDocumentAPI } from "../../services/UserServices";
import { toast } from "react-toastify";


export default function HistoryScreenComponent() {
  const [document, setDocument] = useState([]);

  useEffect(() => {
    getAllDocumentAPI().then((res) => {
      if (res.status === 200) setDocument(res.data);
    });
  }, []);

  const handleReadClick = (record) => {
    console.log(record);
  }

  const handleDeleteDocument = async (record) => {
    try {
      const res = await deleteDocumentAPI(record.id);
      if (res.status === 200) {
        setDocument((prevDocs) => prevDocs.filter((doc) => doc.id !== record.id));
        toast.success("Document removed successfully!");
      }
    } catch (error) {
      toast.error(`Document removal failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "id",
      key: "index",  // Assign a unique key
      width: "1px",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary", // Assign a unique key
      width: "160px",
      render: (summary) => (
        <Tooltip title={summary}>
          <div className="truncate">{summary}</div>
        </Tooltip>
      ),
    },
    {
      title: "Read",
      key: "read",    // Assign a unique key
      width: "10px",
      render: (_, record) => (
        <Button type="primary" size="small" onClick={handleReadClick}>Read</Button>
      ),
    },
    {
        title: "Remove",
        key: "remove",
        width: "10px",
        render: (_, record) => (
          <Popconfirm
            title="Are you sure you want to remove this document?"
            onConfirm={() => handleDeleteDocument(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small">Remove</Button>
          </Popconfirm>
        ),
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
