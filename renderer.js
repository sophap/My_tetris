function cleanSQ() {
    for (x = 0; x < ROWs; x++) {
        for (y = 0; y < COLUMNs; y++) {
            drawSQs(x,y,"white");
        }
    }
}

function i() {
    cleanSQ();
    drawSQs(1, 0, "cyan");
    drawSQs(1, 1, "cyan");
    drawSQs(1, 2, "cyan");
    drawSQs(1, 3, "cyan");
}

function t() {
    cleanSQ();
    drawSQs(1, 1, "purple");
    drawSQs(1, 2, "purple");
    drawSQs(0, 1, "purple");
    drawSQs(2, 1, "purple");
}

function o() {
    cleanSQ();
    drawSQs(1, 2, "yellow");
    drawSQs(1, 1, "yellow");
    drawSQs(2, 1, "yellow");
    drawSQs(2, 2, "yellow");
}

function z() {
    cleanSQ();
    drawSQs(0, 1, "red");
    drawSQs(1, 1, "red");
    drawSQs(1, 2, "red");
    drawSQs(2, 2, "red");
}

function s() {
    cleanSQ();
    drawSQs(3, 1, "green");
    drawSQs(2, 1, "green");
    drawSQs(2, 2, "green");
    drawSQs(1, 2, "green");
}

function j() {
    cleanSQ();
    drawSQs(2, 0, "blue");
    drawSQs(2, 1, "blue");
    drawSQs(2, 2, "blue");
    drawSQs(1, 2, "blue");
}

function l() {
    cleanSQ();
    drawSQs(2, 0, "orange");
    drawSQs(2, 1, "orange");
    drawSQs(2, 2, "orange");
    drawSQs(3, 2, "orange");
}
