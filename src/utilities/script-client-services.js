//script: object of mongo schema Script


//import { CookiesProvider, useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import JSEncrypt from "jsencrypt";

export function createNewScriptFromExisting(script, mode){

    const publicKey = 
    `-----BEGIN PUBLIC KEY-----
    ${import.meta.env.VITE_AES_CLONE_PUBLIC_KEY}
    -----END PUBLIC KEY-----`;
   

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    
    const code = encryptor.encrypt(script.code);
    //const dO = decryptor.decrypt(code);
    //console.log(code);
    //console.log(`encrypted: ${code} \n decrypted: ${dO}`);


    //create payload from script.code and script.title
    const cPayload = {
        title: script.title,
        code: code
    };
    //make cookie
    const cloneCookie = new Cookies();
    cloneCookie.set('encryptScript',JSON.stringify(cPayload),{path:'/'});
    //site redirect
    if(mode=='clone') window.location.href = '/clone-script';
    if(mode=='edit') window.location.href = '/edit-script';
    //done
}