$('#score').text("0");
function updateScore(guess, response) {
    let score = parseInt($('#score').text());
    if(response.data.response === "ok") {
        let points = guess.length;
        score += points;
    }
    $('#score').text(`${score}`);
}

function updateGuessResponse(guess, response) {
    $('#guess-result').text(`${guess} is ${response.data.response}`);
}

async function submitWord(event) {
    event.preventDefault();
    let guess = $('input').val();
    const response = await axios.get('/check_guess', {params: {guess: guess}});
    updateGuessResponse(guess, response);
    updateScore(guess, response);
    
}
$('button').on('click', submitWord);

//add timer for one minute
let count = 60;
let timer = $("#timer").text(count);
timer = setTimeout(update, 1000);
function update()
{
    if (count > 0)
    {
       $("#timer").text(--count);
       timer = setTimeout(update, 1000);
    }
    else
    {
        alert("Time is up!!!");
    }
}