import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/usersApi";
import { Users } from "../types/users";

export const USERS_QUERY_KEY = ["users"];

export const useUsers = () => {
    return useQuery<Users[], Error>({
        queryKey: USERS_QUERY_KEY,
        queryFn: fetchUsers,
    });
};
