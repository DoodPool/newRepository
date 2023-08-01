'use strict'

const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '⚪'
const EMPTY = ' '
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false,
    foodCount: 0

}
var gBoard
var gSuperTimeout
var gAddCherryInterval

function onInit() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')

    gGame.score = 0
    updateScore(0)
    gGame.isOn = true

    gAddCherryInterval = setInterval(() => addCherry(gBoard), 15000)

    hidEndScreen()

}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            if (i === 1 && j === 1 || i === 8 && j === 1 ||
                i === 1 && j === 8 || i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD
            } else {
                board[i][j] = FOOD
                gGame.foodCount++
            }

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(isVictorious) {
    var strHTML = ''
    const elH1 = document.querySelector('h1')
    if (isVictorious) {
        strHTML = `Game Over <span class="win">You Won!</span>`
    } else {
        strHTML = `Game Over <span class="lose">You Lose!</span>`
    }
    elH1.innerHTML = strHTML

    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gAddCherryInterval)
    showEndScreen()
    gGame.foodCount = 0
}

function showEndScreen() {
    document.querySelector("h1.end-game").hidden = false
    document.querySelector("button.end-game").hidden = false
}

function hidEndScreen() {
    document.querySelector("h1.end-game").hidden = true
    document.querySelector("button.end-game").hidden = true

}

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell === EMPTY) emptyCells.push({ i, j })
        }
    }
    var randCell = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]
    return randCell
}

function addCherry(board) {
    var cell = getEmptyCell(board)
    if (!cell) return
    //model
    board[cell.i][cell.j] = CHERRY
    //DOM
    renderCell(cell, CHERRY)

}

