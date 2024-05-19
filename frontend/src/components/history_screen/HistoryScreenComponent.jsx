import React, { useEffect, useState } from "react";
import { ConfigProvider, Table, Tooltip, Button, Popconfirm } from "antd";
import { getAllDocumentAPI } from "../../services/UserServices";
import { deleteDocumentAPI } from "../../services/UserServices";
import { readDocument } from "../../services/UserServices";
import { toast } from "react-toastify";
import BookOpenIcon from "@heroicons/react/24/outline/BookOpenIcon" 
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";


export default function HistoryScreenComponent() {
  const [document, setDocument] = useState([]);


  useEffect(() => {
    getAllDocumentAPI().then((res) => {
      if (res.status === 200) setDocument(res.data);
    });
  }, []);

  const handleReadClick = async (record) => {
    try {
      const res = await readDocument(record.id);
      if (res.status === 200) {
        localStorage.setItem("textId", record.id); 
        console.log(record.id);
        window.open("/read", "_blank");
      }
    } catch (error) {
      // Handle errors here, e.g., show a toast notification
    }
  };

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
      title: (<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Summary</span>),
      dataIndex: "summary",
      key: "summary", // Assign a unique key
      width: "100px",
      color: "bg-gray-200",
      render: (summary) => {
        const MAX_LENGTH = 50; // Giới hạn số ký tự hiển thị
        const truncatedSummary = summary.length > MAX_LENGTH
          ? summary.slice(0, MAX_LENGTH) + "..."
          : summary;

        return (
          <Tooltip title={summary}>
            <div className="truncate" style={{ fontSize: '15px' }}> {/* Customize font size here */}
              {truncatedSummary}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: (<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Read</span>),
        key: "read",
        width: "10px",
        render: (_, record) => (
          <button
              //onClick={Summary}
              data-tip="Decrease font size"
              className="bg-white p-2 rounded-md hover:bg-[#79B4B7] hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
              onClick={() => handleReadClick(record)}
          >
              <BookOpenIcon className="w-6 h-6" />
          </button>
        ),
    },
    {
      title: (<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Remove</span>),
        key: "remove",
        width: "5px",
        render: (_, record) => (
          <Popconfirm
            title="Are you sure you want to remove this document?"
            onConfirm={() => handleDeleteDocument(record)}
            okText="Yes"
            cancelText="No"
          >
            <button
                //onClick={Summary}
                data-tip="Decrease font size"
                className="bg-white p-2 rounded-md hover:bg-[#BC4B51] hover:shadow-2xl shadow-lg active:shadow-xl transform hover:-translate-y-1 transition duration-200 active:translate-y-0"
            >
                <TrashIcon className="w-6 h-6" />
            </button>
          </Popconfirm>
        ),
      },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  return (
    <div className="min-h-screen bg-gray-200 p-8">
    <div className="m-5 font-mono">
      <h1 className="mb-5 text-2xl font-family font-bold">Reading history</h1>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "bg-gray-200", fontFamily: "monospace" },
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
    </div>
  );
}
