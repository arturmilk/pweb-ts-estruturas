const MAX_ITENS = 20;
const PERCENTUAL_FIDELIDADE = 5;
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
export function lerPrecos(texto) {
    const precos = [];
    let ignorados = 0;
    const linhas = texto.split('\n');
    for (let i = 0; i < linhas.length; i++) {
        if (precos.length >= MAX_ITENS) {
            break;
        }
        const linha = linhas[i].trim();
        if (linha === '') {
            continue;
        }
        const valor = Number(linha.replace(',', '.'));
        if (Number.isNaN(valor) || valor <= 0) {
            ignorados++;
            continue;
        }
        precos.push(valor);
    }
    return { precos, ignorados };
}
export function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
export function calcularDesconto(total, valor) {
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
export function fecharCompra(texto, cupom, fidelidade) {
    const { precos, ignorados } = lerPrecos(texto);
    if (precos.length === 0) {
        return null;
    }
    const subtotal = somarItens(...precos);
    const linhas = [];
    const textoItens = ignorados > 0
        ? `itens: ${precos.length} (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
        : `itens: ${precos.length}`;
    linhas.push(textoItens);
    linhas.push(`subtotal: ${formatarReal(subtotal)}`);
    let total = subtotal;
    if (cupom.trim() !== '') {
        const desconto = calcularDesconto(subtotal, cupom.trim());
        if (desconto > 0) {
            linhas.push(`cupom ${cupom.trim().toUpperCase()}: - ${formatarReal(desconto)}`);
            total -= desconto;
        }
        else {
            linhas.push('cupom inválido ou não aplicável');
        }
    }
    if (fidelidade) {
        const descontoFidelidade = calcularDesconto(total, PERCENTUAL_FIDELIDADE);
        linhas.push(`fidelidade (${PERCENTUAL_FIDELIDADE}%): - ${formatarReal(descontoFidelidade)}`);
        total -= descontoFidelidade;
    }
    linhas.push(`total a pagar: ${formatarReal(total)}`);
    return linhas.join('\n');
}
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const resultado = fecharCompra(campoItens.value, campoCupom.value, campoFidelidade.checked);
    if (resultado === null) {
        saida.textContent = 'nenhum item válido';
        saida.className = 'erro';
        return;
    }
    saida.textContent = resultado;
    saida.className = 'sucesso';
});
//# sourceMappingURL=ex05.js.map