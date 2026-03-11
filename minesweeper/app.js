function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var bombs = 5;
var width = 20;
var height = 10;
var table = [];
var started = false;
var finished = false;
var openeds = [];

function createTable() {
    table = [];

    for (var y = 0; y < height; y++) {
        var row = [];

        for (var x = 0; x < width; x++) {
            row.push(null);
        }

        table.push(row);
    }
}

function shuffleBombs(yUser, xUser) {
    if (typeof yUser === 'undefined') yUser = null;
    if (typeof xUser === 'undefined') xUser = null;

    // console.log('yUser', typeof yUser, yUser);
    // console.log('xUser', typeof xUser, xUser);

    for (var b = 0; b < bombs; b++) {
        do {
            var x = randomIntFromInterval(0, width - 1);
            var y = randomIntFromInterval(0, height - 1);
        } while (
            table[y][x] !== null
            || (
                yUser !== null && xUser !== null
                && y == yUser && x == xUser
            )
        );

        table[y][x] = 'b';
    }

    // table[0][6] = 'b';
    // table[0][9] = 'b';
    // table[1][2] = 'b';
    // table[1][3] = 'b';
    // table[2][1] = 'b';
    // table[2][8] = 'b';
    // table[3][3] = 'b';
    // table[4][6] = 'b';
    // table[5][2] = 'b';
    // table[6][3] = 'b';

    generateValues();
}

function verifyIfFieldsExists(y, x, callback) {
    if (typeof callback === 'undefined') callback = function () { };

    // linha de cima
    if (typeof table[y - 1] !== 'undefined') {
        // existe linha de cima

        // coluna da esquerda
        if (typeof table[y - 1][x - 1] !== 'undefined') {
            // existe o da esquerda
            callback(y - 1, x - 1);
        }

        // central
        callback(y - 1, x);

        // coluna da direita
        if (typeof table[y - 1][x + 1] !== 'undefined') {
            // existe o da direita
            callback(y - 1, x + 1);
        }
    }

    // linha central

    // coluna da esquerda
    if (typeof table[y][x - 1] !== 'undefined') {
        // existe o da esquerda
        callback(y, x - 1);
    }

    // coluna da direita
    if (typeof table[y][x + 1] !== 'undefined') {
        // existe o da direita
        callback(y, x + 1);
    }

    // linha de baixo
    if (typeof table[y + 1] !== 'undefined') {
        // existe linha de baixo

        // coluna da esquerda
        if (typeof table[y + 1][x - 1] !== 'undefined') {
            // existe o da esquerda
            callback(y + 1, x - 1);
        }

        // central
        callback(y + 1, x);

        // coluna da direita
        if (typeof table[y + 1][x + 1] !== 'undefined') {
            // existe o da direita
            callback(y + 1, x + 1);
        }
    }

}

function generateValues() {

    function incrementValue(y, x) {
        // console.log('incrementValue()', y, x);
        if (table[y][x] !== 'b') {
            if (table[y][x] === null) table[y][x] = 0;
            table[y][x]++;
        }
    }

    // procurando as bombas...
    for (var y = 0; y < height; y++) {

        for (var x = 0; x < width; x++) {

            // se encontrar a bomba...
            if (table[y][x] === 'b') {
                // da ++ em volta dela
                verifyIfFieldsExists(y, x, function (yCB, xCB) {
                    incrementValue(yCB, xCB);
                });
            }
        }

    }

    console.log(table);

}

function selectCell(y, x) {
    if (!finished) {
        if (!started) {
            shuffleBombs(y, x);
            started = true;
        }

        var key = `${y},${x}`;
        var canOpen = openeds.indexOf(key);

        if (canOpen === -1) {
            var value = table[y][x];

            if (value === 'b') {
                finishGame(true);
            } else if (!value) {
                findEmptys(y, x);
            } else {
                openCell(y, x, value);
            }
        }
    }
}

function findBombs() {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            // se encontrar a bomba...
            if (table[y][x] === 'b') {
                // da ++ em volta dela
                openCell(y, x, '*');
            }
        }
    }
}

function findEmptys(y, x) {
    var value = table[y][x];
    if (!value) {
        var key = `${y},${x}`;
        var canOpen = openeds.indexOf(key);
        if (canOpen === -1) {
            openCell(y, x);

            verifyIfFieldsExists(y, x, function (yCB, xCB) {
                findEmptys(yCB, xCB)
            });
        }

    } else if (value !== 'b') {
        openCell(y, x, value);
    }
}

function startGame() {
    bombs = parseInt($('#bombs').val());
    width = parseInt($('#width').val());
    height = parseInt($('#height').val());

    var maxWidth = 50;
    var maxHeight = 50;

    var minWidth = 10;
    var minHeight = 10;

    if (width > maxWidth) {
        width = maxWidth;
        $('#width').val(maxWidth);
    }

    if (height > maxHeight) {
        height = maxHeight;
        $('#height').val(maxHeight);
    }

    if (width < minWidth) {
        width = minWidth;
        $('#width').val(minWidth);
    }

    if (height < minHeight) {
        height = minHeight;
        $('#height').val(minHeight);
    }

    var limitBombsMax = parseInt(width * height * .9);
    var limitBombsMin = parseInt(width * height * .1);

    if (bombs > limitBombsMax) {
        bombs = limitBombsMax;
        $('#bombs').val(limitBombsMax);
    }

    if (bombs < limitBombsMin) {
        bombs = limitBombsMin;
        $('#bombs').val(limitBombsMin);
    }

    started = false;
    finished = false;
    openeds = [];

    createTable();
    displayTable();
}

function finishGame(showBombs) {
    finished = true;

    if (showBombs) {
        findBombs();
        setTimeout(function () {
            alert('Vc perdeu!!!');
        }, 500);
    }
}

function checkWin() {
    if (started && !finished) {
        if (openeds.length + bombs == width * height) {
            finishGame(false);
            alert('Voce ganhou!!!');
        }
    }
}

// frontend aqui embaixo

function displayTable() {
    var $table = $('#table');
    var $inner = $table.find('.inner-box');

    $table.css({
        'width': (width * 20) + 20,
        'height': (height * 20) + 20,
    });

    $inner.css({
        'width': (width * 20) + 4,
        'height': (height * 20) + 4,
    });

    $inner.empty();

    for (var y = 0; y < height; y++) {
        var $row = $('<div class="row" />');
        $row.css('width', width * 20);

        for (var x = 0; x < width; x++) {
            var $col = $('<div class="col" />');

            var $btn = $(`<button class="btn-action" data-y="${y}" data-x="${x}"></button>`);
            $col.html($btn);

            $row.append($col);
        }

        $inner.append($row);
    }

    $table.append($inner);

    createActions();
}

function openCell(y, x, value) {
    if (typeof value === 'undefined') value = null;

    var key = `${y},${x}`;
    if (openeds.indexOf(key) === -1) openeds.push(key);

    $(`.btn-action[data-y="${y}"][data-x="${x}"]`).addClass('opened');

    if (value) {
        $(`.btn-action[data-y="${y}"][data-x="${x}"]`).html(value);
    }

    setTimeout(function () {
        checkWin();
    }, 500);
}

function createActions() {

    $('.btn-action').off('click').on('click', function (e) {
        e.preventDefault();

        var $el = $(this);
        var y = parseInt($el.attr('data-y'));
        var x = parseInt($el.attr('data-x'));

        selectCell(y, x);
    });

    $('.btn-reset').off('click').on('click', function (e) {
        e.preventDefault();

        startGame();
    });

}

console.log(table);

createActions();

