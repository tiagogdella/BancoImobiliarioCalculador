Vue.createApp({
    data() {
        return {
            jogadores : [],
            mostrarOverlay : true,
            mostrarBannerPix : false,
            mostrarSemSaldo : false
        }
    }
}).mount('#app')


function iniciarJogo() {
    document.getElementById('overlay').classList.add('hidden');

    const container = document.getElementById('jogadoresAtivos');
    container.innerHTML = '';

    jogadores.forEach(jogador => {
        //Nome fixo
        const cardJogador = document.createElement('div');
        cardJogador.classList.add('jogador');

        const nomeElement = document.createElement('div');
        nomeElement.textContent = jogador.nome;

        //Dinheiro(dinamico)
        const dinheiroElement = document.createElement('div');
        dinheiroElement.textContent = `R$ ${jogador.dinheiro}`;
        dinheiroElement.id = `dinheiro-${jogador.nome}`;

        //add
        cardJogador.appendChild(nomeElement);
        cardJogador.appendChild(dinheiroElement);

        container.appendChild(cardJogador);
    })
}

function adicionarJogador() {
    const imagem = document.getElementById('imagem-sid');
    if(imagem){
        imagem.style.display = 'none';
    }
    
    const input = document.getElementById('nomeJogador');
    const nomeJogador = input.value.trim();

    if (!nomeJogador) return;

    const listaJogadores = document.getElementById('listaJogadores');

    const jogadorElement = document.createElement('div');
    jogadorElement.textContent = nomeJogador;
    jogadorElement.classList.add('jogadorAdd');

    listaJogadores.appendChild(jogadorElement);

    jogadores.push({
        nome: nomeJogador,
        dinheiro: 2000
    });

    input.value = '';
}

function adcionar() {
    const nome1 = document.getElementById('nomeAdd').value;
    const valorAdd = document.getElementById('valorAdd').value;

    const jogador = jogadores.find(j=> j.nome === nome1);

    if (!jogador) {
        console.error('Jogador não encontrado');
        return;
    };

    jogador.dinheiro = Number(jogador.dinheiro) + Number(valorAdd);
    atualizarDinheiro(jogador.nome);
    fecharBannerAdd();
}

function abrirBannerAdd() {
    const select = document.getElementById('nomeAdd');

    select.innerHTML = '';
    
    jogadores.forEach(jogador => { 
        const option1 = document.createElement('option');
        option1.value = jogador.nome;
        option1.textContent = jogador.nome;
        
        select.appendChild(option1);
    });
    
    const banner = document.getElementById('bannerAdd');
    banner.style.display = 'block';
}

function remover() {
    const nome1 = document.getElementById('nomeRem').value;
    const valorAdd = document.getElementById('valorRem').value;

    const jogador = jogadores.find(j=> j.nome === nome1);

    if (!jogador) {
        console.error('Jogador não encontrado');
        return;
    };

    jogador.dinheiro = Number(jogador.dinheiro) - Number(valorAdd);
    atualizarDinheiro(jogador.nome);
    fecharBannerRem();
}

function abrirBannerRem() {
    const select = document.getElementById('nomeRem');

    select.innerHTML = '';

    jogadores.forEach(jogador => { 
        const option1 = document.createElement('option');
        option1.value = jogador.nome;
        option1.textContent = jogador.nome;
        
        select.appendChild(option1);
    });

    const banner = document.getElementById('bannerRem');
    banner.style.display = 'block';

}

function fazerPix() {

    const nome1 = document.getElementById('nomeDe').value;
    const nome2 = document.getElementById('nomePara').value;
    const valorPix = document.getElementById('valorPix').value;

    const jogador1 = jogadores.find(j => j.nome === nome1);
    const jogador2 = jogadores.find(j => j.nome === nome2);


    if (!jogador1 || !jogador2) {
        console.error('Jogador não encontrado');
        return;
    };

    if (Number(jogador1.dinheiro) < Number(valorPix)) {
        abrirModalSemSaldo(nome1, nome2, valorPix);
        return;
    };

    jogador1.dinheiro = Number(jogador1.dinheiro) - Number(valorPix);
    jogador2.dinheiro = Number(jogador2.dinheiro) + Number(valorPix);

    atualizarDinheiro(jogador1.nome);
    atualizarDinheiro(jogador2.nome);
    fecharBannerPix();
}

function abrirBannerPix() {
    const selectDe = document.getElementById('nomeDe');
    const selectPara = document.getElementById('nomePara');

    selectDe.innerHTML = '';
    selectPara.innerHTML = '';
    
    jogadores.forEach(jogador => { 
        const option1 = document.createElement('option');
        option1.value = jogador.nome;
        option1.textContent = jogador.nome;
        
        const option2 = document.createElement('option');
        option2.value = jogador.nome;
        option2.textContent = jogador.nome;

        selectDe.appendChild(option1);
        selectPara.appendChild(option2);
    });

    const banner = document.getElementById('bannerPix');
    banner.style.display = 'block';

}

function falir(){
    const nomeFal = document.getElementById('nomeFal').value
    jogadores = jogadores.filter(j => j.nome !== nomeFal);

    atualizarLista();
    fecharBannerFal();
}

function abrirBannerFal() {
    const select = document.getElementById('nomeFal');

    select.innerHTML = '';

    jogadores.forEach(jogador => { 
        const option1 = document.createElement('option');
        option1.value = jogador.nome;
        option1.textContent = jogador.nome;
        
        select.appendChild(option1);
    });

    const banner = document.getElementById('bannerFal');
    banner.style.display = 'block';
}

function fecharBannerPix() {
    const banner = document.getElementById('bannerPix');
    banner.style.display = 'none';
}

function fecharBannerAdd() {
    const banner = document.getElementById('bannerAdd');
    banner.style.display = 'none';
}

function fecharBannerRem() {
    const banner = document.getElementById('bannerRem');
    banner.style.display = 'none';
}

function fecharBannerFal() {
    document.getElementById('bannerFal').style.display = 'none';
}


function atualizarDinheiro(nome) {
    const dinheiroElement = document.getElementById(`dinheiro-${nome}`);
    if (dinheiroElement) {
        const jogador = jogadores.find(jogador => jogador.nome === nome);
        dinheiroElement.textContent = `R$ ${Number(jogador.dinheiro)}`;
    };
}

function atualizarLista() {
    const container = document.getElementById('jogadoresAtivos');
    container.innerHTML = '';

    jogadores.forEach(jogador => {
        //Nome fixo
        const cardJogador = document.createElement('div');
        cardJogador.classList.add('jogador');

        const nomeElement = document.createElement('div');
        nomeElement.textContent = jogador.nome;

        //Dinheiro(dinamico)
        const dinheiroElement = document.createElement('div');
        dinheiroElement.textContent = `R$ ${jogador.dinheiro}`;
        dinheiroElement.id = `dinheiro-${jogador.nome}`;

        //add
        cardJogador.appendChild(nomeElement);
        cardJogador.appendChild(dinheiroElement);

        container.appendChild(cardJogador);
    })
}

