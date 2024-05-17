export function findInputError(errors, name) {
	const filtered = Object.keys(errors)
		.filter((key) => key.includes(name))
		.reduce((cur, key) => {
			return Object.assign(cur, { error: errors[key] });
		}, {});
	return filtered;
}

export const isFormInvalid = (err) => {
	if (Object.keys(err).length > 0) return true;
	return false;
};



export const userNameValidation = {
	name: "username",
	label: "Username",
	type: "text",
	id: "username",
	placeholder: "Type in username",
	validation: {
		required: {
			value: true,
			message: "Must not be empty",
		},
		minLength: {
			value: 6,
			message: "Need at least 6 characters",
		},
	},
};

export const passwordValidation = {
	name: "password",
	label: "Password",
	type: "password",
	id: "password",
	placeholder: "Type in password",
	validation: {
		required: {
			value: true,
			message: "Must not be empty",
		},
		minLength: {
			value: 6,
			message: "Need at least 6 characters",
		},
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
			message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
		},
	},
};

export const confirmPasswordValidation = {
	name: "confirmPassword",
	label: "Confirm Password",
	type: "password",
	id: "confirmPassword",
	placeholder: "Type in password again",
	validation: {
		required: {
			value: true,
			message: "Must not be empty",
		},
	},
};

