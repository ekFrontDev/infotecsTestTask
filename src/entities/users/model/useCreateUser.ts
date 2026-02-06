import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/usersApi';
import { Users } from '../types/users';
import { USERS_QUERY_KEY } from './useUsers';

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: Omit<Users, 'id'>) => createUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: USERS_QUERY_KEY,
            });
        },
    });
};
