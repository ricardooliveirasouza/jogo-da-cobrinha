let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let estado = 0;
var jogo;
var audio = new Audio('jaws.mp3');

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function fim()
{
    audio.loop = false;
    audio.pause();
    //audio.stop();
    clearInterval(jogo);
    alert('Game Over :(');
}

function iniciarJogo(){ 

    var s = document.getElementById("comprimento");

    s.innerHTML = "COMPRIMENTO : " + snake.length;  

    if(snake[0].x > 15*box && direction == "right") fim(); //snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') fim(); //snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") fim(); //snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') fim(); //snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            fim();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha

    if(snake.length > 30)
    {
        if(estado == 2)
        {
            estado = 3;
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, tempo());
        }
    }
    else if(snake.length > 20)
    {
        if(estado == 1)
        {
            estado = 2;
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, tempo());
        }
    }
    else if(snake.length > 10)
    {
        if(estado == 0)
        {
            estado = 1;
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, tempo());
        }
    }
}


function tempo()
{
    let valor = 0;

    if(estado == 0)
    {
        valor = 350;
    }
    else if(estado == 1)
    {
        valor = 280;
    }
    else if(estado == 2)
    {
        valor = 210;
    }
    else
    {
        valor = 140;
    }
    return valor;
}

function inicio()
{
    snake = [];
    snake[0] ={
        x: 8 * box,
        y: 8 * box
    };
    direction = "right";
    food ={
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };
    estado = 0;
    jogo = setInterval(iniciarJogo, tempo());

    audio.loop = true;
    audio.play();
}