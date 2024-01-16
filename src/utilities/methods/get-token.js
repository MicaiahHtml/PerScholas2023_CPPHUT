export function getToken() {
    // getItem returns null if there is no string
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtain payload of the token 
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's expiration is expressed in seconds not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        // Token has expired and remove from local storage
        localStorage.removeItem('token');
        return null;
    }
    return token;
}