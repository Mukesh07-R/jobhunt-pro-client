const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const API = {
  register: `${API_URL}/auth/register`,
  login: `${API_URL}/auth/login`,
  jobs: `${API_URL}/jobs`,
};

export default API;