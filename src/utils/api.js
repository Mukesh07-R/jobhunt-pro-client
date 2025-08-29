const API_URL = process.env.REACT_APP_API_URL;

const API = {
  register: `${API_URL}/api/auth/register`,
  login: `${API_URL}/api/auth/login`,
  jobs: `${API_URL}/api/jobs`,
};

export default API;