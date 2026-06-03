import axios from "axios";

const API = axios.create({
baseURL: "/api"
});

// Automatically attach JWT token to headers if it exists in local storage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🏠 1. Fetch all properties (Matches @RequestMapping("/api/properties") + @GetMapping("/"))
export const getAllProperties = () => API.get("/properties/?pageSize=50");
// 🔍 2. Fetch a single property by its ID (Matches @GetMapping("/{propertyId}"))
export const getPropertyById = (id) => API.get(`/properties/${id}`);

// 🎛️ 3. Dynamic search & filtering by property type (Matches @GetMapping("/filter"))
export const searchPropertiesByType = (type) => API.get("/properties/filter", { params: { propertyType: type } });

// ✉️ 4. Submit contact form inquiry to the agent
export const sendInquiry = (inquiryData) => API.post("/inquiries", inquiryData);

// 🔑 5. Authenticate user credentials
export const loginUser = (credentials) => API.post("/users/login", credentials);

// 📝 6. Register a new account
export const registerUser = (userData) => API.post("/users/register", userData);

// 👥 7. Fetch all registered real estate agents (Perfect match for @RequestMapping("/api/agents") + @GetMapping(""))
export const getAllAgents = () => API.get("/agents");

// 💳 8. Fetch all system transactions 
export const getAllTransactions = () => API.get("/transactions/");

// 📊 9. Fetch transactions filtered by type 
export const getTransactionsByType = (type) => API.get(`/transactions/type/${type}`);

export default API;