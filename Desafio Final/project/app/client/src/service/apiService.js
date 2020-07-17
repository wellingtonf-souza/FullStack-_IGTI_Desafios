import axios from "axios";

const API_URL = "http://localhost:3001/api/transaction";

async function findAll(period) {
  const res = await axios.get(`${API_URL}/findAll/?period=${period}`);
  return res.data;
}

export { findAll };
