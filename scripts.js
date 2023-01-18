$(document).ready(function () {

    $('#keyboard-upper-container').hide();

    $(document).keydown(function (e) {
        if (e.which === 16) {
            $('#keyboard-lower-container').toggle();
            $('#keyboard-upper-container').toggle();
        }
    });

    $(document).keyup(function (e) {
        if (e.which === 16) {
            $('#keyboard-lower-container').toggle();
            $('#keyboard-upper-container').toggle();
        }
    });


    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    let gameState = { // set global variables for the initial state of the game
        sentenceIndex: 0,
        letterIndex: 0,
        letter: sentences[0][0],
        sentence: sentences[0],
        numberOfMistakes: 0,
        timerOn: false

    }

    $('#sentence').text(gameState.sentence);

    $('#target-letter').text(gameState.letter);

    let sentenceLength = gameState.sentence.length;

    let numberOfWords = 54;

    let startTime;

    let endTime;

    //console.log(gameState.sentenceIndex, gameState.letterIndex, gameState.letter, sentenceLength);



    $(document).keypress(function (e) {

        if (gameState.timerOn === false && gameState.sentenceIndex < sentences.length) {
            startTime = Date.now();
            gameState.timerOn = true;
        }

        $('#' + e.which).css('background-color', 'yellow');

        setTimeout(function () {
            $('#' + e.which).css('background-color', '') // makes the highlight go away after 120 milliseconds
        }, 120);

        let blockIncrement = (17.5 * (gameState.letterIndex + 1));

        if (e.key == gameState.letter) {

            gameState.sentence = sentences[gameState.sentenceIndex];

            gameState.letterIndex++;

            $('#yellow-block').css('left', (15 + blockIncrement) + 'px');

            gameState.letter = sentences[gameState.sentenceIndex][gameState.letterIndex];

            sentenceLength = gameState.sentence.length;

            $('#target-letter').text(gameState.letter);

            $('#feedback').append('<span class = "glyphicon glyphicon-ok"></span>');

            //console.log(gameState.sentenceIndex, gameState.letterIndex, gameState.letter, sentenceLength, blockIncrement);


        } else {

            $('#feedback').append('<span class = "glyphicon glyphicon-remove"></span>');

            gameState.numberOfMistakes++

            //console.log(gameState.sentenceIndex, gameState.letterIndex, gameState.letter, sentenceLength, gameState.numberOfMistakes + " mistakes");

        }

        if (sentenceLength == gameState.letterIndex) {

            gameState.sentenceIndex++;

            gameState.sentence = sentences[gameState.sentenceIndex];

            $('#sentence').text(gameState.sentence);

            gameState.letterIndex = 0;

            $('#yellow-block').css('left', '15px');

            $('#target-letter').text(gameState.letter);

            $('#feedback').html('');

            if (gameState.sentenceIndex < sentences.length) {

                sentenceLength = gameState.sentence.length;

                gameState.letter = sentences[gameState.sentenceIndex][gameState.letterIndex];

            } else {

                endTime = Date.now();
                gameState.timerOn = false;



                let minutes = (endTime - startTime) / 1000 / 60;

                let wordsPerMinute = numberOfWords / minutes - (2 * gameState.numberOfMistakes);

                //console.log(minutes + ' mins, ' + wordsPerMinute + ' wpm');

                gameState = {
                    sentenceIndex: 0,
                    letterIndex: 0,
                    letter: sentences[0][0],
                    sentence: sentences[0],
                    numberOfMistakes: 0,
                    timerOn: false
                };

                alert('You did it! Your score: ' + wordsPerMinute + ' words/min');

                alert('Press any key to play again.');

                $('#sentence').text(gameState.sentence);

                $('#target-letter').text(gameState.letter);

            }

            // console.log(gameState.sentenceIndex, gameState.letterIndex, gameState.letter, sentenceLength);


        }





    });



    // const container = $('#container');

    //$(sentencePanel).text(gameState.sentence);

    //$(document).keydown(function)

    // e.key fetches the key that was pressed

    // let < maybe currentGameState or something > = Object.assign({}, gameState)
    // or = { ...initialGameState };     the object Spread operator
});