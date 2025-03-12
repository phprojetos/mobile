let frutas = ["Maçã", "Banana", "Abacaxi", "Laranja"];

let maiusculas = frutas.map(f => f.toUpperCase());  
console.log(maiusculas);

let comA = frutas.filter(f => f.startsWith('A')); 
console.log(comA);

let comprimentos = frutas.map(f => f.length);  
console.log(comprimentos);
