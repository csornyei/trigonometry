const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const boundingRect = canvas.getBoundingClientRect();

let mouseX;
let mouseY;
let xLeg;
let yLeg;
let hypotenuse;
let cos = 0;
let sin = 0;
let angle = 0;
let yCoord;
let xCoord;

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let circleRadius = 200

function drawCoordSys() {
    let rectWidth = 4;
    context.fillRect((canvasWidth / 2) - (rectWidth / 2), 0, rectWidth, canvasHeight * 2);
    context.fillRect(0, (canvasHeight / 2) - (rectWidth / 2), canvasWidth * 2, rectWidth);

    context.beginPath();
    context.strokeStyle = 'red';
    context.lineWidth = 3;
    context.arc((canvasWidth / 2), (canvasHeight / 2), circleRadius, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
}

function lineToCursor() {
    context.beginPath();
    context.moveTo((canvasWidth / 2), (canvasHeight / 2));
    context.lineTo(xCoord, yCoord);
    context.closePath();
    context.stroke();
}

function drawCosSinLine() {

    context.beginPath();
    context.strokeStyle = 'green';
    context.moveTo(xCoord, (canvasHeight / 2));
    context.lineTo(xCoord, yCoord);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'blue';
    context.moveTo((canvasWidth / 2), yCoord);
    context.lineTo(xCoord, yCoord);
    context.closePath();
    context.stroke();
}

function printText() {
    context.strokeStyle = 'black';
    context.font = "12px sans-serif";
    context.fillText("COS:", 10, 30);
    context.fillText("SIN:", 10, 50);
    context.fillText("ANGLE:", 10, 70);
    context.fillText(cos.toFixed(4), 70, 30);
    context.fillText(sin.toFixed(4), 70, 50);
    const angleDeg = angle * (180 / Math.PI);
    context.fillText(angleDeg.toFixed(2), 70, 70);
}

function drawAngle() {
    if (cos == 0 && sin == 1) {
        angle = Math.PI / 2;
    } else if ((cos > 0 && sin > 0) || (cos < 0 && sin > 0)) {
        angle = Math.acos(cos);
    } else {
        angle = Math.PI + (Math.PI - Math.acos(cos));
    }
    context.beginPath();
    context.strokeStyle = 'rgba(249, 166, 2, 1)';
    context.lineWidth = 3;
    context.moveTo((canvasWidth / 2), (canvasHeight / 2));
    context.lineTo((canvasWidth / 2) + circleRadius / 4, (canvasHeight / 2));
    context.arc((canvasWidth / 2), (canvasHeight / 2), circleRadius / 4, 0, -angle, true);
    context.lineTo((canvasWidth / 2), (canvasHeight / 2));
    context.closePath();
    context.stroke();
    context.fillStyle = 'rgba(249, 166, 2, .7)';
    context.fill();
    context.fillStyle = 'black';
}

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - boundingRect.top;
    mouseY = event.clientY - boundingRect.left;

    xLeg = mouseX - (canvasWidth / 2);
    yLeg = mouseY - (canvasHeight / 2);
    hypotenuse = Math.sqrt(Math.pow(xLeg, 2) + Math.pow(yLeg, 2));
    sin = -(yLeg / hypotenuse);
    cos = (xLeg / hypotenuse);

    yCoord = (canvasHeight / 2) + -(circleRadius * sin)
    xCoord = (canvasWidth / 2) + (circleRadius * cos)
})

window.setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCoordSys();
    lineToCursor();
    drawCosSinLine();
    drawAngle();
    printText();
}, 20);