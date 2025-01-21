const fs = require('fs');

function extractEmails(file){
    try{
        const data = fs.readFileSync(file);
        const text= data.toString();
        const regex = /\b[A-Za-z0-9.'_%+-]+@[A-Za-z-]+\.([a-z]{3}|| [a-z]{2}\.[a-z]{2})\b/g;
        const extract = text.match(regex);
        const dictionary = {};
        extract.forEach((match)=>{
            
            // FM note - lines 13 & 14 are ideas of how to only add domain names to the dictionary
            //const domainRegex = @[A-Za-z-]+\.([a-z]{3}|| [a-z]{2}\.[a-z]{2})\b/g;
            //const domain = 

            const domain = match;
            if(dictionary[domain]){
                dictionary[domain]++;
            }
            else {
                dictionary[domain]=1;
            }
 });
        return dictionary;
    }

    catch(err){
        console.error("error reading file");
        return null;
    }
}

const softwireEmails = extractEmails('test.txt');
console.log(softwireEmails);

