// Objeto inicial
let livro = {
  titulo: "O Senhor dos Anéis",
  autor: "J.R. Tolkien",
  ano: 1954
};

const { titulo, autor } = livro;

console.log(`Título: ${titulo}`);
console.log(`Autor: ${autor}`);

function obterInfoLivro(livro) {
  return `O livro "${livro.titulo}" foi escrito por ${livro.autor}.`;
}

console.log(obterInfoLivro(livro));
