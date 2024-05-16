import React from "react";
import { Input } from "./Input";
import { FormProvider, set, useForm } from "react-hook-form";
import {
	fullNameValidation,
	emailValidation,
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
		email: "",
		fullname: ""
	});

	function cleanUp() {
		setSignupField({
			password: "",
			username: "",
			email: "",
			fullname: ""
		});
		methods.reset();
	}

	function checkPasswordMatched() {
		if (methods.watch("password") !== methods.watch("confirmPassword")) {
			methods.setError("confirmPassword", {
				type: "manual",
				message: "Mật khẩu không khớp",
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
				username: data.username,
				email: data.email,
				fullname: data.fullname,
			})
		);

		let respond = await signupAPI(
			signupField.password,
			signupField.username,
			signupField.email,
			signupField.fullname
		);
		if (respond) {
			if (respond.status === 200) {
				toast.success("Đăng ký thành công");
				setTimeout(() => {
					window.location.href = "/login";
				}, 1000);
			} else if (respond.status === 500) {
				toast.error("Đăng ký thất bại, tên đăng nhập đã tồn tại");
			} else {
				toast.error("Đăng ký thất bại, xin hãy thử lại");
			}
		}
		cleanUp();
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate>
				<Input {...fullNameValidation} />
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<Input {...emailValidation} />
					</div>
				</div>
				<Input {...userNameValidation} />
				<Input {...passwordValidation} />
				<Input {...confirmPasswordValidation} />
				<div classname="grid grid-cols-2 gap-4">

				</div>
				<div className="flex">
					<button
						onClick={onSubmit}
						className="bg-[#F8C70E] hover:bg-[#000000d0] text-[#000000] hover:text-[#F8C70E] font-semibold rounded-md py-2 ml-3 w-full"
					>
						Đăng ký
					</button>
				</div>
			</form>
		</FormProvider>
	);
}
