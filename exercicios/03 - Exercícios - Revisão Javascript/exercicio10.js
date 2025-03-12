const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const pares = numeros.filter(num => num % 2 === 0);  
const dobrados = pares.map(num => num * 2);  
const soma = dobrados.reduce((acc, num) => acc + num, 0);  

console.log("Soma dos números dobrados:", soma);
