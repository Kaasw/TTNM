import React from "react";
import SignUpForm from "../shared/formComponent/SignUpForm";

const inputStyle =
	"w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-[#F8C70E]";

export default function SignUpComponent() {
	return (
		<div className="bg-gray-200 flex justify-center items-center h-screen">
			<div className="w-2/3 hidden lg:block h-screen">
				<img
					src="https://jamesclear.com/wp-content/uploads/2014/07/read-more.jpg"
					alt="Placeholder"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="lg:px-36 md:px-52 sm:px-20 px-8 w-full lg:w-1/2 font-mono">
				<h1 className="text-2xl font-semibold mb-4">Sign up new user</h1>
				<SignUpForm />
				<div className="mb-6 text-center pt-5 text-black">
					Already have an accout?{" "}
					<a href="/login" className="hover:underline">
						<span className="font-semibold">Login now!</span>
					</a>
				</div>
			</div>
		</div>
	);
}
