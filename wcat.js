#!/usr/bin/env node

// read and write 
let fs = require("fs");
// input
let inputArr = process.argv.slice(2);
//console.log(inputArr);
// options
let optionsArr=[];
let filesArr=[];
// identify ->options
for(let i =0 ; i<inputArr.length ; i++)
{
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == '-')
    {
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}
// options check
let isBothPresent = optionsArr.includes("-b") && optionsArr.includes("-n");
if(isBothPresent)
{
    console.log("either enter -n or -b option");
    return;
}
// existance
for(let i=0;i<filesArr.length;i++)
{
    // buffer 
    let isPresent = fs.existsSync(filesArr[i]);
    if(isPresent == false)
    {
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
}
//read
let content = "";
for(let i=0;i<filesArr.length;i++)
{
    // buffer 
    let bufferContent = fs.readFileSync(filesArr[i]);
    content += bufferContent+"\n";  
}
//console.log(content);
let contentArr = content.split("\n");
//console.log(contentArr);
// -s
let isSPresent = optionsArr.includes("-s");
if(isSPresent == true){
    for(let i=1 ; i<contentArr.length ;i++)
    {
        if(contentArr[i]=="" && contentArr[i-1]=="")
        {
            contentArr[i]=null;
        }else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr =[];
    for(let i=0 ;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
    
}
//console.log("'''''''''''''''''''''''''''''''''''''''''''''''")
//console.log(contentArr.join('\n'));
let isNPresent = optionsArr.includes("-n");
if(isNPresent == true){
    for(let i=0 ;i<contentArr.length;i++)
    {
        contentArr[i]=`${i+1} ${contentArr[i]}` ;
    }
}
//console.log(contentArr.join("\n"));
let isBPresent = optionsArr.includes("-b");
let count =1;
if(isBPresent == true){
    for(let i=0 ;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
            contentArr[i] = `${count} ${contentArr[i]}`;
            count++;
        }
        //contentArr[i]=`${i+1} ${contentArr[i]}` ;
    }
}
console.log(contentArr.join("\n"));