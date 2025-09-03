const buttonContainer = document.querySelector('.button-container');
const goButton = document.querySelector('.create-buttons');
const countInput = document.querySelector('#btnCount');

//Value for number of buttons to create
let storedValue = 0

goButton.addEventListener('click', ()=> {
    const storedValue = parseInt(countInput.value, 10);

    if(storedValue < 3 || storedValue > 7){
        console.log("Invalid number")
        return;
    }
    console.log(`Number of buttons stored: ${storedValue}`);
    let game = new GameController('initial', storedValue);
    game.addButton();
})