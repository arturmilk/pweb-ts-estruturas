// Exercício 03: Simulador de parcelamento
// Conteúdos: for, break, continue e parâmetro opcional.
const PARCELA_MINIMA = 50;
// ---------- Lógica ----------
// Até 3 parcelas sem juros; a partir de 4, juros compostos de 2% ao mês.
export function calcularTotal(valor, parcelas) {
    if (parcelas <= 3) {
        return valor;
    }
    return valor * 1.02 ** parcelas;
}
// Parâmetro opcional (entrada?): pode ser chamado com 1 ou 2 argumentos.
// Devolve as linhas <tr> da tabela.
export function simularParcelamento(preco, entrada) {
    // typeof verifica se a entrada foi informada.
    const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
    let linhas = '';
    // Laço for de 1 a 12 parcelas.
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        // continue: pula as opções que a loja não oferece e vai para a próxima volta.
        if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
            continue;
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        // break: encerra o laço inteiro quando a parcela fica abaixo do mínimo.
        if (valorParcela < PARCELA_MINIMA) {
            break;
        }
        const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhas += `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
            `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
// ---------- Página ----------
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const corpoTabela = document.getElementById('parcelas');
botao.addEventListener('click', () => {
    const preco = Number(campoPreco.value);
    // Campo vazio: chama sem o segundo argumento (entrada fica undefined).
    if (campoEntrada.value === '') {
        saida.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
        corpoTabela.innerHTML = simularParcelamento(preco);
        return;
    }
    const entrada = Number(campoEntrada.value);
    if (entrada >= preco) {
        saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
        corpoTabela.innerHTML = '';
        return;
    }
    saida.textContent = `Valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
    corpoTabela.innerHTML = simularParcelamento(preco, entrada);
});
//# sourceMappingURL=ex03.js.map