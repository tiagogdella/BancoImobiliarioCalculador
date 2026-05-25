<script setup lang="ts">
import {ref, computed} from 'vue'
import PlayerCard from './components/PlayerCard.vue'
import type {Jogador} from './types'

// estado
const jogadores = ref<Jogador[]>([])
const mostrarOverlay = ref(true)
const mostrarBannerPix = ref(false)
const mostrarBannerAdd = ref(false)
const mostrarBannerRem = ref(false)
const mostrarBannerFal = ref(false)
const mostrarSemSaldo = ref(false)

const nomeDigitado = ref('')
const nomeDe = ref('')
const nomePara = ref('')
const valorPix = ref(0)
const nomeSelecionado = ref('')
const valorAdcionar = ref(0)
const nomeRemover = ref('')
const valorRemover = ref(0)
const nomeFalir = ref('')

//computed
const totalDinheiro = computed(()=>
  jogadores.value.reduce((soma, j)=> soma + j.dinheiro, 0)
)

//functions
function adicionarJogador(): void {
  if (!nomeDigitado.value.trim()) return
  jogadores.value.push({nome: nomeDigitado.value, dinheiro: 2000})
  nomeDigitado.value = ''
}

function iniciarJogo(): void {
  mostrarOverlay.value = false
}

function fazerPix(): void {
  const de = jogadores.value.find(j=> j.nome === nomeDe.value)
  const para = jogadores.value.find(j=> j.nome === nomePara.value)
  if(!de || !para) return
  if(de.dinheiro < valorPix.value) {mostrarSemSaldo.value = true; return}
  de.dinheiro -= valorPix.value
  para.dinheiro += valorPix.value
  mostrarBannerPix.value = false
}

function adcionar(): void {
  const jogador = jogadores.value.find(j=> j.nome === nomeSelecionado.value)
  if (!jogador) return 
  jogador.dinheiro += valorAdcionar.value
  mostrarBannerAdd.value = false
}

function remover(): void {
  const jogador = jogadores.value.find(j=> j.nome === nomeRemover.value)
  if (!jogador) return
  jogador.dinheiro -= valorRemover.value
  mostrarBannerRem.value = false
}

function falir(): void {
  jogadores.value = jogadores.value.filter(j=> j.nome !== nomeFalir.value)
  mostrarBannerFal.value = false
}
</script>

<template>
    <div class="fundo-principal">
        <h1 class="titulo">Banquinho do SID</h1>

        <!-- MODAL INICIAL -->
        <div class="overlay" v-show="mostrarOverlay">
            <div class="modal">
                <div class="modal-header">
                    <h1>--- Bora banquinho! :) ---</h1>
                    <input type="text" v-model="nomeDigitado" placeholder="Nome do Jogador">
                    <button @click="adicionarJogador">Adicionar</button>
                    <button @click="iniciarJogo">Iniciar Jogo</button>
                </div>
                <div class="listaJogadores">
                    <div class="jogadorAdd" v-for="jogador in jogadores" :key="jogador.nome">
                        {{ jogador.nome }}
                    </div>
                    <img src="/sid.png" class="imagem-sid" v-show="jogadores.length === 0">
                </div>
            </div>
        </div>

        <!-- CARDS DOS JOGADORES -->
        <div class="jogadores">
            <PlayerCard
                v-for="jogador in jogadores"
                :key="jogador.nome"
                :nome="jogador.nome"
                :dinheiro="jogador.dinheiro"
            />
        </div>

        <!-- BANNER PIX -->
        <div v-show="mostrarBannerPix" class="banner">
            <p>PIX</p>
            <select v-model="nomeDe">
                <option v-for="j in jogadores" :key="j.nome" :value="j.nome">{{ j.nome }}</option>
            </select>
            <select v-model="nomePara">
                <option v-for="j in jogadores" :key="j.nome" :value="j.nome">{{ j.nome }}</option>
            </select>
            <input v-model="valorPix" type="number" placeholder="Valor">
            <button @click="fazerPix">Fazer Pix</button>
            <button @click="mostrarBannerPix = false">Fechar</button>
        </div>

        <!-- BANNER ADD -->
        <div v-show="mostrarBannerAdd" class="banner">
            <p>Adicionar saldo</p>
            <select v-model="nomeSelecionado">
                <option v-for="j in jogadores" :key="j.nome" :value="j.nome">{{ j.nome }}</option>
            </select>
            <input v-model="valorAdcionar" type="number" placeholder="Valor">
            <button @click="adcionar">Add</button>
            <button @click="mostrarBannerAdd = false">Fechar</button>
        </div>

        <!-- BANNER REMOVER -->
        <div v-show="mostrarBannerRem" class="banner">
            <p>Remover saldo</p>
            <select v-model="nomeRemover">
                <option v-for="j in jogadores" :key="j.nome" :value="j.nome">{{ j.nome }}</option>
            </select>
            <input v-model="valorRemover" type="number" placeholder="Valor">
            <button @click="remover">Remover</button>
            <button @click="mostrarBannerRem = false">Fechar</button>
        </div>

        <!-- BANNER FALIR -->
        <div v-show="mostrarBannerFal" class="banner">
            <p>Tempos melhores virão :(</p>
            <select v-model="nomeFalir">
                <option v-for="j in jogadores" :key="j.nome" :value="j.nome">{{ j.nome }}</option>
            </select>
            <button @click="falir">Falir</button>
            <button @click="mostrarBannerFal = false">Fechar</button>
        </div>

        <!-- RODAPÉ -->
        <div class="rodape">
            <p>💰 Total em jogo: R$ {{ totalDinheiro }}</p>
            <nav class="navbar">
                <button @click="mostrarBannerPix = true">Pix</button>
                <button @click="mostrarBannerAdd = true">Add</button>
                <button @click="mostrarBannerRem = true">Remover</button>
                <button @click="mostrarBannerFal = true">Falir um jogador</button>
            </nav>
        </div>
    </div>
</template>


<style scoped>
.titulo { font-family: arial; text-align: center; border: 3px solid black; background-color: #fff; border-radius: 10px; padding: 5px; }
.fundo-principal { display: flex; flex-direction: column; justify-content: space-between; align-items: center; width: 95%; height: 95vh; }
.jogadores { background-color: rgba(99,98,97,0.2); display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; align-items: center; padding: 20px; margin: 10px; border-radius: 10px; width: 80%; height: 80vh; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.2); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal { background: white; padding: 20px; border-radius: 10px; width: 85%; height: 85vh; display: flex; justify-content: center; align-items: center; gap: 10px; }
.modal-header { width: 40%; flex: 1; display: grid; justify-content: center; padding: 5px; gap: 5px; height: 70%; border-radius: 10px; border-style: solid; background-color: #aee0e0; }
.listaJogadores { flex: 2; display: grid; align-items: center; justify-content: center; width: 64%; gap: 5px; font-size: 20px; border-radius: 10px; }
.imagem-sid { width: 500px; }
.banner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 3px solid black;
    border-radius: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    min-width: 300px;
}
.rodape { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.navbar { margin: 10px; display: flex; gap: 10px; }
.jogadorAdd {
    display: grid;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: rgba(240, 115, 12, 0.2);
    margin: 1px;
    padding: 5px;
    border-radius: 10px;
    border: 2px solid black;
    font-size: 50px;
}

</style>
