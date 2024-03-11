const html = document.querySelector('html');
const botoes = document.querySelectorAll('.app__card-button')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const descansoBt = document.querySelector('.app__card-button--longo');
const tituloDaPag = document.querySelector('.app__title');
const tituloDaPagNeg = document.querySelector('.app__title-strong');
const alternarMusica = document.querySelector('#alternar-musica');
const iconeComecar = document.querySelector('.app__card-primary-butto-icon')
const startPauseBt = document.querySelector('#start-pause')
const musica = new Audio ('./sons/luna-rise-part-one.mp3');
musica.loop = true;
const musicaStart = new Audio('./sons/play.wav')
const musicaPause = new Audio('./sons/pause.mp3')
const musicaTemporizador = new Audio('./sons/beep.mp3')
const iniciarOuPausarTexto = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorrido = 1500;
let intervaloId = null;


alternarMusica.addEventListener('change', () =>{
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})
focoBt.addEventListener('click', () => {
    alterarContexto('foco')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
})

descansoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');  
})

function alterarContexto(contexto){
    html.setAttribute('data-contexto', contexto)
    document.querySelector('.app__image').src = `./imagens/${contexto}.png`
    botoes.forEach(botoes => {
        botoes.classList.remove('active');
    });
    switch (contexto) {
        case 'foco':
            tituloDaPag.innerHTML = `Otimize sua produtividade,
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            focoBt.classList.add('active');
            tempoDecorrido = 1500;
            exibirOTempo()
            break;
        
        case 'descanso-curto':
            tituloDaPag.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
            curtoBt.classList.add('active');
            tempoDecorrido = 300;
            exibirOTempo()
            break;

        case 'descanso-longo':
            tituloDaPag.innerHTML = `Hora de voltar à superfície
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            descansoBt.classList.add('active');
            tempoDecorrido = 900;
            exibirOTempo()
    }
    
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        musicaTemporizador.play()
        alert("tempo encerrado")
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        iconeComecar.src = './imagens/play_arrow.png'
        iniciarOuPausarTexto.textContent = 'Começar'
        return
    }
    tempoDecorrido -= 1
    exibirOTempo()
}

startPauseBt.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(intervaloId){
        musicaPause.play()
        iconeComecar.src = './imagens/play_arrow.png'
        iniciarOuPausarTexto.textContent = 'Começar'
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    musicaStart.play();
    iconeComecar.src = './imagens/pause.png'
    iniciarOuPausarTexto.textContent = 'Pausar'
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null;
}

function exibirOTempo(){
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

exibirOTempo()