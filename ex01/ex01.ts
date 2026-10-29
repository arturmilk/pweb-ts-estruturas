// Exercício 01: Situação do aluno no semestre
// Conteúdos: if / else if / else, operadores lógicos, ternário e funções.

// ---------- Lógica (funções puras, sem tocar no document) ----------

// Calcula a média simples das duas notas.
export function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

// Operadores lógicos: && exige que TODAS as condições sejam verdadeiras.
// Notas entre 0 e 10 e frequência entre 0 e 100, numa única condição.
export function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 && frequencia >= 0 && frequencia <= 100;
}

// if / else if / else: a ordem importa!
// A falta vem primeiro, porque reprova qualquer que seja a média.
export function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    // Mostra quanto falta para o exame: 10 - média.
    return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

// ---------- Página (lê os campos, chama as funções e mostra) ----------

const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoN1 = document.getElementById('n1') as HTMLInputElement;
const campoN2 = document.getElementById('n2') as HTMLInputElement;
const campoFrequencia = document.getElementById('frequencia') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const nome: string = campoNome.value;
  const n1: number = Number(campoN1.value);
  const n2: number = Number(campoN2.value);
  const frequencia: number = Number(campoFrequencia.value);

  // Retorno antecipado: se os dados forem inválidos, mostra o aviso e sai.
  if (!dadosValidos(n1, n2, frequencia)) {
    saida.textContent = 'Dados inválidos';
    saida.className = 'erro';
    return;
  }

  const media: number = calcularMedia(n1, n2);
  const resultado: string = situacao(media, frequencia);

  saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
  // Ternário: condição ? valorSeVerdadeiro : valorSeFalso
  saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
