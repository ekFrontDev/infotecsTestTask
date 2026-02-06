import axios from "axios";
import { Users } from "../types/users";

const API_URL = "https://6980de0b6570ee87d51092df.mockapi.io/users";

export const fetchUsers = async (): Promise<Users[]> => {
    const response = await axios.get<Users[]>(API_URL);
    return response.data;
};

export const createUser = async (
    user: Omit<Users, "id">
): Promise<Users> => {
    const response = await axios.post<Users>(API_URL, user);
    return response.data;
};

export const updateUser = async (
    user: Users
): Promise<Users> => {
    const response = await axios.put<Users>(`${API_URL}/${user.id}`, user);
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};