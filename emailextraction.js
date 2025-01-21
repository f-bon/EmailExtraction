const fs = require('fs');

function extractEmails(file){
    try{
        const data = fs.readFileSync(file);
        const text= data.toString();
        const regex = /\b[A-Za-z0-9.'_%+-]+@softwire.com\b/g;
        const extract = text.match(regex);
        return extract;
    }

    catch(err){
        console.error("error reading file");
        return null;
    }
}

const softwireEmails = extractEmails('test.txt');
const count = softwireEmails.length;
console.log(`The domain softwire.com appears ${count} times`);

