let buttonColors = ['red','blue','yellow','green'];
let gamePattern =[];
let userClickedPattern = [];
let level =0;
let isLevelStarted = false;

$('.btn').click((event) => {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)
    // console.log(userClickedPattern.length-1)
    // console.log(userChosenColor);
    // console.log(userClickedPattern);
})
const startGame = () => {
    if(!isLevelStarted){
        nextSequence();
        $('#level-title').text(`Level: ${level}`);
        isLevelStarted = true;
    }
}

$(document).keydown(startGame);
$(document).click(startGame);

const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level: ${level}`);

   let randomNumber = Math.round(Math.random()*3);
   let randomChosenColor = buttonColors[randomNumber];

   gamePattern.push(randomChosenColor);
   $(`#${randomChosenColor}`).fadeOut(500).fadeIn(500);
   playSound(randomChosenColor);

};

const checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            },1000)
        }
    }else {
        setTimeout(() => {
            gameOver();
        }, 1);
    }
}

const gameOver = () => {
    gameOver_sound();
    $('#level-title').text('Game over! Press any key or click anywhere to continue')
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over')
    },250)
    level = 0;
    gamePattern=[];
    isLevelStarted=false;
}

//Animation for when clicking a colour
const animatePress = (currentColor) => {
    $(`.${currentColor}`).addClass('pressed')
    setTimeout(() => {
        $(`.${currentColor}`).removeClass('pressed')
    },100)
}

//sound for when a color gets clicked or when it is being selected by the script
const playSound = (name) => {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
};

//sound for when the game is over
const gameOver_sound = () => {
    let audio = new Audio('./sounds/wrong.mp3')
    audio.play();
}