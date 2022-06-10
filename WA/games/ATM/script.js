let currentScore;


function showCurrentScore(score) {
    currentScore = score;

    const currentScoreSpan = document.getElementById("currentScore");

    currentScoreSpan.innerText = score;

    showOrHideMaxScore();
}

function showOrHideMaxScore() {
    const maxSpan = document.getElementById("maxJetons");
    if (currentScore === 1000) {
        maxSpan.style.display = "none";
    } else {
        maxSpan.style.display = "inline-block";
        maxSpan.innerText = "(max: "+(1000-currentScore)+")";
    }
}

WA.onInit().then(() => {
    const loadingP = document.getElementById("loadingP");
    loadingP.style.display = "none";

    const ATM = document.getElementById("ATM");
    ATM.style.display = "block";

    scoreActions.getScore(location.hostname,WA.player.id)
        .then(data => data.json())
        .then(score => {
            showCurrentScore(score);
        });
})

document.getElementById("getJetons").addEventListener("click", () => {
    const jetonsToGet = parseInt(document.getElementById("jetonsToGet").value);

    if (isNaN(jetonsToGet) || jetonsToGet <= 0) {
        alert("Rentrez un nombre de jetons valides");
        return;
    }

    if (currentScore+jetonsToGet > 1000) {
        alert("Vous ne pouvez pas avoir plus de 1000 jetons");
        return;
    }

    scoreActions.addScore(location.hostname,WA.player.id, jetonsToGet).then(() => {
        const jetonsAddedSpan = document.getElementById("jetonsAdded");
        jetonsAddedSpan.style.display = "block";

        showCurrentScore(currentScore+jetonsToGet);

        setTimeout(() => {
            jetonsAddedSpan.style.display = "none";
        }, 1000)
    });
});