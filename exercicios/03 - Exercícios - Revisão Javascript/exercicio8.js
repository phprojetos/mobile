let pessoa = {
    nome: "Carlos",
    idade: 28,
    cidade: "São Paulo"
  };

  pessoa.profissao = "Desenvolvedor";

  delete pessoa.cidade;
  

  console.log("Propriedades do objeto:");
  for (let chave in pessoa) {
    console.log(chave + ": " + pessoa[chave]);
  }
  