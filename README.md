# 🏦 Banquinho do SID

> 🇧🇷 Português | [🇺🇸 English below](#english)

---

## 🇧🇷 Português

### Como surgiu

Numa noite marcada para jogar Banco Imobiliário com os amigos, a máquina de cartão estava quebrada e ninguém tinha dinheiro em espécie para usar como recurso do jogo. Em vez de cancelar a partida, surgiu a ideia: **por que não fazer um banco digital na hora?**

Foi assim que nasceu o Banquinho do SID — um gerenciador de saldo para partidas de Banco Imobiliário, criado numa noite de improviso e evoluído ao longo do tempo como projeto de aprendizado.

### O que faz

- Cadastra jogadores com saldo inicial de R$ 2.000
- Transfere dinheiro entre jogadores (Pix)
- Adiciona ou remove saldo de um jogador
- Retira um jogador falido da partida
- Exibe o total de dinheiro em circulação

### Evolução do projeto

| Versão | Tecnologias | Pasta |
|---|---|---|
| v1 | HTML + CSS + JavaScript puro | `/` (raiz) |
| v2 | Vue.js 3 + Vite + TypeScript | `Banco_imob_type_vue/` |

A versão 1 foi construída do zero com JavaScript vanilla. A versão 2 é uma reescrita completa usando Vue 3 com Composition API e TypeScript, como projeto de estudo e evolução do currículo.

### Como rodar (v2 — Vue + TypeScript)

```bash
cd Banco_imob_type_vue
npm install
npm run dev
```

Acesse `http://localhost:5173`

### Tecnologias (v2)

- [Vue 3](https://vuejs.org/) — Composition API + `<script setup>`
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [Vite](https://vitejs.dev/) — build tool moderna

---

## 🇺🇸 English <a name="english"></a>

### How it started

On a night planned to play Monopoly with friends, the card machine was broken and nobody had cash to use as in-game money. Instead of canceling the session, the idea came up: **why not build a digital bank on the spot?**

That's how Banquinho do SID was born — a balance manager for Monopoly sessions, created in an improvised night and evolved over time as a learning project.

### What it does

- Registers players with a starting balance of R$ 2,000
- Transfers money between players (Pix)
- Adds or removes balance from a player
- Removes a bankrupt player from the game
- Displays the total money in circulation

### Project evolution

| Version | Technologies | Folder |
|---|---|---|
| v1 | HTML + CSS + Vanilla JavaScript | `/` (root) |
| v2 | Vue.js 3 + Vite + TypeScript | `Banco_imob_type_vue/` |

Version 1 was built from scratch with vanilla JavaScript. Version 2 is a complete rewrite using Vue 3 with Composition API and TypeScript, as a study and portfolio project.

### How to run (v2 — Vue + TypeScript)

```bash
cd Banco_imob_type_vue
npm install
npm run dev
```

Open `http://localhost:5173`

### Tech stack (v2)

- [Vue 3](https://vuejs.org/) — Composition API + `<script setup>`
- [TypeScript](https://www.typescriptlang.org/) — static typing
- [Vite](https://vitejs.dev/) — modern build tool
