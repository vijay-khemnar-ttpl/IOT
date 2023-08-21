// authUtils.js

export const setAuthToken = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

// export const setUserName = (first_name, last_name) => {
//     const full_name = `${first_name} ${last_name}`;
//     localStorage.setItem('user_name', full_name);
// }

export const setUserName = (email) => {
    localStorage.setItem('user_name', email);
}
