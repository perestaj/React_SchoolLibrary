class AuthorizationData {
    constructor(token, expiration, userName, role){       
        this.token = token;
        this.expiration = expiration;
        this.userName = userName;
        this.role = role;
    }
}

export default AuthorizationData;