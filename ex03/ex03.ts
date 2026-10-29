const PARCELA_MINIMA: number = 50;

export function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  return valor * 1.02 ** parcelas;
}

export function simularParcelamento(preco: number, entrada?: number): string {
  const financiado: number = typeof entrada !== 'undefined' ? preco - entrada : preco;
  let linhas: string = '';

  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
      continue;
    }

    const total: number = calcularTotal(financiado, parcelas);
    const valorParcela: number = total / parcelas;

    if (valorParcela < PARCELA_MINIMA) {
      break;
    }

    const juros: string = parcelas <= 3 ? 'sem juros' : '2% a.m.';
    linhas += `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
      `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }
  return linhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

botao.addEventListener('click', (): void => {
  const preco: number = Number(campoPreco.value);

  if (campoEntrada.value === '') {
    saida.textContent = `valor financiado: R$ ${preco.toFixed(2)}`;
    corpoTabela.innerHTML = simularParcelamento(preco);
    return;
  }

  const entrada: number = Number(campoEntrada.value);
  if (entrada >= preco) {
    saida.textContent = 'a entrada cobre o valor total. Não há parcelas.';
    corpoTabela.innerHTML = '';
    return;
  }

  saida.textContent = `valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
  corpoTabela.innerHTML = simularParcelamento(preco, entrada);
});
