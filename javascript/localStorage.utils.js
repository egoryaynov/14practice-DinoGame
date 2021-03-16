const HIGH_SCORE_LS = 'highScore'
const SCORE_LS = 'score'

export const initializeLS = () => {
    if (!getScore()) {
        localStorage.setItem('score', JSON.stringify([]))
    }
    if (!getHighScore()) {
        localStorage.setItem('highScore', '0')
    }
}

export const getScore = () => {
    return JSON.parse(localStorage.getItem(SCORE_LS))
}
export const getHighScore = () => {
    return parseInt(localStorage.getItem(HIGH_SCORE_LS))
}

export const saveScore = (score) => {
    if (score > getHighScore()) {
        saveHighScore(score)
    }

    const newScoreStorage = [
        ...getScore(),
        {score, date: new Date().toLocaleDateString()}
    ]

    localStorage.setItem('score', JSON.stringify(newScoreStorage))
}

const saveHighScore = (highScore) => {
    localStorage.setItem('highScore', String(highScore))
}