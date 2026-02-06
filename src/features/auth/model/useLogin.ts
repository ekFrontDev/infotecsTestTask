import { useMutation } from "@tanstack/react-query";
import { loginRequest, LoginParams } from "../api/login";

export const useLogin = () => {
    return useMutation<string, Error, LoginParams>({
        mutationFn: loginRequest,
    });
};
