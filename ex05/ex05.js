// Exercício 05: Caixa do mercado (projeto integrador)
// Conteúdos: parâmetros rest, spread, sobrecarga de funções e todos os anteriores.
const MAX_ITENS = 20;
const PERCENTUAL_FIDELIDADE = 5;
// ---------- Lógica ----------
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
// Lê uma linha por item. for + continue (pula linhas ruins) + break (limite de 20).
export function lerPrecos(texto) {
    const precos = [];
    let ignorados = 0;
    const linhas = texto.split('\n');
    for (let i = 0; i < linhas.length; i++) {
        // break: chegou a 20 itens, o resto é desconsiderado.
        if (precos.length >= MAX_ITENS) {
            break;
        }
        const linha = linhas[i].trim();
        // continue: linha vazia é só pulada (não conta como ignorada).
        if (linha === '') {
            continue;
        }
        // Aceita vírgula ou ponto: troca a vírgula por ponto.
        const valor = Number(linha.replace(',', '.'));
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
export function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
// Implementação única: typeof descobre qual forma foi chamada.
export function calcularDesconto(total, valor) {
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
export function fecharCompra(texto, cupom, fidelidade) {
    const { precos, ignorados } = lerPrecos(texto);
    if (precos.length === 0) {
        return null;
    }
    // Spread (...precos): "espalha" o array como argumentos separados.
    const subtotal = somarItens(...precos);
    const linhas = [];
    const textoItens = ignorados > 0
        ? `Itens: ${precos.length} (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`
        : `Itens: ${precos.length}`;
    linhas.push(textoItens);
    linhas.push(`Subtotal: ${formatarReal(subtotal)}`);
    let total = subtotal;
    if (cupom.trim() !== '') {
        const desconto = calcularDesconto(subtotal, cupom.trim());
        if (desconto > 0) {
            linhas.push(`Cupom ${cupom.trim().toUpperCase()}: - ${formatarReal(desconto)}`);
            total -= desconto;
        }
        else {
            linhas.push('Cupom inválido ou não aplicável');
        }
    }
    if (fidelidade) {
        // Mais 5% sobre o valor já com o cupom (usa a forma numérica da sobrecarga).
        const descontoFidelidade = calcularDesconto(total, PERCENTUAL_FIDELIDADE);
        linhas.push(`Fidelidade (${PERCENTUAL_FIDELIDADE}%): - ${formatarReal(descontoFidelidade)}`);
        total -= descontoFidelidade;
    }
    linhas.push(`Total a pagar: ${formatarReal(total)}`);
    return linhas.join('\n');
}
// ---------- Página ----------
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const resultado = fecharCompra(campoItens.value, campoCupom.value, campoFidelidade.checked);
    if (resultado === null) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    saida.textContent = resultado;
    saida.className = 'sucesso';
});
//# sourceMappingURL=ex05.js.map