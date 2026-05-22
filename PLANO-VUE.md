# Plano de Migração para Vue.js — Banquinho do SID

## Estado atual do projeto

Projeto 100% vanilla JS com:
- `index.html` — HTML estático com modais e UI do jogo
- `app.js` — JS puro manipulando DOM diretamente (`getElementById`, `createElement`, `innerHTML`, etc.)
- `style.css` — estilos (não muda nada aqui por enquanto)

---

## O que vamos aprender em cada etapa

| # | Conceito Vue | O que muda no projeto |
|---|---|---|
| 1 | Instalação via CDN | Adicionar Vue no `<script>` sem build tool |
| 2 | `createApp` + `data()` | Substituir `let jogadores = []` por reatividade Vue |
| 3 | `v-model` | Input do nome do jogador vira reativo |
| 4 | `v-for` | Lista de jogadores no modal vira declarativa |
| 5 | `v-show` / `v-if` | Visibilidade dos banners/modal controlada por Vue |
| 6 | `methods` | Todas as funções entram no objeto `methods` |
| 7 | `v-bind` (`:`) | IDs dinâmicos e classes ligados a dados |
| 8 | `v-on` (`@`) | Todos os `onclick` viram `@click` |
| 9 | Computed properties | Cálculos derivados dos dados |
| 10 | Componente filho simples | Extrair o card do jogador como componente |

---

## Passos detalhados

### ETAPA 1 — Instalar Vue via CDN ✅
- [ok] Remover `<script src="app.js">` do `index.html`
- [ok] Adicionar `<script src="https://unpkg.com/vue@3/dist/vue.global.js">` no `<head>`
- [ok] Criar o `<div id="app">` envolvendo todo o conteúdo do `<body>`
- [ok] No `app.js`, criar `Vue.createApp({}).mount('#app')` — app vazio funcionando
> **Conceito:** Vue precisa de um elemento raiz para "montar" e controlar o DOM.

---

### ETAPA 2 — Reatividade com `data()` ✅
- [ok] Mover `let jogadores = []` para dentro de `data()` no app Vue
- [ok] Adicionar `mostrarOverlay: true`, `mostrarBannerPix: false`, `mostrarSemSaldo: false`
- [ok] Confirmar no console que `app.jogadores` responde a mudanças
> **Conceito:** `data()` é onde vivem os dados reativos — qualquer mudança neles reflete na tela automaticamente.

---

### ETAPA 3 — `v-model` no input ✅
- [ok] Adicionar `nomeDigitado: ''` no `data()`
- [ok] Trocar `<input id="nomeJogador">` por `<input v-model="nomeDigitado">`
- [ok] Remover o `document.getElementById('nomeJogador')` da função `adicionarJogador`
- [ok] Usar `this.nomeDigitado` no lugar e resetar com `this.nomeDigitado = ''`
> **Conceito:** `v-model` é two-way binding — o input atualiza o dado e o dado atualiza o input.

---

### ETAPA 4 — `v-for` na lista do modal e nos cards do jogo ✅
- [ok] Remover o bloco `jogadorElement = createElement(...)` de `adicionarJogador`
- [ok] No HTML, `listaJogadores` já usa `v-for="jogador in jogadores" :key="jogador.nome"`
- [ok] Cada item exibe `{{ jogador.nome }}`
- [ok] Cards do jogo também usam `v-for` com `:key`
- [ok] Adicionar `class="jogador"` e estrutura correta (nome + `R$ dinheiro`) nos cards do jogo
- [ok] Remover a função `iniciarJogo()` do app.js — o v-for substitui ela
- [ok] Remover `atualizarLista()` do app.js — também substituída pelo v-for
> **Conceito:** `v-for` renderiza uma lista de elementos a partir de um array — chega de criar elementos com JS.

### PENDÊNCIAS IDENTIFICADAS ANTES DA PRÓXIMA SESSÃO
- A imagem do SID (escondida ao adicionar 1º jogador) ainda usa `getElementById` — converter pra `v-show` na etapa 5
- O overlay usa `id="overlay"` + `classList.add('hidden')` no JS — converter pra `v-show="mostrarOverlay"` na etapa 5
- `iniciarJogo()` no HTML usa `@click` mas a função ainda é global e usa `jogadores` sem `this` — mover pra `methods` ou remover (etapa 6)
- `adicionarJogador()` ainda tem DOM manipulation manual (linhas 13-29) que ficou obsoleta com o v-for

---

### ETAPA 5 — `v-show` nos modais e banners ✅
- [ok] Trocar `overlay` para usar `v-show="mostrarOverlay"` em vez de `.classList.add('hidden')`
- [ok] Trocar `bannerPix` para usar `v-show="mostrarBannerPix"` em vez de `style.display = 'block'`
- [ok] Imagem do SID usa `v-show="jogadores.length === 0"` — expressão direta no template
- [ok] Remover manipulação manual da imagem do `adicionarJogador`
> **Conceito:** `v-show` adiciona/remove `display:none` automaticamente com base em um booleano.

---

### ETAPA 6 — `methods` para todas as funções ✅
- [ok] Mover todas as funções para `methods: {}` no Vue
- [ok] Substituir `getElementById` por dados reativos com `this`
- [ok] Substituir `jogadores.forEach/find/filter` por `this.jogadores.*`
- [ok] Remover funções globais obsoletas do final do arquivo
- [ok] Deletar `atualizarDinheiro` — `v-for` reativo substitui ela
> **Conceito:** `methods` é onde ficam as funções do componente; `this` acessa os dados reativos.

---

### ETAPA 7 — `v-bind` (`:`) para atributos dinâmicos ✅
- [ok] `v-for` com `:key` e `:value` nos `<option>` de todos os selects
- [ok] `{{ jogador.dinheiro }}` diretamente no template — sem IDs manuais
- [ok] `v-show` com expressão direta: `jogadores.length === 0`
> **Conceito:** `:attr="valor"` vincula um atributo HTML a um dado reativo.

---

### ETAPA 8 — `@click` nos botões (v-on) ✅
- [ok] Trocar todos os `onclick="funcao()"` por `@click="funcao"`
- [ok] Navbar com `@click` em todos os botões
> **Conceito:** `@click` é atalho para `v-on:click` — ouvinte de evento declarativo no template.

---

### ETAPA 9 — Computed properties ✅
- [ok] Criar `totalDinheiro` computed: soma o dinheiro de todos com `reduce`
- [ok] Exibir `{{ totalDinheiro }}` no template sem parênteses
> **Conceito:** `computed` são dados derivados — recalculam sozinhos quando a dependência muda.

---

### ETAPA 10 — Primeiro componente filho ✅
- [ok] Extrair o card `<div class="jogador">` em um componente `PlayerCard`
- [ok] Passar `nome` e `dinheiro` via `props`
- [ok] Registrar o componente no app Vue com `components: { PlayerCard }`
- [ok] Usar `<player-card>` no template principal com `:nome` e `:dinheiro`
> **Conceito:** componentes são blocos reutilizáveis com seu próprio template, dados e lógica.

---

## Regras do plano

- Vamos fazer **uma etapa por vez**
- Marcar cada sub-item com `ok` quando concluído: `- [ok]`
- O projeto deve funcionar (ou quase) ao final de cada etapa
- Dúvidas sobre o conceito → pergunte antes de avançar
- Bugs do JS original serão corrigidos ao longo da migração

---

## Bugs encontrados no JS original (corrigir durante a migração)

1. `fazerPix()` acessa `.dinheiro` em um elemento DOM em vez do array `jogadores`
2. `fazerPix()` chama `abrirBannerPix()` no começo — deveria fechar, não abrir
3. `<select>` sem fechar `>` no HTML (tag mal formada)
4. `adcionar()` e `remover()` na navbar não estão implementadas
