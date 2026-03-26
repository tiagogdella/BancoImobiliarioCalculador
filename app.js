let jogadores = [];

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

function fazerPix() {
    abrirBannerPix();

    const jogador1 = document.getElementById('nome1');
    const jogador2 = document.getElementById('nome2');
    const valorPix = document.getElementById('valor');

    if (!jogador1 || !jogador2) {
        console.error('Jogador não encontrado');
        return;
    };

    if (jogador1.dinheiro < valor) {
        abriModalSemSaldo(nome1, nome2, valor);
        return;
    };

    jogador1.dinheiro -= valorPix.value;
    jogador2.dinheiro += valorPix.value;

    atualizarDinheiro(jogador1.textContent);
    atualizarDinheiro(jogador2.textContent);
}

function abrirBannerPix() {
    const selectDe = document.getElementById('nome1');
    const selectPara = document.getElementById('nome2');

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

function fecharBannerPix() {
    const banner = document.getElementById('bannerPix');
    banner.style.display = 'none';
}

function abriModalSemSaldo(nome1, nome2, valor) {
    document.getElementById('meuBanner').style.display = 'block';
}
function fecharModalSemSaldo() {
    document.getElementById('meuBanner').style.display = 'none';
}

function atualizarDinheiro(nome) {
    const dinheiroElement = document.getElementById(`dinheiro-${nome}`);
    if (dinheiroElement) {
        const jogador = jogadores.find(jogador => jogador.nome === nome);
        dinheiroElement.textContent = `R$ ${jogador.dinheiro}`;
    };
}