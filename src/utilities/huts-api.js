const BASE_URL = '/api/huts';
import { getToken } from "./methods/get-token";

export function saveScript(payload, force = false){ //contains user and code user is trying to save
    const data = payload;
    data.force = force;
    //console.log(JSON.stringify(data));
    return sendRequest(`${BASE_URL}/saveScript`, 'POST', data);
}

export function destroyScript(payload){
  //console.log(payload);
  return sendRequest(`${BASE_URL}/destroyScript`, 'POST', payload);
}

export function renameScript(payload){
  return sendRequest(`${BASE_URL}/renameScript`, 'POST', payload, false, 'userID', 'code', 'title','newTitle');
}


export function checkIfScriptExists(payload){
  return sendRequest(`${BASE_URL}/checkScriptExistence`, 'POST', payload);
}

export function getScriptListFromUserHut(userID){
  //console.log(userID)
  return sendRequest(`${BASE_URL}/${userID}`)
}

export function checkIfUserScriptExists(payload){
  //console.log(payload);
  return sendRequest(`${BASE_URL}/checkScriptUserPairExistence`, 'POST', payload, false, 'userName', 'scriptName');
}


async function sendRequest(url, method = 'GET', payload = null, makeForMe = true, ...objKeys) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    //if(payload.)
    if(makeForMe){
      const data = [{
        userID: payload.user._id,
        code: payload.code,
        title: payload.title,
        force: payload.force
      }];
      options.body = JSON.stringify(data);
    }else{
      let data = [{}];
      objKeys.forEach(
        (ele,index)=>{
          data[0][ele] = Object.values(payload)[index];
        }
      )
      options.body = JSON.stringify(data);
    }
    
    //console.log(options);
  }

  // adding in to check token
  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
  }