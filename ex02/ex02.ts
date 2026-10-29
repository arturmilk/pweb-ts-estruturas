type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

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

export function mensagemBandeira(bandeira: Bandeira): string {
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

export function calcularConta(consumo: number, tipo: TipoCliente, bandeira: Bandeira): string {
  const energia: number = consumo * tarifaPorKwh(tipo);
  const adicional: number = adicionalBandeira(consumo, bandeira);
  const total: number = energia + adicional;
  return `energia: R$ ${energia.toFixed(2)}\n` +
    `bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
    `total: R$ ${total.toFixed(2)}\n` +
    mensagemBandeira(bandeira);
}

console.log(adicionalBandeira(100));

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const campoTipo = document.getElementById('tipo') as HTMLSelectElement;
const campoBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const consumo: number = Number(campoConsumo.value);
  const tipo = campoTipo.value as TipoCliente;
  const bandeira = campoBandeira.value as Bandeira;

  if (consumo <= 0) {
    saida.textContent = 'informe um consumo válido';
    saida.className = 'erro';
    return;
  }

  saida.textContent = calcularConta(consumo, tipo, bandeira);
  saida.className = bandeira !== 'verde' ? 'alerta' : '';
});
