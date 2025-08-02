import api from "./index";

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/users/register", userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/users/logout");
    return response.data;
  },

  checkAuth: async () => {
    const response = await api.get("/users/auth/check");
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  updateMe: async (userData) => {
    const response = await api.put("/users/me", userData);
    return response.data;
  },
};

// Users API calls
export const usersAPI = {
  getUser: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  searchUsers: async (query) => {
    const response = await api.get(
      `/users?search=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

// Posts API calls
export const postsAPI = {
  createPost: async (postData) => {
    const response = await api.post("/posts", postData);
    return response.data;
  },

  getAllPosts: async () => {
    const response = await api.get("/posts");
    return response.data;
  },

  getUserPosts: async (userId) => {
    const response = await api.get(`/posts/user/${userId}`);
    return response.data;
  },
};
