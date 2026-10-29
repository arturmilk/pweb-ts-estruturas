export function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
export function dadosValidos(n1, n2, frequencia) {
    return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 && frequencia >= 0 && frequencia <= 100;
}
export function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'reprovado por falta';
    }
    else if (media >= 7) {
        return 'aprovado';
    }
    else if (media >= 4) {
        return `exame final (precisa tirar ${(10 - media).toFixed(1)})`;
    }
    else {
        return 'reprovado por nota';
    }
}
const campoNome = document.getElementById('nome');
const campoN1 = document.getElementById('n1');
const campoN2 = document.getElementById('n2');
const campoFrequencia = document.getElementById('frequencia');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const nome = campoNome.value;
    const n1 = Number(campoN1.value);
    const n2 = Number(campoN2.value);
    const frequencia = Number(campoFrequencia.value);
    if (!dadosValidos(n1, n2, frequencia)) {
        saida.textContent = 'dados inválidos';
        saida.className = 'erro';
        return;
    }
    const media = calcularMedia(n1, n2);
    const resultado = situacao(media, frequencia);
    saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
    saida.className = resultado === 'aprovado' ? 'sucesso' : 'erro';
});
//# sourceMappingURL=ex01.js.map