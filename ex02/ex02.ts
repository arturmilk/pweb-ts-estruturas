// Exercício 02: Conta de luz
// Conteúdos: switch (com cases agrupados), parâmetro padrão e tipos literais.

// Tipos literais: a variável só aceita exatamente um desses textos.
type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

// ---------- Lógica ----------

// switch com cases agrupados: dois case seguidos caem no mesmo bloco.
export function tarifaPorKwh(tipo: TipoCliente): number {
  switch (tipo) {
    case 'residencial':
    case 'rural':
      return 0.8;
    case 'comercial':
    case 'industrial':
      return 0.95;
  }
}

// Parâmetro padrão: se a bandeira não for informada, vale 'verde'.
export function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
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

// As duas vermelhas agrupadas; o default cobre qualquer outro caso.
export function mensagemBandeira(bandeira: Bandeira): string {
  switch (bandeira) {
    case 'verde':
      return 'Condições favoráveis de geração de energia.';
    case 'amarela':
      return 'Condições de geração menos favoráveis.';
    case 'vermelha1':
    case 'vermelha2':
      return 'Condições mais caras de geração. Economize!';
    default:
      return 'Bandeira desconhecida.';
  }
}

// Nome da bandeira para exibir (ex.: "amarela", "vermelha patamar 2").
function nomeBandeira(bandeira: Bandeira): string {
  switch (bandeira) {
    case 'vermelha1':
      return 'vermelha patamar 1';
    case 'vermelha2':
      return 'vermelha patamar 2';
    default:
      return bandeira;
  }
}

// Monta o texto completo da conta.
export function calcularConta(consumo: number, tipo: TipoCliente, bandeira: Bandeira): string {
  const energia: number = consumo * tarifaPorKwh(tipo);
  const adicional: number = adicionalBandeira(consumo, bandeira);
  const total: number = energia + adicional;
  return `Energia: R$ ${energia.toFixed(2)}\n` +
    `Bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
    `Total: R$ ${total.toFixed(2)}\n` +
    mensagemBandeira(bandeira);
}

// Teste do parâmetro padrão:
console.log(adicionalBandeira(100));
// Resultado: 0. Como a bandeira não foi passada, ela assume o valor padrão 'verde',
// e a bandeira verde não tem adicional.

// ---------- Página ----------

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const campoTipo = document.getElementById('tipo') as HTMLSelectElement;
const campoBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const consumo: number = Number(campoConsumo.value);
  // O .value do select é string; "as" diz ao TS que é um dos tipos literais.
  const tipo = campoTipo.value as TipoCliente;
  const bandeira = campoBandeira.value as Bandeira;

  if (consumo <= 0) {
    saida.textContent = 'Informe um consumo válido';
    saida.className = 'erro';
    return;
  }

  saida.textContent = calcularConta(consumo, tipo, bandeira);
  saida.className = bandeira !== 'verde' ? 'alerta' : '';
});
