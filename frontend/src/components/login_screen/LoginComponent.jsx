import React from "react";
import LoginForm from "../shared/formComponent/LoginForm";

export default function LoginScreen() {
	return (
		<div className="bg-gray-200 flex justify-center items-center h-screen">
			<div className="w-2/3 h-screen hidden lg:block">
				<img
					src="https://jamesclear.com/wp-content/uploads/2014/07/read-more.jpg"
					alt="Placeholder"
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 font-mono">
				<h1 className="text-2xl font-semibold mb-4">Login</h1>
				<LoginForm />
				<div className="mt-6 text-black-500 text-center">
					No account?{" "}
					<a href="/signup" className="hover:underline font-bold">
						Sign up now
					</a>
				</div>
			</div>
		</div>
	);
}