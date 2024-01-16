import config from '../compiler.config.js';
import axios from 'axios';
//import { useState } from "react";

// module.exports = {
//     handleCompile,
//     processing
// }

//REDEFINING USESTATE FOR VANILLA JS ONLY ( i am smol and don't know a better way :P )
const useState = (defaultValue) => {
    let value = defaultValue;
    const getValue = () => value;
    const setValue = newValue => value = newValue;
    return [getValue, setValue]; 
  }

const [processing, setProcessing] = useState(null);
//let processing = null;

const checkStatus = async (token, onCompile) => {
    //console.log(onCompile);
    const options = {
        method: "GET",
        url: config.REACT_APP_RAPID_API_URL + "/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
            "X-RapidAPI-Host": config.REACT_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": config.REACT_APP_RAPID_API_KEY
        }
    };
    try{
        let response = await axios.request(options);
        let statusId = response.data.status?.id;
        console.log(statusId);
        if(statusId === 1 || statusId === 2){
            setTimeout(()=>{
                checkStatus(token, onCompile);
            }, 2000);
        }else{
            setProcessing(false);
            //alert(response.data);
            onCompile(response.data);
            console.log("compiled successfully");
            console.log(response.data);
            return;
        }
    }catch(e){
        alert(e);
    }
}
//handleCompile takes the code from the editor and input (from alert at first, then a text box).
export async function handleCompile (code, userInput, onCompile) {
    //const variables

    setProcessing(true);
    const formData = {
        language_id: 54, //C++ (GCC 9.2.0) value = cpp
        source_code: btoa(code),
        stdin: btoa(userInput)
    };

    const options = {
        method: "POST",
        url: config.REACT_APP_RAPID_API_URL,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Host": config.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": config.REACT_APP_RAPID_API_KEY,
        },
        data: formData
    };
    //API send
    axios
        .request(options)
        .then(function(response){
            console.log("res.data", response.data);
            const token = response.data.token;
            checkStatus(token, onCompile);
        })
        .catch((e)=>{
            alert(e);
            // let error = e.response ? e.response.data : e;
            // let status = e.response.status;
            // console.log("status", status);
            // if(status === 429){
            //     console.log("too many requests", status);
            // }
            // setProcessing(false);
            // console.log("catch block...", error);
        }
    );
};