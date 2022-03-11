const olEl = document.getElementById('highscores');

const loadScores = () => {
    const highScores = JSON.parse(localStorage.getItem('highscores'));

    if (highScores) {
        highScores.sort((a, b) => {
            return b.score - a.score;
        })

        highScores.forEach((score) => {
            const scoreList = document.createElement('li');
            scoreList.textContent = `${score.initials} - ${score.score}`

            olEl.append(scoreList);
        })
    }
}

const clearScores = () => {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}

document.getElementById('clear').addEventListener('click', clearScores);

loadScores();
