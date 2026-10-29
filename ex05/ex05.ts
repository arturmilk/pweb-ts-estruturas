// Exercício 05: Caixa do mercado (projeto integrador)
// Conteúdos: parâmetros rest, spread, sobrecarga de funções e todos os anteriores.

type Formatador = (valor: number) => string;

const MAX_ITENS: number = 20;
const PERCENTUAL_FIDELIDADE: number = 5;

// ---------- Lógica ----------

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

// Lê uma linha por item. for + continue (pula linhas ruins) + break (limite de 20).
export function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const precos: number[] = [];
  let ignorados: number = 0;
  const linhas: string[] = texto.split('\n');

  for (let i = 0; i < linhas.length; i++) {
    // break: chegou a 20 itens, o resto é desconsiderado.
    if (precos.length >= MAX_ITENS) {
      break;
    }
    const linha: string = linhas[i].trim();
    // continue: linha vazia é só pulada (não conta como ignorada).
    if (linha === '') {
      continue;
    }
    // Aceita vírgula ou ponto: troca a vírgula por ponto.
    const valor: number = Number(linha.replace(',', '.'));
    // continue: não é número ou é <= 0 → conta como ignorada e pula.
    if (Number.isNaN(valor) || valor <= 0) {
      ignorados++;
      continue;
    }
    precos.push(valor);
  }
  return { precos, ignorados };
}

// Parâmetro rest (...precos): junta todos os argumentos num array.
export function somarItens(...precos: number[]): number {
  let soma: number = 0;
  for (const preco of precos) {
    soma += preco;
  }
  return soma;
}

// Sobrecarga: duas "assinaturas" para a mesma função.
export function calcularDesconto(total: number, percentual: number): number;
export function calcularDesconto(total: number, cupom: string): number;
// Implementação única: typeof descobre qual forma foi chamada.
export function calcularDesconto(total: number, valor: number | string): number {
  if (typeof valor === 'number') {
    return total * valor / 100;
  }
  // toUpperCase(): aceita o cupom digitado em minúsculas.
  switch (valor.toUpperCase()) {
    case 'BEMVINDO':
      return total * 10 / 100;
    case 'PROMO20':
      return total * 20 / 100;
    case 'MENOS15':
      return total >= 100 ? 15 : 0;
    default:
      return 0;
  }
}

// Monta o texto do caixa (ou null se não houver item válido).
export function fecharCompra(texto: string, cupom: string, fidelidade: boolean): string | null {
  const { precos, ignorados } = lerPrecos(texto);
  if (precos.length === 0) {
    return null;
  }

  // Spread (...precos): "espalha" o array como argumentos separados.
  const subtotal: number = somarItens(...precos);
  const linhas: string[] = [];

  const textoItens: string = ignorados > 0
    ? `Itens: ${precos.length} (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
    : `Itens: ${precos.length}`;
  linhas.push(textoItens);
  linhas.push(`Subtotal: ${formatarReal(subtotal)}`);

  let total: number = subtotal;
  if (cupom.trim() !== '') {
    const desconto: number = calcularDesconto(subtotal, cupom.trim());
    if (desconto > 0) {
      linhas.push(`Cupom ${cupom.trim().toUpperCase()}: - ${formatarReal(desconto)}`);
      total -= desconto;
    } else {
      linhas.push('Cupom inválido ou não aplicável');
    }
  }

  if (fidelidade) {
    // Mais 5% sobre o valor já com o cupom (usa a forma numérica da sobrecarga).
    const descontoFidelidade: number = calcularDesconto(total, PERCENTUAL_FIDELIDADE);
    linhas.push(`Fidelidade (${PERCENTUAL_FIDELIDADE}%): - ${formatarReal(descontoFidelidade)}`);
    total -= descontoFidelidade;
  }

  linhas.push(`Total a pagar: ${formatarReal(total)}`);
  return linhas.join('\n');
}

// ---------- Página ----------

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const campoFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botao = document.getElementById('fechar') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const resultado: string | null = fecharCompra(campoItens.value, campoCupom.value, campoFidelidade.checked);
  if (resultado === null) {
    saida.textContent = 'Nenhum item válido';
    saida.className = 'erro';
    return;
  }
  saida.textContent = resultado;
  saida.className = 'sucesso';
});
