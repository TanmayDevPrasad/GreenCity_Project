// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  USER_SIGNUP: `${API_BASE_URL}/user/signup`,
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  ORG_SIGNUP: `${API_BASE_URL}/organization/signup`,
  ORG_LOGIN: `${API_BASE_URL}/organization/login`,
  
  // Issue endpoints
  REPORT_ISSUE: `${API_BASE_URL}/issue/issue`,
  GET_ALL_ISSUES: `${API_BASE_URL}/issue/issues`,
  GET_USER_ISSUES: `${API_BASE_URL}/issue/issues/user`,
  
  // Transport endpoints
  TRANSPORT_ENTRY: `${API_BASE_URL}/entry/submit`,
  GET_ALL_TRANSPORTS: `${API_BASE_URL}/entry/all`,
  TRANSPORT_QUERY: `${API_BASE_URL}/query/transport`,
  
  // Dashboard endpoints
  USER_RANK: `${API_BASE_URL}/userrank/rankings`,
  ORG_RANK: `${API_BASE_URL}/organizationrank/rankings`,
  ISSUES_SOLVED: `${API_BASE_URL}/issuesolved/solve`,
};

export default API_BASE_URL;

