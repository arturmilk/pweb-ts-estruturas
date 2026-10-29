type Formatador = (valor: number) => string;

type Simulacao = { meses: number; saldo: number; depositado: number };

const LIMITE_MESES: number = 600;

export const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;

export const formatarMeses: (meses: number) => string = (meses: number): string => {
  const anos: number = Math.floor(meses / 12);
  const resto: number = meses % 12;
  const textoAnos: string = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  const textoMeses: string = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
  if (anos === 0) return textoMeses;
  if (resto === 0) return textoAnos;
  return `${textoAnos} e ${textoMeses}`;
};

export function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): Simulacao {
  let saldo: number = 0;
  let depositado: number = 0;
  let meses: number = 0;

  while (saldo < meta) {
    if (meses >= LIMITE_MESES) {
      break;
    }
    meses++;
    const valorDoMes: number = meses % 12 === 0 ? deposito * 2 : deposito;
    saldo = saldo * (1 + taxa / 100) + valorDoMes;
    depositado += valorDoMes;
  }
  return { meses, saldo, depositado };
}

export function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

export function montarResultado(meta: number, sim: Simulacao): { texto: string; atingiu: boolean } {
  if (sim.saldo < meta) {
    return {
      texto: `meta inalcançável em 50 anos.\n${exibirValor(`saldo após ${LIMITE_MESES} meses`, sim.saldo, formatarReal)}`,
      atingiu: false,
    };
  }
  return {
    texto: `você atinge a meta em ${sim.meses} meses (${formatarMeses(sim.meses)}).\n` +
      `${exibirValor('saldo final', sim.saldo, formatarReal)}\n` +
      `${exibirValor('total depositado', sim.depositado, formatarReal)}\n` +
      `${exibirValor('rendimento', sim.saldo - sim.depositado, formatarReal)}`,
    atingiu: true,
  };
}

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

botao.addEventListener('click', (): void => {
  const meta: number = Number(campoMeta.value);
  const deposito: number = Number(campoDeposito.value);

  if (meta <= 0 || deposito <= 0) {
    saida.textContent = 'informe valores positivos';
    saida.className = 'erro';
    return;
  }

  const sim: Simulacao = campoTaxa.value === ''
    ? calcularMeses(meta, deposito)
    : calcularMeses(meta, deposito, Number(campoTaxa.value));

  const resultado = montarResultado(meta, sim);
  saida.textContent = resultado.texto;
  saida.className = resultado.atingiu ? 'sucesso' : 'erro';
});
