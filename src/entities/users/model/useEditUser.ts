import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/usersApi";
import { Users } from "../types/users";
import { USERS_QUERY_KEY } from "./useUsers";

export const useEditUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: Users) => updateUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USERS_QUERY_KEY,
            });
        },
    });
};
