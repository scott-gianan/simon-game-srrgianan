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
    console.log(userClickedPattern.length-1)
    console.log(userChosenColor);
    console.log(userClickedPattern);
})

$(document).keypress(() => {
    if(!isLevelStarted){
        nextSequence();
        $('#level-title').text(`Level: ${level}`)
        isLevelStarted = true;
    }
})
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

const nextSequence = () => {
    level++;
    $('#level-title').text(`Level: ${level}`);

   let randomNumber = Math.round(Math.random()*3);
   let randomChosenColor = buttonColors[randomNumber];

   gamePattern.push(randomChosenColor);
   $(`#${randomChosenColor}`).fadeOut(500).fadeIn(500);
   playSound(randomChosenColor);

};
//Animation for when clicking a colour
const animatePress = (currentColor) => {
    $(`.${currentColor}`).addClass('pressed')
    setTimeout(() => {
        $(`.${currentColor}`).removeClass('pressed')
    },100)
}

const checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log('success')
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            },1000)
        }
    }

    // if(currentLevel === playerChoice){
    //     console.log('success')
    //     nextSequence();
    // } else {
    //     gameOver();
    //     return (level = 0, userClickedPattern = [], gamePattern=[]);
    // }
}

const gameOver = () => {
    gameOver_sound();
    $('#level-title').text('Game over! Press any key to continue')
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over')
    },250)
}

