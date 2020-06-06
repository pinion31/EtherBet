const fs = require('fs');

const envVar = process.env.API_URL;
console.log('envVar', envVar);
fs.writeFileSync('constants/api_url.json', `{
  "API_URL": "${envVar}"

}`);
