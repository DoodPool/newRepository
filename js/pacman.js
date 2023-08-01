'use strict'

const PACMAN = '😷';
var gPacman;


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodCount--
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === SUPER_FOOD && gPacman.isSuper) return
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
        if (gGame.foodCount === 0) gameOver(true)
    }

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
        } else {
            gameOver(false)
            renderCell(gPacman.location, '🪦')
            return
        }
    }
    else if (nextCell === SUPER_FOOD) {
        gPacman.isSuper = true
        renderGhosts()
        setTimeout(() => {
            gPacman.isSuper = false,
                reviveGhosts()
        }, 5000)
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}