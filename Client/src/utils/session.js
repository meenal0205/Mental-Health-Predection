export const setUser = (username, type) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', username);
        sessionStorage.setItem('type', type);

    }
};

export const getUserdetails = () => {
    if (typeof window !== 'undefined') {
        return {
            username: sessionStorage.getItem('user'),
            type: sessionStorage.getItem('type')
        };

    }
};

export const removeUser = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('type');

    }
};