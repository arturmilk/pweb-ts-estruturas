// Exercício 04: Meta de economia
// Conteúdos: while, break, tipo de função e parâmetro padrão.

// Tipo de função: qualquer função que recebe um number e devolve uma string.
type Formatador = (valor: number) => string;

// Resultado da simulação.
type Simulacao = { meses: number; saldo: number; depositado: number };

const LIMITE_MESES: number = 600; // 50 anos

// ---------- Lógica ----------

// Segue o tipo Formatador.
export const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

// Também segue o formato (number) => string. Ternário para singular/plural.
export const formatarMeses: (meses: number) => string = (meses: number): string => {
  const anos: number = Math.floor(meses / 12);
  const resto: number = meses % 12;
  const textoAnos: string = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses: string = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
  if (anos === 0) return textoMeses;
  if (resto === 0) return textoAnos;
  return `${textoAnos} e ${textoMeses}`;
};

// Parâmetro padrão: se a taxa não for passada, vale 0.5 (% ao mês).
export function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): Simulacao {
  let saldo: number = 0;
  let depositado: number = 0;
  let meses: number = 0;

  // while: repete enquanto a condição for verdadeira.
  while (saldo < meta) {
    // break: para tudo ao chegar no limite de 600 meses.
    if (meses >= LIMITE_MESES) {
      break;
    }
    meses++;
    // Todo mês 12, 24, 36... tem 13º: deposita o dobro.
    const valorDoMes: number = meses % 12 === 0 ? deposito * 2 : deposito;
    // Primeiro rende, depois entra o depósito.
    saldo = saldo * (1 + taxa / 100) + valorDoMes;
    depositado += valorDoMes;
  }
  return { meses, saldo, depositado };
}

// Recebe a função de formatação como parâmetro.
export function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

// Monta o texto do resultado; devolve também se a meta foi atingida.
export function montarResultado(meta: number, sim: Simulacao): { texto: string; atingiu: boolean } {
  if (sim.saldo < meta) {
    return {
      texto: `Meta inalcançável em 50 anos.\n${exibirValor(`Saldo após ${LIMITE_MESES} meses`, sim.saldo, formatarReal)}`,
      atingiu: false,
    };
  }
  return {
    texto: `Você atinge a meta em ${sim.meses} meses (${formatarMeses(sim.meses)}).\n` +
      `${exibirValor('Saldo final', sim.saldo, formatarReal)}\n` +
      `${exibirValor('Total depositado', sim.depositado, formatarReal)}\n` +
      `${exibirValor('Rendimento', sim.saldo - sim.depositado, formatarReal)}`,
    atingiu: true,
  };
}

// ---------- Página ----------

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const meta: number = Number(campoMeta.value);
  const deposito: number = Number(campoDeposito.value);

  if (meta <= 0 || deposito <= 0) {
    saida.textContent = 'Informe valores positivos';
    saida.className = 'erro';
    return;
  }

  // Campo vazio: chama sem o terceiro argumento (usa o padrão 0.5).
  const sim: Simulacao = campoTaxa.value === ''
    ? calcularMeses(meta, deposito)
    : calcularMeses(meta, deposito, Number(campoTaxa.value));

  const resultado = montarResultado(meta, sim);
  saida.textContent = resultado.texto;
  saida.className = resultado.atingiu ? 'sucesso' : 'erro';
});
