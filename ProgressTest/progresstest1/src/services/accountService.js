import axios from "axios";

const API_URL = "http://localhost:3001/accounts";

export const getAccounts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateAccountStatus = async (id, status) => {
    const response = await axios.patch(`${API_URL}/${id}`, { status });
    return response.data;
};