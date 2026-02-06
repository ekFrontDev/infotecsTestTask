export interface LoginParams {
    username: string;
    password: string;
}

export const loginRequest = async ({ username, password }: LoginParams): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin" && password === "admin") {
                resolve("fake-jwt-token");
            } else {
                reject(new Error("Неверный логин или пароль"));
            }
        }, 2000);
    });
};
