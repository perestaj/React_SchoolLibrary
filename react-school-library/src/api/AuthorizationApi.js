class AuthorizationApi {
    static login(username, password) {
        return fetch(`http://localhost:4200/api/users/token?userName=${username}&password=${password}`, {
            method: 'POST'
        })
        .then(res => res);
    }
}

export default AuthorizationApi;