import React from "react";
import LoginForm from "../shared/formComponent/LoginForm";

export default function LoginScreen() {
	return (
		<div className="bg-gray-100 flex justify-center items-center h-screen">
			<div className="w-1/2 h-screen hidden lg:block">
				<img
					src="https://images.unsplash.com/photo-1494459940152-1e911caa8cc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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