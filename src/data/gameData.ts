import { GameTile } from '../types/game';

export const gameTiles: GameTile[] = [
  { id: 1, type: 'normal' },
  { id: 2, type: 'normal' },
  {
    id: 3,
    type: 'bonus',
    title: 'Compartilhou com os pais!',
    description: 'Conversou com seus pais sobre um assunto importante. Avance 2 casas!',
    action: 2
  },
  { id: 4, type: 'normal' },
  {
    id: 5,
    type: 'penalty',
    title: 'Compartilhou demais!',
    description: 'Não clique e aceite de tudo que compartilham na internet. Fique sem jogar uma rodada!',
    action: 0
  },
  { id: 6, type: 'normal' },
  { id: 7, type: 'normal' },
  { id: 8, type: 'normal' },
  { id: 9, type: 'normal' },
  {
    id: 10,
    type: 'bonus',
    title: 'Denunciou!',
    description: 'Denunciou um perfil que não oferecia conteúdo apropriado. Avance o dobro!',
    action: 2
  },
  {
    id: 11,
    type: 'penalty',
    title: 'Mandou arquivos!',
    description: 'Mandou arquivos para pessoas que não conhece. Volte 3 casas!',
    action: -3
  },
  { id: 12, type: 'normal' },
  { id: 13, type: 'normal' },
  {
    id: 14,
    type: 'penalty',
    title: 'Compartilhou informações!',
    description: 'Compartilhou informações pessoais. Não diga o verdadeiro nome ou onde mora na internet. Volte uma rodada!',
    action: -1
  },
  { id: 15, type: 'normal' },
  { id: 16, type: 'normal' },
  {
    id: 17,
    type: 'bonus',
    title: 'Prestou atenção!',
    description: 'Precisou que aquela mensagem era fraude. Avance 2 casas!',
    action: 2
  },
  { id: 18, type: 'normal' },
  {
    id: 19,
    type: 'penalty',
    title: 'Não foi permitido!',
    description: 'Não foi legal acessar sem permissão de um adulto. É preciso ter 13+ anos para criar uma conta em redes sociais.',
    action: 0
  },
  { id: 20, type: 'normal' },
  {
    id: 21,
    type: 'bonus',
    title: 'Bloqueou na hora!',
    description: 'Bloqueou na hora! É sempre bom estar seguro e conversar apenas com quem conhece. Avance 3 casas!',
    action: 3
  },
  {
    id: 22,
    type: 'penalty',
    title: 'Curtiu mensagem!',
    description: 'Curtiu mensagem falando mal de alguém na internet. Volte 4 casas!',
    action: -4
  },
  { id: 23, type: 'normal' },
  {
    id: 24,
    type: 'bonus',
    title: 'Protegeu a senha!',
    description: 'Sua senha é só sua! Guarde-a bem. Avance 2 casas!',
    action: 2
  },
  { id: 25, type: 'normal' },
  { id: 26, type: 'normal' },
  {
    id: 27,
    type: 'penalty',
    title: 'Senha fraca!',
    description: 'Senha muito fácil! Cuidado, a sua senha não deve revelar dados pessoais e precisa ser difícil. Volte 3 casas!',
    action: -3
  },
  { id: 28, type: 'normal' },
  {
    id: 29,
    type: 'bonus',
    title: 'Verificou a fonte!',
    description: 'Verificou a fonte! Nem tudo que aparece online é verdade. Avance 2 casas!',
    action: 2
  },
  { id: 30, type: 'normal' },
  { id: 31, type: 'normal' },
  {
    id: 32,
    type: 'penalty',
    title: 'Ficou muito tempo!',
    description: 'Ficou muito tempo conectado na aula. Volte 3 casas!',
    action: -3
  },
  { id: 33, type: 'normal' },
  { id: 34, type: 'normal' },
  {
    id: 35,
    type: 'bonus',
    title: 'Tomou cuidado!',
    description: 'Quando alguém tiver comportamento suspeito na internet, fale com seus pais. Movimento duplo!',
    action: 2
  },
  { id: 36, type: 'normal' },
  { id: 37, type: 'normal' },
  { id: 38, type: 'finish', title: 'CHEGADA!', description: 'Parabéns! Você completou o jogo!' }
];

export const playerColors = [
  { color: '#FC279C', name: 'Rosa' },
  { color: '#990B7E', name: 'Magenta' },
  { color: '#7D0899', name: 'Roxo' },
  { color: '#01002A', name: 'Azul Marinho' }
];
