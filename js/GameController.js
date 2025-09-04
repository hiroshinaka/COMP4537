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
        this.runId = 0;
        this.ui.onGo((n) => this.start(n));
    }

    restart(){
        this.buttons = [];
        this.nextIndex = 0;
        this.expected = [];
        this.ui.clearGameArea();
        this.state = "idle";
    }

    async start(n) {
        this.runId++;
        const runId = this.runId;
        try{
            this.restart()
            this.expected = Array.from({ length: n }, (_, i) => i + 1);
            this.updateGameState("showing");
            if (runId !== this.runId) return;
            // create n buttons in a row (initial layout)
            this.addButton(n);

            this.ui.showMessage("Memorize the order…");
            this.updateGameState("pausing");
            if (runId !== this.runId) return;

            await this.pause(n);
            await this.scrambling(n);

            if (runId !== this.runId) return;
            this.enableAnswering();
            if (runId !== this.runId) return;
        }
        finally{

        }

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
