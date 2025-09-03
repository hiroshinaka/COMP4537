class GameController{
    constructor(state, n, nextIndex){
        this.state = state
        this.n = n
        this.buttons = []
        this.nextIndex = nextIndex
    }
    updateGameState(newState){
        this.state = newState
    }

    addButton(){
        for(let i = 0; i < this.n; i++){
            const btn = new GameButton(i + 1);
            btn.buttonElement.style.display = "block";
            this.buttons.push(btn)
        }
    }
}
