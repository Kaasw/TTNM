import React, { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";


export default function HistoryScreenComponent() {


	const columns = [
		{
			title: "Index",
			dataIndex: "username",
			key: "name",
			width: "180px",
		},
		{
			title: "Summary",
			dataIndex: "address",
			width: "140px",
		},
		{
			title: "Date",
			dataIndex: "phone_number",
			width: "180px",
		},
		{
			title: "Read",
			dataIndex: "fullname",
			width: "140px",
		},
		{
			title: "Remove",
			dataIndex: "id",
			width: "160px",
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

					onChange={onChange}
				/>
			</ConfigProvider>
		</div>
	);
}
