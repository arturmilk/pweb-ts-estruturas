const PARCELA_MINIMA = 50;
export function calcularTotal(valor, parcelas) {
    if (parcelas <= 3) {
        return valor;
    }
    return valor * 1.02 ** parcelas;
}
export function simularParcelamento(preco, entrada) {
    const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
    let linhas = '';
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
            continue;
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        if (valorParcela < PARCELA_MINIMA) {
            break;
        }
        const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhas += `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td>` +
            `<td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const corpoTabela = document.getElementById('parcelas');
botao.addEventListener('click', () => {
    const preco = Number(campoPreco.value);
    if (campoEntrada.value === '') {
        saida.textContent = `valor financiado: R$ ${preco.toFixed(2)}`;
        corpoTabela.innerHTML = simularParcelamento(preco);
        return;
    }
    const entrada = Number(campoEntrada.value);
    if (entrada >= preco) {
        saida.textContent = 'a entrada cobre o valor total. Não há parcelas.';
        corpoTabela.innerHTML = '';
        return;
    }
    saida.textContent = `valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
    corpoTabela.innerHTML = simularParcelamento(preco, entrada);
});
//# sourceMappingURL=ex03.js.map