import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/register", { email, password });
    return response;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

// export const getUsers = async (page: number) => {
//   try {
//     const response = await api.get(`/users?page=${page}`);
//     return response;
//   } catch (error) {
//     throw new Error("Failed to fetch users");
//   }
// };
