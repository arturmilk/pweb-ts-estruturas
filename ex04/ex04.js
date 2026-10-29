const LIMITE_MESES = 600;
export const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
export const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const resto = meses % 12;
    const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
    if (anos === 0)
        return textoMeses;
    if (resto === 0)
        return textoAnos;
    return `${textoAnos} e ${textoMeses}`;
};
export function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        if (meses >= LIMITE_MESES) {
            break;
        }
        meses++;
        const valorDoMes = meses % 12 === 0 ? deposito * 2 : deposito;
        saldo = saldo * (1 + taxa / 100) + valorDoMes;
        depositado += valorDoMes;
    }
    return { meses, saldo, depositado };
}
export function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
export function montarResultado(meta, sim) {
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
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const meta = Number(campoMeta.value);
    const deposito = Number(campoDeposito.value);
    if (meta <= 0 || deposito <= 0) {
        saida.textContent = 'informe valores positivos';
        saida.className = 'erro';
        return;
    }
    const sim = campoTaxa.value === ''
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, Number(campoTaxa.value));
    const resultado = montarResultado(meta, sim);
    saida.textContent = resultado.texto;
    saida.className = resultado.atingiu ? 'sucesso' : 'erro';
});
//# sourceMappingURL=ex04.js.map