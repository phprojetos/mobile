let arr = [10, 20, 30, 40, 50];

arr.push(60);  
arr.shift();   

console.log("Maior número:", Math.max(...arr));
console.log("Menor número:", Math.min(...arr));
