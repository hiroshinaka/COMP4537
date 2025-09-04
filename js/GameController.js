const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
class GameController{
    constructor(ui) {
        this.ui = ui;
        this.layout = new LayoutManager();   
        
        this.state = "idle";
        this.buttons = [];
        this.n = 0;
        this.nextIndex = 0;
        this.expected = [];
 
        this.ui.onGo((n) => this.start(n));
    }

    async start(n) {
        this.ui.clearGameArea();
        this.buttons = [];
        this.n = n;
        this.nextIndex = 0;
        this.expected = Array.from({ length: n }, (_, i) => i + 1);
        this.updateGameState("showing");

        // create n buttons in a row (initial layout)
        this.addButton(n);

        this.ui.showMessage("Memorize the order…");
        this.updateGameState("pausing");

        await this.pause(n);
        await this.scrambling(n);
        this.enableAnswering();

    }
    updateGameState(newState){
        this.state = newState
    }

    addButton(n){
        for(let i = 0; i < n; i++){
            const btn = new GameButton(i + 1, (tile) => this.handleClick(tile));
            this.ui.gameContainer.appendChild(btn.buttonElement);
            btn.buttonElement.style.display = "inline-block";
            this.buttons.push(btn)
        }
    }

    async pause(n){
        await sleep(n * 1000);
    }

    async scrambling(n){
        this.updateGameState("scrambling");
        const { w: btnW, h: btnH } = this.layout.measure(this.buttons[0].buttonElement);
        for(let k = 0; k < n; k++){
            this.ui.showMessage(`Scrambling ${k}/${n}...`);
            this.layout.scramble(this.buttons, btnW, btnH);
        if (k < n){
            await sleep(2000);
        }
        }
    }

    enableAnswering(){
        this.updateGameState("answering");
        for (const b of this.buttons) {
            b.hideText();
            b.setClickable(true);
        }
    this.ui.showMessage("Now click the buttons in the original order.");
    }


    
    handleClick(tile) {
        if (this.state !== "answering") return;
        const need = this.expected[this.nextIndex];
        if (tile.id === need) {
        tile.showText();
        tile.setClickable(false);
        this.nextIndex++;
        if (this.nextIndex === this.n) {
            this.end(true);
        }
        } else {
        // wrong: reveal all and end
        for (const b of this.buttons) {
            b.showText();
            b.setClickable(false);
        }
        this.end(false);
        }
    }

    end(success) {
        this.state = "ended";
        this.ui.showMessage(success ? "Excellent memory!" : "Wrong order!");
    }

}
