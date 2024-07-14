

export const getToken = () => localStorage.getItem(process.env.AUTH_TOKEN);

export const setToken = token => {
    const AUTH_TOKEN=`${process.env.AUTH_TOKEN}`
    if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    localStorage.removeItem(process.env.AUTH_TOKEN);
};