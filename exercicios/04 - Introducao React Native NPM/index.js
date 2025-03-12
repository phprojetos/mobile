import {} from "./CalculadoraIMC.js"


console.log("CalculadoraIMC")

console.log(">>> Tabela do IMC <<<")
console.log(TabelaIMC)

const peso = 80
const altura = 1.70

const resultado = calcularIMC(peso, altura)

console.log("Resultado do IMC")
onsole.log(`IMC: ${resultado.toFixed(2)} `)

// Importando lib moment e usando
import moment from "moment";

const hoje = moment().locale('pt-br')

console.log("Hoje é: ")
console.log(hoje.format('DD/MM/yyyy'))