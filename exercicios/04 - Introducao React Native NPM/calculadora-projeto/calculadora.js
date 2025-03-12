
export function soma(a, b) {
    return a + b;
  }
  
  export function subtracao(a, b) {
    return a - b;
  }
  
  export function multiplicacao(a, b) {
    return a * b;
  }
  
  export function divisao(a, b) {
    if (b === 0) {
      return "Erro: Divisão por zero";
    }
    return a / b;
  }
