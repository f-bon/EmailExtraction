const fs = require('fs');
const readline = require('readline-sync');

//Read file and extract valid emails
function extractEmails(file){
    try{
        const data = fs.readFileSync(file);
        const text= data.toString();
        let regex = /\b[\w.'_%+-]+@[\w-]+\.(?:[a-z]{3}|co\.[a-z]{2})\b/g;
        let extract = text.match(regex);
       return extract;
    }

    catch(err){
        console.error("error reading file");
        return null;
    }
}

// Identify unique domains and count frequency
function uniqueDomains(extract){
    let dictionary={};
    extract.forEach(email => {
        const domain = email.split("@")[1];
        dictionary[domain]=(dictionary[domain]||0)+1;   
    });
    return dictionary;
 }

 // Sort domains based on highest to lowest frequency
 function sortDomainFrequency(dictionary){
   const sortByFrequency = Object.entries(dictionary).sort((a,b)=>b[1]-a[1]);
   return Object.fromEntries(sortByFrequency);
   
 }

 // Print top 10 most common domains
 function printTopTenDomains(sortedDomains){
    console.log(`The top 10 domains are:`);
    Object.entries(sortedDomains).slice(0,10).forEach(([key,value])=> console.log(`${key}:${value}`));
 }

 // Ask user to enter a desired frequncy
function getUserPrompt(){
    while(true)
    {
    let userFrequencyInput = parseInt(readline.question("Please enter a minimum frequency for emails"));
    if (!isNaN(userFrequencyInput)||userFrequencyInput>0)
    {
        return userFrequencyInput;
    }
    else{
        console.log("Please enter a valid response");
    }
 }
}

// Print domains with frequency higher than user prompt
 function printUserPromptedDomains(sortedDomains,userFrequencyInput){
    console.log(`The domains with frequency higher than ${userFrequencyInput} are: `);
    for(let email in sortedDomains){
        if(sortedDomains[email]>userFrequencyInput){
            console.log(`${email}:${sortedDomains[email]}`);
        }
    }  
 } 


 // Main
const sortedDomains = sortDomainFrequency(uniqueDomains(extractEmails('test.txt')));
console.log(`Domain dictionary:`);
console.log(sortedDomains);
printTopTenDomains(sortedDomains);
printUserPromptedDomains(sortedDomains,getUserPrompt());
