# DJlivery-jogo#

DJlivery é um jovem que a noite é DJ e pelas manhã trabalha entregando delivery em sua bike. Ajude DJlivery nas suas entregas desviando os obstáculos!

* Link do jogo:

## Motivação

A motivação é criar um jogo que seja fácil, divertido, competitivo e curto para a disciplina de estágio 1. Além disso, aprimorar e explorar o desenvolvimento da área de jogos, como dinâmicas e conceitos.

## Objetivo

O objetivo do jogo é proteger o personagem principal DJlivery por mais tempo e conseguir uma maior pontuação, fazendo ele continuar nas suas entregas.

## Valor Agregado

Agregar e explorar novas dinâmicas no desenvolvimento de jogos.

## Fases

Nessa fase inicial, o jogo terá apenas uma fase corrida de sobrevivência, apesar de que posteriormente possa ter fases individuais. O que muda na fase é que ela vai ficando mais rápida e portanto, mais difícil de proteger o personagem, os obstáculos vão aparecendo mais rápidos, as sequências também e afins.

Apesar disso, a fase corrida possui 3 ciclos basicamente: 

1 - O personagem fica no centro da tela na bicicleta correndo e os obstáculos dinâmicos vão até ele, como um cachorro, um carro que vem por baixo ou um senhora com carrinho de bebê ou um idoso passa na frente vem por baixo. Dura 30 segundos.

2 - Depois disso, o personagem se mexe em uma área quadricular delimitada invisível e o jogador terá que clicar nos obstáculos fixos para desviar como  gato, carrinho de comida ou um cone. Dura 30 segundos. Após ele dar a volta, ele retorna para o centro da tela.

3 - Além disso, após voltar ao centro da tela, aparece 3 sequências na tela, uma por vez, para ele clicar em ordem, poderia ser feita uma bônus no final valendo mais pontos. Toda vez que ele acertar, ele faz uma manobra na tela. Se ele errar ou o tempo passar, a correia da bicicleta solta, ele cai e perde. Após isso, se o jogador passar, ele volta para a primeira dinãmica.

## Esquema de Pontuação

O jogo possuirá basicamente dois sistemas de pontuação:
  1 - Por mob acertado: 
    A ideia que o personagem principal fique centrado ou se mexendo e os obstáculos que aparecerem sejam retirados quando o jogador clica antes de acertar o DJlivery, dessa maneira, cada obstáculo vai somar uma quantidade de pontos: 
      Exemplo de pontuação (Ideia inicial): 
        Obstáculos dinâmicos (vão em direção ao personagem): 
          Cachorro: 20 pontos;
          Mulher com carinho de bebê: 10 pontos;
          Idoso: 10 pontos;
          Carros: 30 pontos;
        Obstáculos fixos (personagem vai em direção):
          Gato: 10 pontos;
          Cone: 10 pontos;
          Carrinho de comida: 10 pontos;
   1 - Por sequência digitada: 
        A ideia é quando passar X tempo vai aparecer 3 sequências (A, W, S e D) para ele clicar, valendo 50 pontos, inicialmente com o tempo de 10 segundos em cada e quanto mais dificil for ficando diminuindo: 10 segundos, 8 segundos, 5 segundos e 3 segundos. Pode ser feito também uma extra se der tempo, valendo 100 pontos (se der tempo de fazer).

## Requisitos

Épicos/Funcionalidades:
  - Módulo 1: Fazer ele fixar fixo na tela e ir aparecendo os obstáculos iniciais como cachorro, carro, idoso e carrinho;
  - Módulo 2: Fazer ele se mover de forma circular e voltar para o ponto inicial, e nesse raio aparecer certos obstáculos;
  - Módulo 3: Aparecer uma sequência para ele clicar e ele fazer uma manobra;

Personagens
  - DJlivery - personagem principal que está fazendo suas entregas e precisa ser protegido;
  - Obstáculos: Gato, cachorro, idoso, mulher com carrinho de bebê, carro e etc;

## Protótipos de Tela

DIAGRAMA COM O PROTOTIPO DO JOGO

## Tecnologias e Ferramentas utilizadas

- Phaser;
