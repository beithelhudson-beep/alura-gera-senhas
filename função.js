// Referências de manipulação da interface
const campoResultado = document.getElementById('campo-resultado');
const valorComprimento = document.getElementById('valor-comprimento');
const btnDiminuir = document.getElementById('diminuir-tamanho');
const btnAumentar = document.getElementById('aumentar-tamanho');

const chkAlta = document.getElementById('chk-alta');
const chkBaixa = document.getElementById('chk-baixa');
const chkNum = document.getElementById('chk-num');
const chkSimb = document.getElementById('chk-simb');

const feedbackStatus = document.getElementById('feedback-status');
const textoFeedback = document.getElementById('texto-feedback');

// Conjuntos alfanuméricos estáveis
const conjuntoDados = {
    alta: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    baixa: 'abcdefghijklmnopqrstuvwxyz',
    num: '0123456789',
    simb: '!@#$%¨&*()_+=-[]{}'
};

let comprimentoSenha = 12;

// Captura de eventos para botões incrementais
btnDiminuir.addEventListener('click', () => {
    if (comprimentoSenha > 6) {
        comprimentoSenha--;
        computarFluxo();
    }
});

btnAumentar.addEventListener('click', () => {
    if (comprimentoSenha < 30) {
        comprimentoSenha++;
        computarFluxo();
    }
});

// Atualizações baseadas na modificação dos seletores
[chkAlta, chkBaixa, chkNum, chkSimb].forEach(checkbox => {
    checkbox.addEventListener('change', computarFluxo);
});

// Orquestrador de processos
function computarFluxo() {
    valorComprimento.textContent = comprimentoSenha;
   
    let stringMestra = '';
    let selecoesAtivas = 0;

    if (chkAlta.checked) { stringMestra += conjuntoDados.alta; selecoesAtivas++; }
    if (chkBaixa.checked) { stringMestra += conjuntoDados.baixa; selecoesAtivas++; }
    if (chkNum.checked) { stringMestra += conjuntoDados.num; selecoesAtivas++; }
    if (chkSimb.checked) { stringMestra += conjuntoDados.simb; selecoesAtivas++; }

    if (!stringMestra) {
        campoResultado.value = '';
        feedbackStatus.className = 'status-box';
        textoFeedback.textContent = 'Ative um parâmetro de caracteres.';
        return;
    }

    // Sorteio posicional
    let senhaPronta = '';
    for (let i = 0; i < comprimentoSenha; i++) {
        const indice = Math.floor(Math.random() * stringMestra.length);
        senhaPronta += stringMestra.charAt(indice);
    }

    campoResultado.value = senhaPronta;
    analisarCriptografia(comprimentoSenha, selecoesAtivas);
}

// Cálculo e renderização de status
function analisarCriptografia(tamanho, filtros) {
    feedbackStatus.className = 'status-box'; // Reseta o container de feedback
   
    let pontuacao = tamanho * filtros;

    if (pontuacao < 18 || tamanho < 8) {
        feedbackStatus.classList.add('gl-fraco');
    } else if (pontuacao >= 18 && pontuacao < 36) {
        feedbackStatus.classList.add('gl-medio');
    } else {
        feedbackStatus.classList.add('gl-forte');
    }

    // Cálculo estatístico de força bruta
    let combinacoes = Math.pow(filtros * 12, tamanho);
    let estimativaAnos = Math.floor(combinacoes / 3153600000000); // Fator de teste em escala anual

    if (estimativaAnos <= 0) {
        textoFeedback.textContent = 'Segurança básica. Quebra realizável em poucas semanas.';
    } else {
        textoFeedback.textContent = `Nível estável. Tempo estimado para quebra de dados: ~${estimativaAnos.toLocaleString('pt-BR')} anos.`;
    }
}

// Inicializador da rotina
computarFluxo();
