export function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
export function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
    }
}
export function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'condições favoráveis de geração de energia.';
        case 'amarela':
            return 'condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'condições mais caras de geração. Economize!';
        default:
            return 'bandeira desconhecida.';
    }
}
function nomeBandeira(bandeira) {
    switch (bandeira) {
        case 'vermelha1':
            return 'vermelha patamar 1';
        case 'vermelha2':
            return 'vermelha patamar 2';
        default:
            return bandeira;
    }
}
export function calcularConta(consumo, tipo, bandeira) {
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    return `energia: R$ ${energia.toFixed(2)}\n` +
        `bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
        `total: R$ ${total.toFixed(2)}\n` +
        mensagemBandeira(bandeira);
}
console.log(adicionalBandeira(100));
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const consumo = Number(campoConsumo.value);
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    if (consumo <= 0) {
        saida.textContent = 'informe um consumo válido';
        saida.className = 'erro';
        return;
    }
    saida.textContent = calcularConta(consumo, tipo, bandeira);
    saida.className = bandeira !== 'verde' ? 'alerta' : '';
});
//# sourceMappingURL=ex02.js.map