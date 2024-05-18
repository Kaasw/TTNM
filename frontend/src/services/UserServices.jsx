import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

const headers = {
	"Content-Type": "application/x-www-form-urlencoded",
};

export const loginAPI = async (username, password) => {
	try {
		const res = await api.post(
			`/api/auth/login`,
			{ username, password },
			{ headers }
		);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const signupAPI = async (
	password,
	username,
	fullname
) => {
	try {
		const res = await api.post(`/api/users`, {
			password: password,
			username: username,

			fullname: fullname,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const createDocument = async (content, user_id) => {
	try {
		const res = await api.post(`/api/document`, {
			content: content,
			user_id: user_id,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};
