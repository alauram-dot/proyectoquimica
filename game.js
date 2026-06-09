// =============================
// TOXIC SNAKE CHEMISTRY PRO
// PARTE 1
// =============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// =============================
// CONFIGURACIÓN
// =============================

const box = 25;

const rows = canvas.height / box;
const cols = canvas.width / box;

// =============================
// ELEMENTOS SEGUROS
// =============================

const safeElements = [

{
symbol:"O",
name:"Oxígeno",
info:"Es indispensable para la respiración."
},

{
symbol:"H",
name:"Hidrógeno",
info:"Es el elemento más abundante del universo."
},

{
symbol:"N",
name:"Nitrógeno",
info:"Constituye gran parte de la atmósfera."
},

{
symbol:"Ca",
name:"Calcio",
info:"Ayuda a fortalecer los huesos."
},

{
symbol:"Mg",
name:"Magnesio",
info:"Importante para músculos y nervios."
},

{
symbol:"He",
name:"Helio",
info:"Gas utilizado en globos."
},

{
symbol:"Na",
name:"Sodio",
info:"Participa en funciones nerviosas."
},

{
symbol:"K",
name:"Potasio",
info:"Ayuda al funcionamiento celular."
}

];

// =============================
// ELEMENTOS TÓXICOS
// =============================

const toxicElements = [

{
symbol:"Hg",
name:"Mercurio",
damage:20,
info:"Metal tóxico que afecta el sistema nervioso."
},

{
symbol:"Pb",
name:"Plomo",
damage:25,
info:"Puede afectar el cerebro y el desarrollo."
},

{
symbol:"As",
name:"Arsénico",
damage:40,
info:"Veneno extremadamente peligroso."
},

{
symbol:"Cd",
name:"Cadmio",
damage:35,
info:"Produce daños renales."
},

{
symbol:"Cl",
name:"Cloro",
damage:15,
info:"Gas que irrita las vías respiratorias."
},

{
symbol:"CN",
name:"Cianuro",
damage:100,
info:"Sustancia extremadamente letal."
}

];

// =============================
// PODERES ESPECIALES
// =============================

const powers = [

{
symbol:"Si",
name:"Silicio",
power:"shield"
},

{
symbol:"Li",
name:"Litio",
power:"speed"
},

{
symbol:"Au",
name:"Oro",
power:"double"
}

];

// =============================
// VARIABLES DEL JUEGO
// =============================

let snake = [];

let direction = "RIGHT";

let score = 0;

let level = 1;

let health = 100;

let gameSpeed = 120;

let gameRunning = false;

let gameLoop;

let foods = [];

let poisons = [];

let powerUps = [];

let discoveredElements = [];

let playerName = "Invitado";

let shield = false;

let doublePoints = false;

// =============================
// REFERENCIAS HTML
// =============================

const scoreText =
document.getElementById("score");

const levelText =
document.getElementById("level");

const healthText =
document.getElementById("health");

const discoveriesText =
document.getElementById("discoveries");

const messageText =
document.getElementById("message");

const playerDisplay =
document.getElementById("playerDisplay");

const collectionList =
document.getElementById("collectionList");

// =============================
// BOTÓN INICIAR
// =============================

document
.getElementById("startBtn")
.addEventListener("click", startGame);

// =============================
// INICIAR PARTIDA
// =============================

function startGame(){

    const input =
    document.getElementById("playerName");

    playerName =
    input.value.trim() || "Jugador";

    playerDisplay.textContent =
    playerName;

    document
    .getElementById("startScreen")
    .style.display = "none";

    initializeGame();

}

// =============================
// INICIALIZAR JUEGO
// =============================

function initializeGame(){

    snake = [

        {
            x:10 * box,
            y:10 * box
        }

    ];

    direction = "RIGHT";

    score = 0;

    level = 1;

    health = 100;

    shield = false;

    doublePoints = false;

    foods = [];

    poisons = [];

    powerUps = [];

    discoveredElements = [];

    scoreText.textContent = score;
    levelText.textContent = level;
    healthText.textContent = health;
    discoveriesText.textContent = 0;

    collectionList.innerHTML = "";

    generateInitialItems();

    gameRunning = true;

    clearInterval(gameLoop);

    gameLoop =
    setInterval(draw, gameSpeed);

}

// =============================
// GENERAR OBJETOS INICIALES
// =============================

function generateInitialItems(){

    for(let i=0;i<5;i++){

        foods.push(
            generateFood()
        );

    }

    for(let i=0;i<5;i++){

        poisons.push(
            generatePoison()
        );

    }

}

// =============================
// COMIDA SEGURA
// =============================

function generateFood(){

    const element =
    safeElements[
    Math.floor(
    Math.random()
    * safeElements.length)
    ];

    return{

        x:
        Math.floor(
        Math.random()*cols
        ) * box,

        y:
        Math.floor(
        Math.random()*rows
        ) * box,

        ...element

    };

}

// =============================
// ELEMENTO TÓXICO
// =============================

function generatePoison(){

    const element =
    toxicElements[
    Math.floor(
    Math.random()
    * toxicElements.length)
    ];

    return{

        x:
        Math.floor(
        Math.random()*cols
        ) * box,

        y:
        Math.floor(
        Math.random()*rows
        ) * box,

        ...element

    };

}

// =============================
// POWER UPS
// =============================

function generatePowerUp(){

    const power =
    powers[
    Math.floor(
    Math.random()
    * powers.length)
    ];

    return{

        x:
        Math.floor(
        Math.random()*cols
        ) * box,

        y:
        Math.floor(
        Math.random()*rows
        ) * box,

        ...power

    };

}

// =============================
// CONTROLES
// =============================

window.addEventListener(
"keydown",
(event)=>{

    const key = event.key;

    if(
        (key === "ArrowLeft"
        || key === "a"
        || key === "A")
        &&
        direction !== "RIGHT"
    ){
        direction = "LEFT";
    }

    if(
        (key === "ArrowRight"
        || key === "d"
        || key === "D")
        &&
        direction !== "LEFT"
    ){
        direction = "RIGHT";
    }

    if(
        (key === "ArrowUp"
        || key === "w"
        || key === "W")
        &&
        direction !== "DOWN"
    ){
        direction = "UP";
    }

    if(
        (key === "ArrowDown"
        || key === "s"
        || key === "S")
        &&
        direction !== "UP"
    ){
        direction = "DOWN";
    }

});
// =============================
// DIBUJAR JUEGO
// =============================

function draw(){

    if(!gameRunning) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawFoods();

    drawPoisons();

    drawPowerUps();

    drawSnake();

    moveSnake();

}

// =============================
// DIBUJAR COMIDA
// =============================

function drawFoods(){

    foods.forEach(food=>{

        ctx.fillStyle = "#3b82f6";

        ctx.beginPath();

        ctx.arc(
            food.x + box/2,
            food.y + box/2,
            box/2,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "white";

        ctx.font = "12px Arial";

        ctx.fillText(
            food.symbol,
            food.x + 3,
            food.y + 16
        );

    });

}

// =============================
// DIBUJAR TÓXICOS
// =============================

function drawPoisons(){

    poisons.forEach(poison=>{

        ctx.fillStyle = "#ef4444";

        ctx.beginPath();

        ctx.arc(
            poison.x + box/2,
            poison.y + box/2,
            box/2,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "white";

        ctx.font = "12px Arial";

        ctx.fillText(
            poison.symbol,
            poison.x + 3,
            poison.y + 16
        );

    });

}

// =============================
// DIBUJAR PODERES
// =============================

function drawPowerUps(){

    powerUps.forEach(power=>{

        ctx.fillStyle = "#facc15";

        ctx.beginPath();

        ctx.arc(
            power.x + box/2,
            power.y + box/2,
            box/2,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "black";

        ctx.font = "12px Arial";

        ctx.fillText(
            power.symbol,
            power.x + 3,
            power.y + 16
        );

    });

}

// =============================
// DIBUJAR SERPIENTE
// =============================

function drawSnake(){

    let snakeColor = "#22c55e";

    if(score >= 100){
        snakeColor = "#3b82f6";
    }

    if(score >= 300){
        snakeColor = "#a855f7";
    }

    if(score >= 500){
        snakeColor = "#facc15";
    }

    snake.forEach((segment,index)=>{

        ctx.fillStyle =
        index === 0
        ? snakeColor
        : "#16a34a";

        ctx.fillRect(
            segment.x,
            segment.y,
            box,
            box
        );

    });

}

// =============================
// MOVIMIENTO
// =============================

function moveSnake(){

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "LEFT"){
        snakeX -= box;
    }

    if(direction === "RIGHT"){
        snakeX += box;
    }

    if(direction === "UP"){
        snakeY -= box;
    }

    if(direction === "DOWN"){
        snakeY += box;
    }

    const newHead = {

        x: snakeX,
        y: snakeY

    };

    // Bordes

    if(
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height
    ){

        gameOver(
            "La serpiente chocó con el laboratorio."
        );

        return;

    }

    // Chocó consigo misma

    if(
        collision(
            newHead,
            snake
        )
    ){

        gameOver(
            "La serpiente colisionó consigo misma."
        );

        return;

    }

    let ateFood = false;

    // =====================
    // COMER ELEMENTOS
    // =====================

    foods.forEach((food,index)=>{

        if(
            snakeX === food.x &&
            snakeY === food.y
        ){

            ateFood = true;

            let points = 10;

            if(doublePoints){

                points = 20;

            }

            score += points;

            foods[index] =
            generateFood();

            updateDiscoveries(food);

            showMessage(
                "🧪 " +
                food.name +
                ": " +
                food.info
            );

            updateLevel();

        }

    });

    // =====================
    // TOXICOS
    // =====================

    poisons.forEach((poison,index)=>{

        if(
            snakeX === poison.x &&
            snakeY === poison.y
        ){

            if(shield){

                poisons[index] =
                generatePoison();

                showMessage(
                    "🛡 Escudo protegió del "
                    + poison.name
                );

                return;

            }

            health -= poison.damage;

            healthText.textContent =
            health;

            showMessage(
                "☣ " +
                poison.name +
                " (-" +
                poison.damage +
                "% vida)"
            );

            poisons[index] =
            generatePoison();

            if(health <= 0){

                gameOver(
                    poison.info
                );

                return;

            }

        }

    });

    // =====================
    // PODERES
    // =====================

    powerUps.forEach((power,index)=>{

        if(
            snakeX === power.x &&
            snakeY === power.y
        ){

            activatePower(
                power.power
            );

            powerUps.splice(
                index,
                1
            );

        }

    });

    if(!ateFood){

        snake.pop();

    }

    snake.unshift(newHead);

    scoreText.textContent =
    score;

}

// =============================
// COLISIONES
// =============================

function collision(
    head,
    array
){

    for(
        let i=0;
        i<array.length;
        i++
    ){

        if(
            head.x === array[i].x &&
            head.y === array[i].y
        ){

            return true;

        }

    }

    return false;

}

// =============================
// MENSAJES
// =============================

function showMessage(text){

    messageText.textContent =
    text;

}

// =============================
// ELEMENTOS DESCUBIERTOS
// =============================

function updateDiscoveries(food){

    if(
        discoveredElements.includes(
            food.symbol
        )
    ) return;

    discoveredElements.push(
        food.symbol
    );

    discoveriesText.textContent =
    discoveredElements.length;

    const li =
    document.createElement("li");

    li.textContent =
    food.symbol +
    " - " +
    food.name;

    collectionList.appendChild(li);

}
// =============================
// NIVELES
// =============================

function updateLevel(){

    const newLevel =
    Math.floor(score / 50) + 1;

    if(newLevel === level){
        return;
    }

    level = newLevel;

    levelText.textContent =
    level;

    showMessage(
        "⭐ Nivel " +
        level +
        " alcanzado"
    );

    // Aumentar velocidad

    gameSpeed =
    Math.max(
        50,
        120 - ((level - 1) * 5)
    );

    clearInterval(gameLoop);

    gameLoop =
    setInterval(
        draw,
        gameSpeed
    );

    // Más peligros

    poisons.push(
        generatePoison()
    );

    // Quiz cada 2 niveles

    if(level % 2 === 0){

        setTimeout(()=>{
            launchQuiz();
        },500);

    }

}

// =============================
// PREGUNTAS EDUCATIVAS
// =============================

const questions = [

{
question:
"¿Cuál es el símbolo del Sodio?",
answer:"Na"
},

{
question:
"¿Cuál es el símbolo del Potasio?",
answer:"K"
},

{
question:
"¿Cuál es el símbolo del Hierro?",
answer:"Fe"
},

{
question:
"¿Cuál es el símbolo del Oxígeno?",
answer:"O"
},

{
question:
"¿Cuál es el símbolo del Calcio?",
answer:"Ca"
},

{
question:
"¿Cuál es el símbolo del Hidrógeno?",
answer:"H"
}

];

function launchQuiz(){

    const q =
    questions[
        Math.floor(
            Math.random()
            * questions.length
        )
    ];

    const response =
    prompt(q.question);

    if(response === null){
        return;
    }

    if(
        response.trim().toLowerCase()
        ===
        q.answer.toLowerCase()
    ){

        score += 50;

        scoreText.textContent =
        score;

        showMessage(
            "✅ Correcto +50 puntos"
        );

    }
    else{

        showMessage(
            "❌ Respuesta correcta: "
            + q.answer
        );

    }

}

// =============================
// PODERES
// =============================

function activatePower(power){

    if(power === "shield"){

        shield = true;

        document
        .getElementById(
            "powerStatus"
        )
        .textContent =
        "🛡 Escudo";

        showMessage(
            "🛡 Escudo activado"
        );

        setTimeout(()=>{

            shield = false;

            document
            .getElementById(
                "powerStatus"
            )
            .textContent =
            "Ninguno";

        },10000);

    }

    if(power === "speed"){

        showMessage(
            "⚡ Velocidad extra"
        );

        const oldSpeed =
        gameSpeed;

        gameSpeed =
        Math.max(
            30,
            gameSpeed - 30
        );

        clearInterval(
            gameLoop
        );

        gameLoop =
        setInterval(
            draw,
            gameSpeed
        );

        document
        .getElementById(
            "powerStatus"
        )
        .textContent =
        "⚡ Turbo";

        setTimeout(()=>{

            gameSpeed =
            oldSpeed;

            clearInterval(
                gameLoop
            );

            gameLoop =
            setInterval(
                draw,
                gameSpeed
            );

            document
            .getElementById(
                "powerStatus"
            )
            .textContent =
            "Ninguno";

        },10000);

    }

    if(power === "double"){

        doublePoints = true;

        document
        .getElementById(
            "powerStatus"
        )
        .textContent =
        "💰 Doble";

        showMessage(
            "💰 Doble puntuación"
        );

        setTimeout(()=>{

            doublePoints = false;

            document
            .getElementById(
                "powerStatus"
            )
            .textContent =
            "Ninguno";

        },10000);

    }

}

// =============================
// APARICIÓN DE PODERES
// =============================

setInterval(()=>{

    if(!gameRunning){
        return;
    }

    if(powerUps.length < 2){

        powerUps.push(
            generatePowerUp()
        );

    }

},15000);

// =============================
// GAME OVER
// =============================

function gameOver(reason){

    gameRunning = false;

    clearInterval(
        gameLoop
    );

    saveRecord();

    document
    .getElementById(
        "gameOverText"
    )
    .innerHTML =

    `
    Jugador:
    <strong>${playerName}</strong>

    <br><br>

    Puntaje:
    <strong>${score}</strong>

    <br><br>

    Nivel:
    <strong>${level}</strong>

    <br><br>

    Motivo:

    <br>

    ${reason}
    `;

    document
    .getElementById(
        "gameOver"
    )
    .style.display =
    "flex";

}

// =============================
// REINICIAR
// =============================

function restartGame(){

    document
    .getElementById(
        "gameOver"
    )
    .style.display =
    "none";

    initializeGame();

}

// =============================
// RECORD LOCAL
// =============================

function saveRecord(){

    let best =
    localStorage.getItem(
        "toxicBestScore"
    );

    if(
        !best ||
        score > Number(best)
    ){

        localStorage.setItem(
            "toxicBestScore",
            score
        );

    }

}

// =============================
// MENSAJE INICIAL
// =============================

showMessage(
"🧪 Ingresa tu nombre y comienza tu investigación química."
);
