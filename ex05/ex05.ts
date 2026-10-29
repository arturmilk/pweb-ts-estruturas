type Formatador = (valor: number) => string;

const MAX_ITENS: number = 20;
const PERCENTUAL_FIDELIDADE: number = 5;

const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

export function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const precos: number[] = [];
  let ignorados: number = 0;
  const linhas: string[] = texto.split('\n');

  for (let i = 0; i < linhas.length; i++) {
    if (precos.length >= MAX_ITENS) {
      break;
    }
    const linha: string = linhas[i].trim();
    if (linha === '') {
      continue;
    }
    const valor: number = Number(linha.replace(',', '.'));
    if (Number.isNaN(valor) || valor <= 0) {
      ignorados++;
      continue;
    }
    precos.push(valor);
  }
  return { precos, ignorados };
}

export function somarItens(...precos: number[]): number {
  let soma: number = 0;
  for (const preco of precos) {
    soma += preco;
  }
  return soma;
}

export function calcularDesconto(total: number, percentual: number): number;
export function calcularDesconto(total: number, cupom: string): number;
export function calcularDesconto(total: number, valor: number | string): number {
  if (typeof valor === 'number') {
    return total * valor / 100;
  }
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

export function fecharCompra(texto: string, cupom: string, fidelidade: boolean): string | null {
  const { precos, ignorados } = lerPrecos(texto);
  if (precos.length === 0) {
    return null;
  }

  const subtotal: number = somarItens(...precos);
  const linhas: string[] = [];

  const textoItens: string = ignorados > 0
    ? `itens: ${precos.length} (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
    : `itens: ${precos.length}`;
  linhas.push(textoItens);
  linhas.push(`subtotal: ${formatarReal(subtotal)}`);

  let total: number = subtotal;
  if (cupom.trim() !== '') {
    const desconto: number = calcularDesconto(subtotal, cupom.trim());
    if (desconto > 0) {
      linhas.push(`cupom ${cupom.trim().toUpperCase()}: - ${formatarReal(desconto)}`);
      total -= desconto;
    } else {
      linhas.push('cupom inválido ou não aplicável');
    }
  }

  if (fidelidade) {
    const descontoFidelidade: number = calcularDesconto(total, PERCENTUAL_FIDELIDADE);
    linhas.push(`fidelidade (${PERCENTUAL_FIDELIDADE}%): - ${formatarReal(descontoFidelidade)}`);
    total -= descontoFidelidade;
  }

  linhas.push(`total a pagar: ${formatarReal(total)}`);
  return linhas.join('\n');
}

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const campoFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botao = document.getElementById('fechar') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const resultado: string | null = fecharCompra(campoItens.value, campoCupom.value, campoFidelidade.checked);
  if (resultado === null) {
    saida.textContent = 'nenhum item válido';
    saida.className = 'erro';
    return;
  }
  saida.textContent = resultado;
  saida.className = 'sucesso';
});
