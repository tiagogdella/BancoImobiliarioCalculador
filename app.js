const PlayerCard = {
    props: ['nome', 'dinheiro'],
    template: `
        <div class="jogador">
            <div>{{ nome }}</div>
            <div>R$ {{ dinheiro }}</div>
        </div>
    `
}

Vue.createApp({
    components:{
        PlayerCard
    },
    data() {
        return {
            jogadores : [],
            mostrarOverlay : true,
            mostrarBannerPix : false,
            mostrarSemSaldo : false,
            mostrarBannerAdd : false,
            mostrarBannerRem : false,
            mostrarBannerFal : false,
            nomeDigitado: '',
            nomeSelecionado : '',
            valorAdcionar : '',
            nomeDe : '',
            nomePara : '',
            valorPix : '',
            nomeRemover : '',
            valorRemover : '',
            nomeFalir : ''
        }
    },

    computed: {
        totalDinheiro(){
            return this.jogadores.reduce((soma, j) => soma + Number(j.dinheiro), 0)
        }
    },    

     methods: {
        adicionarJogador() {
    
            const input = this.nomeDigitado;
            const nomeJogador = input.trim();

            if (!nomeJogador) return;

            this.jogadores.push({
                nome: nomeJogador,
                dinheiro: 2000
                });

            this.nomeDigitado = '';
        },

        iniciarJogo(){
            this.mostrarOverlay = false
        },

        abrirBannerPix(){
            this.mostrarBannerPix = true
        },

        fecharBannerPix(){
            this.mostrarBannerPix = false
        },

        abrirBannerAdd(){
            this.mostrarBannerAdd = true
        },

        fecharBannerAdd(){
            this.mostrarBannerAdd = false
        },

        abrirBannerRem(){
            this.mostrarBannerRem = true
        },

        fecharBannerRem(){
            this.mostrarBannerRem = false
        },

        abrirBannerFal(){
            this.mostrarBannerFal = true
        },

        fecharBannerFal(){
            this.mostrarBannerFal = false
        },

        fazerPix(){
            const jogadorDe = this.jogadores.find(j=> j.nome === this.nomeDe)
            const jogadorPara = this.jogadores.find(j=> j.nome === this.nomePara)

            if(!jogadorDe || !jogadorPara){
                console.log("Jogadores invalidos")
                return
            }

            if (Number(jogadorDe.dinheiro) < Number(this.valorPix)){
                this.mostrarSemSaldo = true
                return
            }

            jogadorDe.dinheiro = Number(jogadorDe.dinheiro) - Number(this.valorPix)
            jogadorPara.dinheiro = Number(jogadorPara.dinheiro) + Number(this.valorPix)

            this.fecharBannerPix()
        },

        adcionar(){
            const jogador = this.jogadores.find(j=> j.nome === this.nomeSelecionado)

            if(!jogador) return

            jogador.dinheiro = Number(jogador.dinheiro) + Number(this.valorAdcionar)
            this.mostrarBannerAdd = false
        },

        remover(){
            const nome = this.jogadores.find(j=> j.nome === this.nomeRemover)

            if (!nome){
                console.log("Nome invalido!")
                return
            }

            nome.dinheiro = Number(nome.dinheiro) - Number(this.valorRemover)
            this.fecharBannerRem()
        },

        falir(){
            const nome = this.jogadores.find(j=>j.nome === this.nomeFalir)
            
            if(!nome){
                console.log("Nome invalido!")
                return
            }

            this.jogadores = this.jogadores.filter(j=>j !== nome)
            this.fecharBannerFal()
        }
    }
}).mount('#app')



