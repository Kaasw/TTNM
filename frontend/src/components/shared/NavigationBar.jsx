import React, { useState, useEffect, useRef} from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
	AiOutlineSearch,
	AiOutlineUser,
	AiOutlineShoppingCart,
	AiFillCaretDown,
} from "react-icons/ai";
import { ConfigProvider, Dropdown, Space } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import '../../index.scss';

const NavigationBar = () => {
	const [nav, setNav] = useState(true);
	const isLogin = localStorage.getItem("token");
	const navbarRef = useRef(null);
	const [lineheight, setLineHeight] = useState(0);

	useEffect(() => {
		if (navbarRef.current) {
		  setLineHeight(navbarRef.current.offsetHeight);
		}
	  }, []);

	const handleNav = () => {
		setNav(!nav);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.success("Logged out");
		window.location.href = "/login";
	};

	const userDropdownItems = [
		{
			key: "1",
			label: (
				<a rel="noopener noreferrer" href="/login">
					Login
				</a>
			),
		},
		{
			key: "2",
			label: (
				<a rel="noopener noreferrer" href="/signup">
					Sign Up
				</a>
			),
		},
	];

	const userDropdownItems2 = [
		{
			key: "4",
			label: <button onClick={handleLogout}>Log Out</button>,
		},
	];



	return (
		<nav ref={navbarRef} className="sticky w-full top-0 z-10 flex items-center h-18 px-4 text-black bg-[#79B4B7]">
			<h1 className="text-3xl font-mono font-family p-4 text-[#000000]">
				<a className="hover:text-[#FFF5D6] font-bold" href="/">ReadEasy</a>
			</h1>
			<div 
				className="hidden md:block border-l border-gray-300 mx-5"
				style={{ height: lineheight }} 
			></div>
			{isLogin && (
			<div className="hidden md:flex">
				<ul className="flex font-mono text-xl">
					<li className="p-4">
						<a className="hover:text-[#FFF5D6] font-bold ml-30" href="/home">Home</a>
					</li>
					<div 
						className="hidden md:block border-l border-gray-300 mx-5"
						style={{ height: lineheight }} 
					></div>
					<li className="p-4">
						<a className="hover:text-[#FFF5D6] font-bold" href="/read">Read</a>
					</li>
					<div 
						className="hidden md:block border-l border-gray-300 mx-5"
						style={{ height: lineheight }} 
					></div>
					<li className="p-4">
						<a className="hover:text-[#FFF5D6] font-bold" href="/history">History</a>
					</li>
					<div 
						className="hidden md:block border-l border-gray-300 mx-5"
						style={{ height: lineheight }} 
					></div>
				</ul>
			</div>
			)}
			<div className="hidden md:flex ml-auto">
				<ul className="flex text-2xl">
  
					<li className="p-2">
						<ConfigProvider theme={{ token: { fontFamily: "monospace", colorBgTextHover: "white" } }}>
							<Dropdown
								menu={{
									items: isLogin ? userDropdownItems2 : userDropdownItems,
								}}
								placement="bottomRight"
							>
								<a className="hover:text-[#FFF5D6]" href="/profile">
									<Space>
										<AiOutlineUser />
									</Space>
								</a>
							</Dropdown>
						</ConfigProvider>
					</li>

				</ul>
			</div>

			<div onClick={handleNav} className="block md:hidden">
				{!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
			</div>

			<div
				className={
					!nav
						? "fixed left-0 top-0 w-[50%] h-full border-r border-r-white-900 bg-[#FFF5D6] ease-in-out duration-500"
						: "fixed left-[-100%]"
				}
			>
				<h1 className="text-3xl font-mono font-bold p-4 text-[#000000]">
					ReadEasy
				</h1>
				<ul className="p-2 font-mono">
					<li className="p-4 border-b border-[#F2D15D]">Home</li>
					<li className="p-4 border-b border-[#F2D15D]">About</li>
					<li className="p-4 border-b border-[#F2D15D]">Contact</li>
					<li className="p-4 border-b border-[#F2D15D]">Account</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavigationBar;
