// users-services.js

// Import all named exports attached to the usersAPI object
// This syntax can be helpful documenting where methods come from
import * as usersAPI from './users-api';


export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Tokem (JWT)
    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server
    // once we generate the token, we can persist
    localStorage.setItem('token', token);
    // return token;
    return getUser();
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials);

    // Persist the token
    localStorage.setItem('token', token);

    return getUser();
}

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

export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
    localStorage.removeItem('token');
}

export function checkToken() {
    return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}

export async function searchForHuts(searchVal){ //FINDS USERS CONTAINING LETTERS FROM SEARCH VAL
    const res = await usersAPI.searchForHuts(searchVal);
    return res;
}

export async function findUserByName(searchVal){
    //console.log(searchVal);
    const res = await usersAPI.findUserByName(searchVal);
    return res;
}