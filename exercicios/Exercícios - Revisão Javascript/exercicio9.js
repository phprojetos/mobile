const livro = { titulo: "O Senhor dos Anéis", autor: "J.R. Tolkien", ano: 1954 };

const { titulo, autor } = livro;  
console.log(`Título: ${titulo}, Autor: ${autor}`);

function descricaoLivro(livro) {
  return `Título: ${livro.titulo}, Autor: ${livro.autor}`;
}

console.log(descricaoLivro(livro));
