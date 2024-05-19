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

export const createDocument = async (content, user_id, summary) => {
	try {
		const res = await api.post(`/api/document`, {
			content: content,
			user_id: user_id,
			summary: summary,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const readDocument = async (id) => {
	try {
		const res = await api.get(`/api/document/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getAllDocumentAPI = async () => {
	const token = localStorage.getItem("token");
	const headers = { Authorization: `Bearer ${token}` };
	try {
		const res = await api.get("/api/document", { headers });
		return res;
	} catch (error) {
		return error.response;
	}
};

export const summarize = async (input_text) => {
	try {
		const res = await api.post(`/api/users/predict`, {
			input_text: input_text,
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const deleteDocumentAPI = async (id) => {
	try {
		const res = await api.delete(`/api/document/${id}`);
		return res;
	} catch (error) {
		return error.response;
	}
}
