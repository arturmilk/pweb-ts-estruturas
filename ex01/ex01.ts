export function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

export function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 && frequencia >= 0 && frequencia <= 100;
}

export function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'reprovado por falta';
  } else if (media >= 7) {
    return 'aprovado';
  } else if (media >= 4) {
    return `exame final (precisa tirar ${(10 - media).toFixed(1)})`;
  } else {
    return 'reprovado por nota';
  }
}

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

  if (!dadosValidos(n1, n2, frequencia)) {
    saida.textContent = 'dados inválidos';
    saida.className = 'erro';
    return;
  }

  const media: number = calcularMedia(n1, n2);
  const resultado: string = situacao(media, frequencia);

  saida.textContent = `${nome}: média ${media.toFixed(1)}. ${resultado}`;
  saida.className = resultado === 'aprovado' ? 'sucesso' : 'erro';
});
