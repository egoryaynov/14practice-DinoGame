import {getHighScore, getScore, initializeLS, saveScore} from "./localStorage.utils.js";

const dino = document.getElementById('dino')
const score = document.getElementById('score')
const cactus = document.getElementById('cactus')
const button = document.getElementById('button')
const tableBody = document.getElementById('tableBody')

// INITIALIZE LOCAL STORAGE
initializeLS()
if (getHighScore() > 0) {
    updateHighScore()
}

// UPDATE TABLE AFTER ADDING SCORE ITEM IN LS
const updateTable = () => {
    const scores = getScore()
    tableBody.innerHTML = ''

    if (scores.length > 0) {
        const trList = []

        scores.forEach(element => {
            const trEl = document.createElement('tr')

            const scoreTableItem = document.createElement('td')
            scoreTableItem.innerText = element.score

            const dateTableItem = document.createElement('td')
            dateTableItem.innerText = element.date

            trEl.append(scoreTableItem, dateTableItem)
            trList.push(trEl)
        })

        trList.forEach(element => {
            tableBody.appendChild(element)
        })
    }
}
updateTable()

// UPDATE HIGH SCORE
function updateHighScore() {
    const highScoreEl = document.getElementById('highScore')
    const highScore = getHighScore()

    highScoreEl.innerText = `High score is: ${highScore}`
}

// CLEAR TABLE ON BUTTON CLICK
button.addEventListener('click', () => {
    localStorage.setItem('score', JSON.stringify([]))

    updateTable()
})

// GAME
const jump = () => {
    if (!dino.classList.contains('jump')) {
        dino.classList.add('jump')

        setTimeout(() => {
            dino.classList.remove('jump')
        }, 500)
    }
}

setInterval(() => {
    score.innerText = String(parseInt(score.innerText) + 1)

    const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'))
    const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'))

    if (cactusLeft <= 100 && cactusLeft > 0 && dinoBottom <= 110) {
        alert('GAME OVER')

        saveScore(parseInt(score.innerText))
        score.innerText = '0'

        updateHighScore()
        updateTable()
    }
}, 10)

document.addEventListener('keydown', (e) => {
    jump()
})