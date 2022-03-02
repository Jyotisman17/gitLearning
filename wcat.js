let fs = require("fs");  // use to read file system in our operating system 
const { inspect } = require("util");
const { isUint8ClampedArray } = require("util/types");
//input is first taken 
let inputArr = process.argv.slice(2);
//console.log(inputArr); // displays the input for our preference 

//options identify 
let optionArr = [];
let filesArr = [];
for(let i = 0;i<inputArr.length;i++){ // in this loop we will categorize all the input into its corresponding array 
    let firstChar = inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}


let content = "";
for(let i=0;i<filesArr.length;i++){
    let bufferContent = fs.readFileSync(filesArr[i]);
    content += bufferContent+"\r\n";
}
// console.log(content);

let contentArr = content.split("\r\n");      
//console.log(contentArr);    

let isSPresent=optionArr.includes("-s");
if(isSPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if (contentArr[i-1]==null && contentArr[i]==""){
            contentArr[i]=null;
        }
    }
    let temp = [];
    for(let i = 0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            temp.push(contentArr[i]);
        }
    } 
    contentArr=temp;
}

//console.log(contentArr.join("\n"));

let inNPresent = optionArr.includes("-n");
if(inNPresent){
    for(let i = 0;i<contentArr.length;i++){
        contentArr[i]=`${i+1} ${contentArr[i]}`;
    }
}

//console.log(contentArr.join("\n"));


let isBPresent = optionArr.includes("-b");
if(isBPresent){
    let counter = 1;
    for(let i = 0;i<contentArr.length;i++){
        if(contentArr[i]!=''){
            contentArr[i]=`${counter} ${contentArr[i]}`;
            counter++;
        }
    }

    
}

console.log(contentArr.join("\n"));





