console.log("[DevSoutinho] Flappy Bird");
console.log(
  "Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA"
);
console.log("vamobora M");

const som_Hit = new Audio();
som_Hit.src = './efeitos/hit.wav';

/**
 * Definindo que vamos usar uma imagem no html.
 */
const sprites = new Image(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new, https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Introduction.
sprites.src = "./sprites.png"; // Qual imagem vamos usar, local do arquivo(src) que é o (NomeDaPasta/nome-da-imagem-no-arquivo.png).

/**
 * Selecionando o primeiro elemento do documento html que se chama canvas.
 */
const canvas = document.querySelector("canvas"); //https://developer.mozilla.org/pt-BR/docs/Web/API/Document/querySelector

/**
 * Dizendo para o canvas que vamos usar uma imagem que tem o contexto 2D.
 */
const contexto = canvas.getContext("2d"); //getContext, mostrando que estamos querendo manipular imagens 2d.

const globais = {};

let windowActive = {};

function fazColisao(flappyBird, chao){
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if(flappyBirdY >= chaoY){
    return true;
  } return false;
}

function criaFlappyBird(){
  /**
 * Mapeando o `sprites.png` e dimensionando nosso personagem.
 */
const flappyBird = {
  SpriteX: 0, //Local que ele esta no X da imagem.
  SpriteY: 0, //Local que ele esta no Y da imagem.
  largura: 34, //Largura dele na imagem.
  altura: 24, //Altura dele na imagem;
  x: 10, //X da imagem no canvas.
  y: 50, //Y da imagem no canvas.
  velocidade: 0, //Velocidade que ele vai estar.
  gravidade: 0.25, //Gravidade que ele vai estar.
  pulo : 4.6,
  up(){
    console.log("up");
    console.log(flappyBird.velocidade);
    flappyBird.velocidade = - flappyBird.pulo;
    console.log(flappyBird.velocidade, "depois");
  },
  /**
   * Atualizando a altura `(y)` do personagem `(FlappyBird)` na tela com base na `velocidade + gravidade`.
   */
  atualiza() {
    if(fazColisao(flappyBird, chao)){
      console.log('Fez Colisao');
      som_Hit.play();

      setTimeout(() => {
        changeWindows(windows.inicio);
      }, 500);
      return;
    }

    flappyBird.velocidade += flappyBird.gravidade;
    flappyBird.y += flappyBird.velocidade;
  },

  /**
   * Desenhando o personagem `(FlappyBird)` na tela com base no `SpriteY, SpriteX, Largura, Altura, X, Y e o recorte que é igual a Largura e Altura`
   */
  drawBird() {
    contexto.drawImage(
      //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      //chamando a função de nova imagem.

      sprites, //chamando nossa imagem, que definimos la na linha 10 e 11.

      // Sprite x, Sprite y.
      flappyBird.SpriteX,
      flappyBird.SpriteY,

      // Sprite width, Sprite Heigth, Tamanho do recorte na sprite
      flappyBird.largura,
      flappyBird.altura,

      // Aonde ele deve estar no canva.
      flappyBird.x,
      flappyBird.y,

      // Recorte dele igual o tamanho do recorte.
      flappyBird.largura,
      flappyBird.altura
    );
  },
};
return flappyBird;
}

/**
 * Mapeando o `sprites.png` e dimensionando nosso chão.
 */
const chao = {
  SpriteX: 0,
  SpriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112, //Colocando o chão no (Y) 0.
  drawChao() {
    contexto.drawImage(
      sprites,
      chao.SpriteX,
      chao.SpriteY,
      chao.largura,
      chao.altura,
      chao.x,
      chao.y,
      chao.largura,
      chao.altura
    );
    //desenhamos nosso chão duas vezes e redimensionamos o x dele para a largura do chão anterior, para que complete a tela.
    contexto.drawImage(
      sprites,
      chao.SpriteX,
      chao.SpriteY,
      chao.largura,
      chao.altura,
      chao.x + chao.largura,
      chao.y,
      chao.largura,
      chao.altura
    );
  },
};

/**
 * Mapeando `sprites.png` e dimensionando nosso plano de fundo.
 */
const planoDeFundo = {
  SpriteX: 390,
  SpriteY: 0,
  largura: 276,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  drawPlanoDeFundo() {
    //adicionando cor de fundo, com fillStyle e fillRect.
    contexto.fillStyle = "#70c5ce";
    // fillRect(0 'aonde começa a cor na largura x', 0 'aonde começa a cor na altura', canvas.width 'canvas representando o que ela vai preencher e width o que ela tem que preencher do canvas', canvas.height 'canvas representando o que ela vai preencher e height o que ela tem que preencher do canvas')
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      planoDeFundo.SpriteX,
      planoDeFundo.SpriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
    contexto.drawImage(
      sprites,
      planoDeFundo.SpriteX,
      planoDeFundo.SpriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
  },
};
/**
 *Adicionando a imagem GetReady do nosso `sprites` com as cordenadas indicas.
 */
const mensagemGetReady = {
  SpriteX: 134,
  SpriteY: 0,
  largura: 174,
  altura: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  drawMensagemGetReady() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.SpriteX,
      mensagemGetReady.SpriteY,
      mensagemGetReady.largura,
      mensagemGetReady.altura,
      mensagemGetReady.x,
      mensagemGetReady.y,
      mensagemGetReady.largura,
      mensagemGetReady.altura
    );
  },
};

/**
 * Uma função com paramentro que recebe uma nova janela. Mundando o valor da windowActive.
 */
function changeWindows(newWindow) {
  windowActive = newWindow;
  if(windowActive.inicializa){
    windowActive.inicializa();
  }
}

/**
 * Variavel para guardar as telas que vamos usar.
 */
const windows = {
  inicio: {
    inicializa(){
      globais.flappyBird = criaFlappyBird();
    },
    
    //adicionando a janela de inicio.
    draw() {
      planoDeFundo.drawPlanoDeFundo();
      chao.drawChao();
      globais.flappyBird.drawBird();
      mensagemGetReady.drawMensagemGetReady();
    },
    click() {
      //Ativando o `click()` para mudar a janela para windows game
      changeWindows(windows.game);
    },
    atualiza() {},
  },
};
windows.game = {
  //adicionando mais uma janela, dessa vez a janela aonde vai ter o jogo.
  draw() {
    planoDeFundo.drawPlanoDeFundo();
    chao.drawChao();
    globais.flappyBird.drawBird();
  },
  click(){
    globais.flappyBird.up();
  },
  atualiza() {
    globais.flappyBird.atualiza();
  }
};

/**
 * loop com a `API - requestAnimationFrame()`, que fica puxando os frames pra ele, então nessa função mostramos qual frame ele deve puxar.
 */
function loop() {
  //Aqui tem uma hierarquia de baixo para cima, desenhando primeiro o que esta em ultimo e em seguida vai desenhando sequencialmente para cima.
  windowActive.draw(); //layer 1
  windowActive.atualiza(); //layer 0
  requestAnimationFrame(loop); //https://developer.mozilla.org/pt-BR/docs/Web/API/window/requestAnimationFrame
}

window.addEventListener(
  //https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener
  "click",
  /**
   * Adicionando o evento de click linkado com a `windowActive`, aonde ficara guardado qual é a tela que está.
   */
  function () {
    if (windowActive.click) {
      windowActive.click();
    }
  }
);

changeWindows(windows.inicio);
loop(); // iniciamos a função
