// Exercício 01: Situação do aluno no semestre
// Conteúdos: if / else if / else, operadores lógicos, ternário e funções.
// ---------- Lógica (funções puras, sem tocar no document) ----------
// Calcula a média simples das duas notas.
export function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
// Operadores lógicos: && exige que TODAS as condições sejam verdadeiras.
// Notas entre 0 e 10 e frequência entre 0 e 100, numa única condição.
export function dadosValidos(n1, n2, frequencia) {
    return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 && frequencia >= 0 && frequencia <= 100;
}
// if / else if / else: a ordem importa!
// A falta vem primeiro, porque reprova qualquer que seja a média.
export function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'Reprovado por falta';
    }
    else if (media >= 7) {
        return 'Aprovado';
    }
    else if (media >= 4) {
        // Mostra quanto falta para o exame: 10 - média.
        return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
    }
    else {
        return 'Reprovado por nota';
    }
}
// ---------- Página (lê os campos, chama as funções e mostra) ----------
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
    // Retorno antecipado: se os dados forem inválidos, mostra o aviso e sai.
    if (!dadosValidos(n1, n2, frequencia)) {
        saida.textContent = 'Dados inválidos';
        saida.className = 'erro';
        return;
    }
    const media = calcularMedia(n1, n2);
    const resultado = situacao(media, frequencia);
    saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
    // Ternário: condição ? valorSeVerdadeiro : valorSeFalso
    saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
//# sourceMappingURL=ex01.js.map