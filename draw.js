const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let drawNext = drawHead;

function drawHead() {
    ctx.beginPath();
    ctx.arc(centerX, centerY - 35, 10, 0, 2 * Math.PI, false);
    ctx.stroke();
    drawNext = drawBody;
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 25);
    ctx.lineTo(centerX, centerY + 30);
    ctx.stroke();
    drawNext = drawLeftArm;
}

function drawLeftArm() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 15);
    ctx.lineTo(centerX - 15, centerY + 5);
    ctx.stroke();
    drawNext = drawRightArm;
}

function drawRightArm() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 15);
    ctx.lineTo(centerX + 15, centerY + 5);
    ctx.stroke();
    drawNext = drawLeftLeg;
}

function drawRightLeg() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 30);
    ctx.lineTo(centerX + 15, centerY + 60);
    ctx.stroke();
    drawNext = () => console.log('game over');
}

function drawLeftLeg() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 30);
    ctx.lineTo(centerX - 15, centerY + 60);
    ctx.stroke();
    drawNext = drawRightLeg;
}

function drawGallow() {
    ctx.beginPath();
    ctx.moveTo(centerX - 50, 15);
    ctx.lineTo(centerX - 50, canvas.height);
    ctx.moveTo(centerX - 50, 15);
    ctx.lineTo(centerX, centerY - 60);
    ctx.moveTo(centerX, centerY - 60);
    ctx.lineTo(centerX, centerY - 45);
    ctx.moveTo(centerX - 25, canvas.height);
    ctx.lineTo(centerX - 75, canvas.height);
    ctx.stroke();
}

function resetHangMan() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGallow();
}
drawGallow();
