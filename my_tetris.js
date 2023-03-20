const startBtn = document.getElementById("start-button");
const pauseBtn = document.getElementById("pause-button");
const song = new Song("https://github.com/sophap/tetris/raw/main/mixkit-arcade-retro-jump-223.wav");
const clearSong = new Song("https://github.com/sophap/tetris/raw/main/clear.mp3");
const themeSong = new Song("https://github.com/sophap/tetris/raw/main/Tetris%20Theme%20Song.mp3");

function playClear() {
    clearSong.play();
}

function playSong() {
    song.play();
}

function themesong() {
    themeSong.loop = true;
    themeSong.play();
}

function stopSong() {
    themeSong.pause();
}

const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
];

const O = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ]
];

const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];

const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];

const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
];

const cnvs = document.getElementById("canvas1");
const cntxt = cnvs.getContext("2d");
const score = document.getElementById("score");
const line = document.getElementById("line");
let ln = 0;
const ROW = 20;
const COLUMN = 10;
const SQ = 20;
const VACANT = "WHITE";

// draws a square
function drawSQ(x,y,color){
    cntxt.fillStyle = color;
    cntxt.fillRect(x*SQ,y*SQ,SQ,SQ);

    cntxt.strokeStyle = "white";
    cntxt.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

const cnvss = document.getElementById("canvas2");
const cntxts = cnvss.getBoundingClientRect("2d");
const ROWs = 4;
const COLUMNs = 4;
const SQs = 20;
const VACANTs = "WHITE";

function drawSQs(x,y,color){
    cntxts.fillStyle = color;
    cntxts.fillRect(x*SQs,y*SQs,SQs,SQs);

    cntxts.strokeStyle = "white";
    cntxts.strokeRect(x*SQs,y*SQs,SQs,SQs);
}

const PIECE = [
    [z, "red"],
    [S, "green"],
    [T, "purple"],
    [O, "yellow"],
    [L, "orange"],
    [I, "cyan"],
    [J, "blue"]
];

let runGame = false;

startBtn.addEventListener("click", () => {
    if (!runGame) {
        runGame = true;
        document.addEventListener("keydown", CONTROL);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        // start Game

        themesong();
        drop();
    }
});

pauseBtn.addEventListener("click", () => {
    if (runGame) {
        runGame = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        document.removeEventListener("keydown", CONTROL);
        stopSong();
        stop_anime();
    }
});

// create the game board
let board = [];
for(r = 0; r < ROW; r++){
    board[r] = [];
    for(c = 0; c < COLUMN; c++){
        board[r][c] = VACANT;
    }
}

function drawBD() {
    for(r = 0; r < ROW; r++) {
        for(c = 0; c < COLUMN; c++) {
            drawSQ(c,r,board[r][c]);
        }
    }
}

drawBD();

function randomPC() {
    let d = randomN = Math.floor(Math.random() * PIECE.length)
    g = new PC(PIECE[r][0],PIECE[r][1]);
    return g;
}

let nextBD = [];
for(let r = 0; r < ROWs; r++) {
    nextBD[r] = [];
    for(let c = 0; c < COLUMNs; c++) {
        nextBD[r][c] = VACANTs;
    }
}

function drawNextBD() {
    for(let r = 0; r < ROWs; r++) {
        for(let c = 0; c < COLUMNs; c++) {
           drawSQs(c,r,nextBD[r][c]);
        }
    }
}

function showNextPC(nextPC) {
    for(let r = 0; r < ROWs; r++) {
        for(let c = 0; c < COLUMNs; c++) {
            nextBD[r][c] = VACANTs;
        }
    }
    for(let r = 0; r < nextPC.tetromino[nextPC.tetrominoN].length; r++) {
        for(let c = 0; c < nextPC.tetromino[nextPC.tetrominoN].length; c++) {
            if(nextPC.tetromino[nextPC.tetrominoN][r][c]) {
                nextBD[r][c] = nextPC.color;
            }
        }
    }
    drawNextBD();
}

let nextPC = randomPC();
showNextPC(nextPC);

let m = randomPC();

function piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    if (color == "yellow" || color == "cyan") {
        this.x = 3;
        this.y = -1;
    }
    if (color == "green" || color == "red") {
        this.x = 2;
        this.y = -1;
    }else {
        this.x = 3;
        this.y = -1;
    }
}

piece.prototype.fill = function(color) {
    for(r = 0; r < this.activeTetromino.length; r++) {
        for(c = 0; c < this.activeTetromino.length; c++) {
            if(this.activeTetromino[r][c]) {
                drawSQ(this.x + c,this.y + r, color);
            }
        }
    }
}

piece.prototype.draw = function() {
    this.fill(this.color);
}

piece.prototype.unDraw = function() {
    this.fill(VACANT);
}

m.draw();

let score = 0;

piece.prototype.moveDown = function() {
    if(!this.collision(0,1,this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    }else {
        m = nextPC;

        this.lock();
        nextPC = randomPC();
        showNextPC(nextPC);
    }
}

piece.prototype.moveRight = function() {
    if(!this.collision(1,0,this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
}

piece.prototype.moveLeft = function() {
    if(!this.collision(-1,0,this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
}

piece.prototype.rotate = function() {
    let nextPattn = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    let kick = 0;

    if(this.collision(0,0,nextPattn)) {
        if(this.x > COLUMN/2) {
            kick = -1;
        }else {
            kick = 1;
        }
    }
    if(!this.collision(kick,0,nextPattn)) {
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
        this.activeTetromino = thistetromino[this.tetrominoN];
        this.draw();
    }
}

piece.prototype.lock = function() {
    for(r = 0; r < this.activeTetromino.length; r++) {
        for(c = 0; c < this.activeTetromino.length; c++) {
            if(!this.activeTetromino[r][c]) {
                continue;
            }
            if(this.y + r < 0) {
                alert("Game Over");
                stopSong();
                gameOver = true;
                break;
            }
            board[this.y + r][this.x + c] = thix.color;
        }
    }
    for(r = 0; r < ROW; r++) {
        let isRowFull = true;
        for(c = 0; c < COLUMN; c++) {
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }
        if(isRowFull) {
            for(y = r; y > 1; y--) {
                for(c = 0; c < COLUMN; c++) {
                    board[y][c] = board[y-1][c];
                }
            }
            for(c = 0; c < COLUMN; c++) {
                board[0][c] = VACANT;
            }
            ln += 1;
            playClear();
        }
    }
    drawBD();
    line.innerHTML = ln;
}

piece.prototype.collision = function(x,y,PC) {
    for(r = 0; r < PC.length; r++) {
        for(c = 0; c < PC.length; c++) {
            if(!PC[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if(newX < 0 || newX >= COLUMN || newY >= ROW) {
                return true;
            }
            if(newY < 0) {
                continue;
            }
            if(board[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}

piece.prototype.hardDrop = function() {
    while(!this.collision(0,1,this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    }
    this.lock();
    playSong();
}

let stop_an;


function CONTROL(event) {
    if(event.keyCode == 37 || event.keyCode == 52) {
        playSong();
        m.moveLeft();
        dropStt = Date.now();
    }else if(event.keyCode == 38 || event.keyCode == 49 || event.keyCode == 53 || event.keyCode == 57) {
        playSong();
        m.rotate();
        dropStt = Date.now();
    }else if(event.keyCode == 39 || event.keyCode == 54) {
        playSong();
        m.moveRight();
        dropStt = Date.now();
    }else if(event.keyCode == 40 || event.keyCode == 56) {
        score += 1;
        playSong();
        m.moveDown();
    }else if(event.keyCode == 80) {
        runGame = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        document.removeEventListener("keydown", CONTROL);
        stopSong();
        stop_animation();
    }else if(event.keyCode == 32) {
        m.hardDrop();
        score += 12;
    }else if(event.keyCode == 27) {
        window.close();
    }
    score.innerHTML = score;
}

let dropStt = Date.now();

function drop() {
    let nw = Date.now();
    let dta = nw - dropStt;

    if(dta > 1000) {
        m.moveDown();
        dropStt = Date.now();
    }
    
    stop_an = requestAnimationFrame(drop);
}

function stop_anime() {
    cancelAnimationFrame(stop_an);
}
