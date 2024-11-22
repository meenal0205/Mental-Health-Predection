export const setUser = (username, type, therapist) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', username);
        sessionStorage.setItem('type', type);
        sessionStorage.setItem('therapist', therapist);
    }
};

export const getUserdetails = () => {
    if (typeof window !== 'undefined') {
        return {
            username: sessionStorage.getItem('user'),
            type: sessionStorage.getItem('type'),
            therapist: sessionStorage.getItem('therapist')
        };

    }
};

export const removeUser = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('type');
        sessionStorage.removeItem('therapist');
    }
};