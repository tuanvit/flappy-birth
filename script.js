let canvas = document.querySelector('.canvas')
let ctx = canvas.getContext('2d')
let game = 'start'
canvas.height = 625;
canvas.width = 530;
let temp = 0;

const sprites = new Image()
sprites.src = "sprites.png"
const pipe = new Image()
pipe.src = "Pipes.png"

const number = [
    { name: 0, sX: 1114, sY: 232 },
    { name: 1, sX: 1114 + (57), sY: 232 },
    { name: 2, sX: 1114 + (57) * 2, sY: 232 },
    { name: 3, sX: 1114 + (57) * 3, sY: 232 },
    { name: 4, sX: 1114, sY: 232 + (82 + 3) },
    { name: 5, sX: 1114 + (57), sY: 232 + (82 + 3) },
    { name: 6, sX: 1114 + (57) * 2, sY: 232 + (82 + 3) },
    { name: 7, sX: 1114 + (57) * 3, sY: 232 + (82 + 3) },
    { name: 8, sX: 1114, sY: 231 + (82 + 3) * 2 },
    { name: 9, sX: 1114 + (57), sY: 231 + (82 + 3) * 2 }
]

const end = {
    draw: function () {
        ctx.beginPath();
        ctx.drawImage(sprites, 1091, 148, 257, 60, canvas.width / 2 - (257 / 2), 20, 257, 60)
        ctx.drawImage(sprites, 647, 472, 293, 149, canvas.width / 2 - (293 / 2), 100, 293, 149)
        ctx.drawImage(sprites, 0, 111, 135, 77, canvas.width / 2 - (135 / 2), 250, 135, 77)
    }
}


// vẽ màn hình chờ
const start = {
    draw: function () {
        ctx.beginPath()
        ctx.drawImage(sprites, 1101, 0, 242, 74, canvas.width / 2 - 114, 20, 242, 74)
        ctx.drawImage(sprites, 1101, 74, 254, 74, canvas.width / 2 - 114, 120, 254, 74)
        ctx.drawImage(sprites, 870, 159, 183, 160, canvas.width / 2 - 90, 220, 183, 160)
    }
}
// Vẽ background
const bg = {
    sX: 163,
    sY: 0,
    sW: 229,
    sH: 625,
    cX: 0,
    cY: 0,
    cW: 229,
    cH: 625,

    draw: function () {
        ctx.beginPath()
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 229, this.cY, this.cW, this.cH);
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX + 458, this.cY, this.cW, this.cH);
    }
}


class Ground {
    constructor(cX, cY) {
        this.cX = cX;
        this.cY = cY;
        this.sX = 643;
        this.sY = 15;
        this.sW = 210;
        this.sH = 145;
        this.cW = 210;
        this.cH = 145;
        this.dX = -2;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)
    }
}

class Score {
    constructor(value, cX, cY) {
        this.value = value;
        this.cX = cX;
        this.cY = cY;
    }

    draw() {
        ctx.beginPath();
        this.tam = this.value;
        let arrayNumber = [];
        if (this.tam >= 10) {
            do {
                let du = this.tam % 10;
                this.tam = Math.floor(this.tam / 10);
                arrayNumber.unshift(du);
            } while (this.tam != 0);
        }
        else {
            arrayNumber.unshift(this.tam)
        }


        if (arrayNumber.length > 1) {
            let i = arrayNumber.length - 1;

            arrayNumber.forEach(item => {
                number.forEach(n => {
                    if (n.name == item) {
                        ctx.drawImage(sprites, n.sX, n.sY, 54, 82, (canvas.width / 2) - (56 * i), 30, 54, 82);
                        i--;
                    }
                })
            })
        } else {
            number.forEach(item => {
                if (arrayNumber.includes(item.name)) {
                    ctx.drawImage(sprites, item.sX, item.sY, 54, 82, (canvas.width / 2 - 27), 30, 54, 82)
                }
            })
        }
    }

    drawSmall() {
        ctx.beginPath();
        this.tam = this.value;
        let arrayNumber = [];
        if (this.tam >= 10) {
            do {
                let du = this.tam % 10;
                this.tam = Math.floor(this.tam / 10);
                arrayNumber.unshift(du);
            } while (this.tam != 0);
        }
        else {
            arrayNumber.unshift(this.tam)
        }

        if (arrayNumber.length > 1) {
            let i = arrayNumber.length - 1;
            arrayNumber.forEach(item => {
                number.forEach(n => {
                    if (n.name == item) {
                        ctx.drawImage(sprites, n.sX, n.sY, 54, 82, (canvas.width / 2) - 20 - (20*i) , this.cY + 20 , 54/3, 82/3);
                        i--;
                    }
                })
            })
        } else {
            number.forEach(item => {
                if (arrayNumber.includes(item.name)) {
                    ctx.drawImage(sprites, item.sX, item.sY, 54, 82, (canvas.width / 2 - 20), this.cY+25, 54/3, 82/3)
                }
            })
        }
    }

}

class Birth {
    constructor(cX, cY, speed) {
        this.cX = cX;
        this.cY = cY;
        this.animate = [
            { sX: 879, sY: 12 },
            { sX: 939, sY: 12 },
            { sX: 999, sY: 12 }
        ]
        this.sW = 51;
        this.sH = 36;
        this.cW = 51;
        this.cH = 36;
        this.i = 0;
        this.speed = speed;
        this.v = 0;
        this.a = 0.5;
    }

    update() {
        if (game == 'play' || game == 'end') {
            this.v += this.a;
            this.cY += this.v;
            if (this.cY + this.cH + this.v > 495) {
                game = 'end'
                this.v = 0;
                this.cY = 460;
            }

            if (this.cX + this.cW > arrayPipe[0].cX + 5 &&
                this.cX < arrayPipe[0].cX + arrayPipe[0].cW && (
                    this.cY < arrayPipe[0].cY + arrayPipe[0].cH + 50 ||
                    this.cY > arrayPipe[0].cY + arrayPipe[0].cH + arrayPipe[0].space + 15
                )
            ) {
                game = 'end'
            }
            if (this.cX == arrayPipe[0].cX + 52 || this.cX == arrayPipe[0].cX + 53) {
                newScore.value++;
                maxScore.value = Math.max(newScore.value, maxScore.value);
            }

        }
    }


    draw() {
        if (game == 'start') {
            if (temp >= this.speed + 20) {
                this.i = this.i < this.animate.length - 1 ? this.i + 1 : 0;
                temp = 0
            } else {
                temp++;
            }
        } else if (game == 'play') {
            if (temp >= this.speed) {
                this.i = this.i < this.animate.length - 1 ? this.i + 1 : 0;
                temp = 0
            } else {
                temp++;
            }
        }

        ctx.beginPath();
        ctx.drawImage(sprites, this.animate[this.i].sX, this.animate[this.i].sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH)

    }
}

class Pipes {
    constructor(cX, cY, space) {
        this.cX = cX;
        this.cY = cY;
        this.cW = 52;
        this.cH = 318;
        this.sXa = 56 * 2;  // below
        this.sY = 647;
        this.sXb = 56 * 3;  // above
        this.sW = 52;
        this.sH = 318;
        this.space = space;
        this.dX = -2
    }
    draw() {
        ctx.beginPath();
        // ctx.drawImage(pipe, this.sXa, this.sY , this.sW, this.sH -30, this.cX, this.cY, this.cW, this.cH)
        // ctx.drawImage(pipe, this.sXa, this.sY , this.sW, this.sH, this.cX, this.cY + 50, this.cW, this.cH)
        // ctx.drawImage(pipe, this.sXb, this.sY , this.sW, this.sH, this.cX , this.cY + this.cH + 50 + this.space, this.cW, this.cH)
        ctx.drawImage(pipe, this.sXa, this.sY, this.sW, this.sH - 30, this.cX, this.cY, this.cW, this.cH)
        ctx.drawImage(pipe, this.sXa, this.sY, this.sW, this.sH, this.cX, this.cY + 50, this.cW, this.cH)
        ctx.drawImage(pipe, this.sXa, this.sY, this.sW, this.sH - 30, this.cX, this.cY + this.cH + this.space + 100, this.cW, this.cH)
        ctx.drawImage(pipe, this.sXb, this.sY, this.sW, this.sH, this.cX, this.cY + this.cH + this.space + 50, this.cW, this.cH)
    }
}


// ctx.drawImage(sprites, 647, 472, 293, 149, canvas.width / 2 - (293 / 2), 100, 293, 149)
let newScore = new Score(0, 10, 100);
let maxScore = new Score(0,10,150);

//khởi tạo con chim 
let newBirth = new Birth(25, 300, 10);

// Khởi tạo đất 



// clcik vào màn hình chờ thì game == play
canvas.addEventListener('click', function (event) {
    switch (game) {
        case 'start':
            game = 'play';
            break;
        case 'play':
            newBirth.v = -7;
            break;
        case 'end':
            console.log('ket thuc tro cho');
            if (event.offsetX > canvas.width / 2 - (135 / 2) &&
                event.offsetX < canvas.width / 2 + (135 / 2) &&
                event.offsetY > 250 &&
                event.offsetY < 250 + 77) {
                newScore.value = 0;
                newBirth.cY = 200;
                arrayPipe = [];
                newArrayPipe();
                game = 'start'
            }
            break;
        default:
            break;
    }
})

// ctx.drawImage(sprites, 0, 111, 135,77 , canvas.width/2 - (135/2), 250  , 135,77)


let arrayGround = [];
for (let i = 0; i < 4; i++) {
    let newE = new Ground(210 * i, 485)
    arrayGround.push(newE)
}


//KHởi tạo map những cây cột : Pipes
let arrayPipe = [];
function newArrayPipe() {
    for (let i = 1; i < 4; i++) {
        let newP = new Pipes(RandomPipe(530, 600) * i, RandomPipe(-350, 0), 200)
        arrayPipe.push(newP)
    }
}

newArrayPipe();


//Hàm Random địa hình cột 
function RandomPipe(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

//Vẽ đất 
function drawArrayGround() {
    arrayGround.forEach(item => item.draw())
}

// Vẽ cột
function drawArrayPipe() {
    arrayPipe.forEach(item => item.draw())
}

//Update đất khi game == play
function updateGround() {
    arrayGround.forEach(item => {
        item.cX += item.dX;
    })
    if (arrayGround[0].cX <= -210) {
        arrayGround.splice(0, 1);
        arrayGround.push(new Ground(arrayGround[2].cX + 210, 485))
    }
}

//Update Cột khi game == play
function updatePipe() {
    arrayPipe.forEach(item => {
        item.cX += item.dX;
    })
    if (arrayPipe[0].cX <= -52) {
        arrayPipe.splice(0, 1);
        arrayPipe.push(new Pipes(arrayPipe[arrayPipe.length - 1].cX + RandomPipe(530, 600), RandomPipe(-318, -100), 200))
    }
}


// Update toàn bộ khi game == play
function update() {
    if (game == 'play') {
        updatePipe();
        updateGround();
        newScore.draw();
    }
    if (game == 'end') {
        end.draw();
        newScore.drawSmall();
        maxScore.drawSmall();
    }
    newBirth.update();
}

function draw() {
    bg.draw();
    if (game == 'start') {
        start.draw();
    }
    drawArrayPipe();
    drawArrayGround();
    newBirth.draw();
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()
    update();
}

animate()