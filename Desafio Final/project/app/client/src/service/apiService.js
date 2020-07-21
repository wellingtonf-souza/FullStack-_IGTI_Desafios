import axios from "axios";

const API_URL = "http://localhost:3001/api/transaction";

async function findAll(period) {
  const res = await axios.get(`${API_URL}/findAll/?period=${period}`);
  return res.data;
}

async function filterByDescription(period, filter) {
  const res = await axios.get(
    `${API_URL}/filterByDescription/?period=${period}&description=${filter}`,
    {
      period: period,
      description: filter,
    }
  );
  return res.data;
}

async function deleteById(id) {
  const res = await axios.delete(`${API_URL}/remove/?id=${id}`);
  return res.data;
}

async function create(body) {
  const res = await axios.post(`${API_URL}/create/`, body);
  return res.data;
}

export { findAll, filterByDescription, deleteById, create };
