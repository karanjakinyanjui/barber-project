import _axios from "axios";

const baseURL = "";

const axios = _axios.create({
  baseURL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login({ username, password }) {
  const { data, status } = await axios.post("/api/login", {
    username,
    password,
  });
  if (status === 200) {
    const { token } = data;
    localStorage.setItem("token", token);
  }
  throw new Error("Login failed");
}

export async function register({ username, phone, name, role, password }) {
  const response = await axios.post("/api/register", {
    username,
    phone,
    name,
    role,
    password,
  });
  return response.data;
}

export async function getUsers() {
  const response = await axios.get("/api/users");
  return response.data;
}

export async function getTransactions() {
  const response = await axios.get("/api/transactions");
  return response.data;
}

export async function updateTransaction(id, data) {
  const response = await axios.patch(`/api/transactions`, { id, ...data });
  return response.data;
}


