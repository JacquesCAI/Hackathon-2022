let currentScore;


function showCurrentScore(score) {
    currentScore = score;

    const currentScoreSpan = document.getElementById("currentScore");

    currentScoreSpan.innerText = score;
}

WA.onInit().then(() => {
    const loadingP = document.getElementById("loadingP");
    loadingP.style.display = "none";

    const ATM = document.getElementById("ATM");
    ATM.style.display = "block";

    actions.getScore(WA.player.id)
        .then(data => data.json())
        .then(score => {
            showCurrentScore(score)
        });
})

document.getElementById("getJetons").addEventListener("click", () => {
    const jetonsToGet = parseInt(document.getElementById("jetonsToGet").value);

    if (isNaN(jetonsToGet) || jetonsToGet <= 0) {
        alert("Rentrez un nombre de jetons valides");
        return 0;
    }

    actions.addScore(WA.player.id, jetonsToGet).then(() => {
        const jetonsAddedSpan = document.getElementById("jetonsAdded");
        jetonsAddedSpan.style.display = "block";

        showCurrentScore(currentScore+jetonsToGet)

        setTimeout(() => {
            jetonsAddedSpan.style.display = "none";
        }, 1000)
    });
});