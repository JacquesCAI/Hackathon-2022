"use strict";

let currentScore;

function checkInput(input) {
    const value = parseInt(input.value);
    if (value < 0)
        input.value = 0
    else if (value > currentScore)
        input.value = currentScore;
}

function checkMaxScoreBetInput(score, input) {
    currentScore = score;

    const maxSpan = document.getElementById("maxSpan");
    maxSpan.innerText = score;

    input.oninput = () => checkInput(input)

    checkInput(input)
}

WA.onInit()
    .then(() => {
        const input = document.getElementById("bet");
        input.removeAttribute("disabled");

        const spinBtn = document.getElementById("spinBtn")
        spinBtn.classList.add('enabled');

        actions.getScore(WA.player.id)
            .then(data => data.json())
            .then(score => {
                checkMaxScoreBetInput(score, input);
            })
    });

window.onload = function () {
    paper.install(window);
    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);

    var leverSound = new Audio("mp3/leverSound.mp3"); // buffers automatically when created
    var playSound = new Audio("mp3/playSound.mp3");
    var clickerSound = new Audio("mp3/clickerSound.mp3");
    var failSound = new Audio("mp3/failSound.mp3");

    var column1XPosition = $j(canvas).width() / 4;
    var column2XPosition = $j(canvas).width() / 1.5;
    var column3XPosition = $j(canvas).width() * 1.1;

    var scalingCoefficient = 0.5;

    $j("#spinBtn").click(function () {
        if (!this.classList.contains('enabled'))
            return;

        let bet;
        if (!(bet = document.getElementById("bet").value) || parseInt(bet).toString() !== bet || bet === "NaN" || parseInt(bet) === 0) {
            alert("Rentrez d'abord une mise");
            return;
        }

        spin();
    });

    $j("#positionButton").click(function () {
        getPositions();
    });

    var group = new Group();
    var group3 = new Group();
    var group5 = new Group();

    var images = document.getElementsByTagName('img');
    var srcList = [];
    var titleList = [];

    for (var i = 0; i < images.length; i++) {
        srcList.push(images[i].id);
    }

    for (var i = 0; i < images.length; i++) {
        titleList.push(images[i].title);
    }

    var rasterList = [];

    for (var i = 0; i < srcList.length; i++) {
        var raster = new Raster(images[i].id);
        raster.name = titleList[i];
        rasterList.push(raster);
    }

    var increment = 1;

    for (var i = 0; i < rasterList.length; i++) {
        rasterList[i].scale(scalingCoefficient);
        rasterList[i].position.x = column1XPosition;
        if (i === 0) {
            rasterList[i].position.y = 0;
        } else {
            rasterList[i].position.y = rasterList[i].bounds["height"] * increment;
        }


        if (i >= 1) {
            increment = increment + 1;
        }
    }

    for (var i = 0; i < rasterList.length; i++) {
        group.addChild(rasterList[i]);
    }

    var rasterList2 = [];

    for (var i = 0; i < srcList.length; i++) {
        var raster = new Raster(images[i].id);
        rasterList2.push(raster);
    }

    var increment2 = 1;

    for (var i = 0; i < rasterList2.length; i++) {
        rasterList2[i].scale(scalingCoefficient);
        rasterList2[i].position.x = column2XPosition;

        if (i === 0) {
            rasterList2[i].position.y = 0;
        } else {
            rasterList2[i].position.y = rasterList2[i].bounds["height"] * increment2;
        }

        if (i >= 1) {
            increment2 = increment2 + 1;
        }
    }

    for (var i = 0; i < rasterList2.length; i++) {
        group3.addChild(rasterList2[i]);
    }

    var rasterList3 = [];

    for (var i = 0; i < srcList.length; i++) {
        var raster = new Raster(images[i].id);
        rasterList3.push(raster);
    }

    var increment3 = 1;

    for (var i = 0; i < rasterList3.length; i++) {
        rasterList3[i].scale(scalingCoefficient);
        rasterList3[i].position.x = column3XPosition;
        if (i === 0) {
            rasterList3[i].position.y = 0;
        } else {
            rasterList3[i].position.y = rasterList3[i].bounds["height"] * increment3;
        }

        if (i >= 1) {
            increment3 = increment3 + 1;
        }
    }

    for (var i = 0; i < rasterList3.length; i++) {
        group5.addChild(rasterList3[i]);
    }

    group.position.y = 0 - (group.bounds["height"] / 2);
    group.position.x = column1XPosition;

    var group2 = group.clone();
    group2.position.y = -(group2.bounds["height"]) - (group2.bounds["height"] / 2);
    group2.position.x = column1XPosition;

    group3.position.y = 0 - (group3.bounds["height"] / 2);
    group3.position.x = column2XPosition;

    var group4 = group3.clone();
    group4.position.y = -(group4.bounds["height"]) - (group4.bounds["height"] / 2);
    group4.position.x = column2XPosition;

    group5.position.y = 0 - (group3.bounds["height"] / 2);
    group5.position.x = column3XPosition;

    var group6 = group5.clone();
    group6.position.y = -(group6.bounds["height"]) - (group6.bounds["height"] / 2);
    group6.position.x = column3XPosition;

    var stopArray = [];
    var groupLength = group5.children.length;
    var stopNumber = 0;

    for (var i = 0; i < groupLength; i++) {
        if (i == 0) {
            stopNumber = group.bounds["height"] / groupLength;
        }
        stopArray.push(stopNumber);
        stopNumber = stopNumber + (group.bounds["height"] / groupLength);
    }
    ;

    function spin() {
        leverSound.play();
        playSound.play();

        var stopCoefficient = 0;
        var stopCoefficient2 = 0;
        var stopCoefficient3 = 0;
        var stop1 = stopArray[Math.floor(Math.random() * stopArray.length)];
        var stop2 = stopArray[Math.floor(Math.random() * stopArray.length)];
        var stop3 = stopArray[Math.floor(Math.random() * stopArray.length)];

        stop1 = stop1 / 2;
        stop2 = stop2 / 2;
        stop3 = stop3 / 2;

        var called = true;
        var clickerSound1 = true;
        var clickerSound2 = true;
        var clickerSound3 = true;

        var spinCoefficient = 100;

        view.onFrame = function (event) {

            var group1TrueY;
            var group2TrueY;


            if (stopCoefficient < stop1) {

                group.position.y += spinCoefficient;
                group2.position.y += spinCoefficient;

                var groupPosition2 = group2.bounds["y"];
                var groupPosition1 = group.bounds["y"];

                group1TrueY = group.position.y - (group.bounds["height"] / 2);
                group2TrueY = group2.position.y - (group2.bounds["height"] / 2);

                if (group1TrueY == 0) {
                    group2.position.y = (-group2.bounds["height"] / 2);
                }

                if (group2TrueY == 0) {
                    group.position.y = (-group.bounds["height"] / 2);
                }

                stopCoefficient = stopCoefficient + 2;

            } else {
                if (clickerSound1) {
                    clickerSound.play();
                    clickerSound1 = false;
                }
            }

            var group3TrueY;
            var group4TrueY;

            if (stopCoefficient2 < stop2) {
                group3.position.y += spinCoefficient;
                group4.position.y += spinCoefficient;

                var groupPosition3 = group3.bounds["y"];
                var groupPosition4 = group4.bounds["y"];

                group3TrueY = group3.position.y - (group3.bounds["height"] / 2);
                group4TrueY = group4.position.y - (group4.bounds["height"] / 2);

                if (group3TrueY == 0) {
                    group4.position.y = (-group4.bounds["height"] / 2);
                }

                if (group4TrueY == 0) {
                    group3.position.y = (-group3.bounds["height"] / 2);
                }

                stopCoefficient2 = stopCoefficient2 + 2;

            } else {
                if (clickerSound2) {
                    clickerSound.play();
                    clickerSound2 = false;
                }
            }

            var group5TrueY;
            var group6TrueY;

            if (stopCoefficient3 < stop3) {
                group5.position.y += spinCoefficient;
                group6.position.y += spinCoefficient;

                var groupPosition5 = group5.bounds["y"];
                var groupPosition6 = group6.bounds["y"];

                group5TrueY = group5.position.y - (group5.bounds["height"] / 2);
                group6TrueY = group6.position.y - (group6.bounds["height"] / 2);

                if (group5TrueY == 0) {
                    group6.position.y = (-group6.bounds["height"] / 2);
                }

                if (group6TrueY == 0) {
                    group5.position.y = (-group5.bounds["height"] / 2);
                }

                stopCoefficient3 = stopCoefficient3 + 2;
            } else {
                if (clickerSound3) {
                    clickerSound.play();
                    clickerSound3 = false;
                }
            }

            if (stopCoefficient == stop1 && stopCoefficient2 == stop2 && stopCoefficient3 == stop3) {
                if (called) {
                    getPositions();
                    called = false;
                }
            }
        }
    }


    var resultArray = [];

    var topLineResults = [];
    var middle1LineResults = [];
    var middle2LineResults = [];
    var bottomLineResults = [];

    function getPositions() {
        playSound.pause();
        playSound.currentTime = 0;

        resultArray.length = 0;

        topLineResults.length = 0;
        middle1LineResults.length = 0;
        middle2LineResults.length = 0;
        bottomLineResults.length = 0;

        var children = group.children;
        for (var i = 0; i < children.length; i++) {
            var alt = children[i].image.alt;
            var position = children[i].position.y;
            var resultObj = {
                position: position,
                name: alt
            };
            resultArray.push(resultObj);
        }

        var children = group2.children;

        for (var i = 0; i < children.length; i++) {
            var alt = children[i].image.alt;
            var position = children[i].position.y;
            var resultObj = {
                position: position,
                name: alt
            };
            resultArray.push(resultObj);
        }

        var children = group3.children;

        for (var i = 0; i < children.length; i++) {
            var alt = children[i].image.alt;
            var position = children[i].position.y;
            var resultObj = {
                position: position,
                name: alt
            };
            resultArray.push(resultObj);
        }

        var children = group4.children;

        for (var i = 0; i < children.length; i++) {
            var alt = children[i].image.alt;
            var position = children[i].position.y;
            var resultObj = {
                position: position,
                name: alt
            };
            resultArray.push(resultObj);
        }

        var children = group5.children;

        for (var i = 0; i < children.length; i++) {
            var alt = children[i].image.alt;
            var position = children[i].position.y;
            var resultObj = {
                position: position,
                name: alt
            };
            resultArray.push(resultObj);
        }

        var children = group6.children;

        for (var i = 0; i < children.length; i++) {
            var alt = children[i].image.alt;
            var position = children[i].position.y;
            var resultObj = {
                position: position,
                name: alt
            };
            resultArray.push(resultObj);
        }

        const lineResults = resultArray.reduce((acc, {name, position}) => [
            ...acc,
            ...(position === 100 ? [name] : [])
        ], []);

        const bet = parseInt(document.getElementById("bet").value);

        const score = !lineResults.some((id, index) => index < lineResults.length - 1 && id !== lineResults[index + 1]) ?
            bet
            : -1*bet;

        actions.addScore(WA.player.id, score);

        checkMaxScoreBetInput(currentScore+score, document.getElementById("bet"));

        WA.chat.sendChatMessage(score < 0 ? "Vous avez perdu "+bet+" jetons ..." : "Vous avez gagné " + bet + " jetons !", "Slot");
    }


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
};
