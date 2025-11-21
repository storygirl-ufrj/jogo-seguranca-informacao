# Jogo de Tabuleiro Digital: Segurança da Informação 🛡️

Este projeto é um jogo de tabuleiro digital educativo voltado para ensinar e testar conhecimentos sobre segurança da informação no qual os jogadores avançam casas rolando dados, como num jogo de percurso. Desenvolvido como parte de um desafio laboral do projeto StoryGirl.

## Objetivo

Promover o aprendizado de boas práticas de segurança digital por meio de uma experiência lúdica e interativa.

## Tecnologias utilizadas 

  - React: Biblioteca principal para construção da interface.
  - TypeScript: Linguagem utilizada nos arquivos fonte (.tsx, .ts).
  - Vite: Ferramenta de build e desenvolvimento rápido.
  - Radix UI: Conjunto de componentes acessíveis e estilizados para React, usado amplamente na interface (accordion, dialogs, menu, etc.).
  - Tailwind CSS (e tailwind-merge): Utilitário para estilização e padronização visual.
  - Lucide React: Ícones vetoriais.
  - Recharts: Biblioteca para gráficos.
  - Embla Carousel, react-hook-form, sonner, cmdk, vaul: Outras libs auxiliares diversas para UI, formulários, notificações e UX.
  - next-themes: Suporte a temas/claro-escuro.
  - Outras bibliotecas Radix: Tooltip, Switch, Avatar, Checkbox, etc.

## Características do jogo e como jogar

As principais características e regras visíveis no código e nos dados:

  - O jogo pode ser em modo individual ("Um Jogador") ou multiplayer (vários jogadores).
  - Cada jogador seleciona seu nome e sua cor ao iniciar.
  - Os jogadores avançam casas no tabuleiro rolando o dado virtual.
  - Algumas casas são “bônus” (faz avançar mais casas) e outras são “penalidade” (faz voltar casas/rodadas).
  - Para ganhar, deve-se chegar à última casa ("CHEGADA!").
  - Durante o percurso, surgem dicas e mensagens educativas sobre segurança digital, baseadas nas casas em que se cai.
  - As ações, penalidades e bônus estão detalhadas nos dados (gameData.ts).

## Para jogar

  1. Escolha o modo de jogo (sozinho ou com até 4 pessoas no mesmo dispositivo).
  2. Cada jogador digita seu nome.
  3. Role os dados para avançar pelo tabuleiro.
  4. Siga as instruções das casas especiais: bônus (avanço) ou penalidade (volta/espera).
  5. O primeiro a chegar ao final vence.

  ## Para rodar o jogo na sua máquina 

  Execute o comando para instalar todas as dependências:
  
   `npm i` 

Iniciar o servidor de desenvolvimento com:

 `npm run dev` 
 