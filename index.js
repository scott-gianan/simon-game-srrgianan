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

    // console.log(userChosenColor);
    // console.log(userClickedPattern);
})

$(document).keypress(() => {
    if(!isLevelStarted){
        nextSequence();
        $('#level-title').text(`Level: ${level}`)
    }
})

const playSound = (name) => {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
};

const nextSequence = () => {
    level++;
    $('#level-title').text(`Level: ${level}`);

   let randomNumber = Math.round(Math.random()*3);
   let randomChosenColor = buttonColors[randomNumber];

   gamePattern.push(randomChosenColor);
   $(`#${randomChosenColor}`).fadeOut(500).fadeIn(500);
   playSound(randomChosenColor);

};

const animatePress = (currentColor) => {
    $(`.${currentColor}`).addClass('pressed')
    setTimeout(() => {
        $(`.${currentColor}`).removeClass('pressed')
    },100)
}

const checkAnswer = (currentLevel) => {

}

