const fs = require('fs');

function extractEmails(file){
    try{
        const data = fs.readFileSync(file);
        const text= data.toString();
        let count =0;

        for(let i=0; i<=text.length;i++) {
            if(text.substring(i,i+13)==="@softwire.com"){
                count++;
            }
        }
        return count;
    }

    catch(err){
        console.error("error reading file");
        return null;
    }
}

const count = extractEmails('test.txt');
console.log(`The domain softwire.com appears ${count} times`);

