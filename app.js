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