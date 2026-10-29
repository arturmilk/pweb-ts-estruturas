// Exercício 03: Simulador de parcelamento
// Conteúdos: for, break, continue e parâmetro opcional.

const PARCELA_MINIMA: number = 50;

// ---------- Lógica ----------

// Até 3 parcelas sem juros; a partir de 4, juros compostos de 2% ao mês.
export function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  return valor * 1.02 ** parcelas;
}

// Parâmetro opcional (entrada?): pode ser chamado com 1 ou 2 argumentos.
// Devolve as linhas <tr> da tabela.
export function simularParcelamento(preco: number, entrada?: number): string {
  // typeof verifica se a entrada foi informada.
  const financiado: number = typeof entrada !== 'undefined' ? preco - entrada : preco;
  let linhas: string = '';

  // Laço for de 1 a 12 parcelas.
  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    // continue: pula as opções que a loja não oferece e vai para a próxima volta.
    if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
      continue;
    }

    const total: number = calcularTotal(financiado, parcelas);
    const valorParcela: number = total / parcelas;

    // break: encerra o laço inteiro quando a parcela fica abaixo do mínimo.
    if (valorParcela < PARCELA_MINIMA) {
      break;
    }

    const juros: string = parcelas <= 3 ? 'sem juros' : '2% a.m.';
    linhas += `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
      `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }
  return linhas;
}

// ---------- Página ----------

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

botao.addEventListener('click', (): void => {
  const preco: number = Number(campoPreco.value);

  // Campo vazio: chama sem o segundo argumento (entrada fica undefined).
  if (campoEntrada.value === '') {
    saida.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
    corpoTabela.innerHTML = simularParcelamento(preco);
    return;
  }

  const entrada: number = Number(campoEntrada.value);
  if (entrada >= preco) {
    saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
    corpoTabela.innerHTML = '';
    return;
  }

  saida.textContent = `Valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
  corpoTabela.innerHTML = simularParcelamento(preco, entrada);
});
