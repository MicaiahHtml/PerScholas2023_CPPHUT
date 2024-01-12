//const { env } = require('process');
//import { env } from 'process';
//import React from 'react';
//require('dotenv').config();
const config = {
//module.exports = {
    REACT_APP_RAPID_API_URL: import.meta.env.VITE_REACT_APP_RAPID_API_URL,
    REACT_APP_RAPID_API_HOST: import.meta.env.VITE_REACT_APP_RAPID_API_HOST,
    REACT_APP_RAPID_API_KEY: import.meta.env.VITE_REACT_APP_RAPID_API_KEY
}
export default config;