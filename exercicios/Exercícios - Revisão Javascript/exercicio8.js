let pessoa = { nome: "Carlos", idade: 28, cidade: "São Paulo" };

pessoa.profissao = "Desenvolvedor";  
delete pessoa.idade; 

console.log(Object.keys(pessoa)); 
