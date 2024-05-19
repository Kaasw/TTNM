import React from "react";
import { Input } from "./Input";
import { FormProvider, set, useForm } from "react-hook-form";
import {
	userNameValidation,
	passwordValidation,
	confirmPasswordValidation
} from "../../../utils/validations";
import {
	signupAPI
} from "../../../services/UserServices";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignUpForm() {
	const methods = useForm();

	const [signupField, setSignupField] = useState({
		password: "",
		username: "",

	});

	function cleanUp() {
		setSignupField({
			password: "",
			username: "",
		
		});
		methods.reset();
	}

	function checkPasswordMatched() {
		if (methods.watch("password") !== methods.watch("confirmPassword")) {
			methods.setError("confirmPassword", {
				type: "manual",
				message: "Password not matched",
			});
			return false;
		}
		return true;
	}

	const onSubmit = methods.handleSubmit(async (data) => {
		if (!checkPasswordMatched()) return;
		setSignupField(
			Object.assign(signupField, {
				password: data.password,
				username: data.username
			})
		);

		let respond = await signupAPI(
			signupField.password,
			signupField.username
		);
		if (respond) {
			if (respond.status === 200) {
				toast.success("Sign up succeeded");
				setTimeout(() => {
					window.location.href = "/login";
				}, 1000);
			} else if (respond.status === 500) {
				toast.error("Username already existed");
			} else {
				toast.error("Sign up failed, try again");
			}
		}
		cleanUp();
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate>
				<Input {...userNameValidation} />
				<Input {...passwordValidation} />
				<Input {...confirmPasswordValidation} />
				<div classname="grid grid-cols-2 gap-4">

				</div>
				<div className="flex">
					<button
						onClick={onSubmit}
						className="bg-[#79B4B7] hover:bg-white text-black hover:text-black font-semibold rounded-md py-2  w-full
						shadow-lg hover:shadow-2xl active:shadow-xl transition duration-200 transform hover:-translate-y-1 active:translate-y-0 "
					>
						Sign up
					</button>
				</div>
			</form>
		</FormProvider>
	);
}
