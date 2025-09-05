const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class GameController{
    /**
     * AI was used in the development of this project to troubleshoot, genereate improvements and debug.
     * Constructor for the GameController class.
     * Handles all the logic of the game, including the states, button management and interactions.
     * @param {UIController} ui - The UIController object to interact with the user interface.
     * The constructor sets the state of the game to "idle", and other properties to their initial values,
     * initializes the LayoutManager,
     * and sets up the event listener for the Go button.
     */
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

    /**
     * Restart the game by clearing the game area, reseting the state, nextIndex, expected and buttons.
     * This method is called when the game is over or when user clicks the Go button when the current game is still running.
     */
    restart(){
        this.buttons = [];
        this.nextIndex = 0;
        this.expected = [];
        this.ui.clearGameArea();
        this.state = "idle";
    }

    
    /**
     * Start a new game with n buttons from user input
     * This method is called when user clicks the Go button from the UIController.
     * It clears the game area by running restart method
     * It then shows the buttons, waits n seconds, scrambles the buttons, waits 2n seconds, and finally enables the buttons for user to answer.
     * If the user clicks the Go button when the current game is still running, it will cancel the current game and start a new one.
     * @param {number} n - The number of buttons to show.
     */
    async start(n) {
        this.runId++;
        const runId = this.runId;
        try{
            this.restart()
            this.n = n;
            this.expected = Array.from({ length: n }, (_, i) => i + 1);
            this.updateGameState("showing");
            if (runId !== this.runId) return; //Checks if Go! has been clicked again
            this.addButton(n);

            this.ui.messages.show("showing");
            this.updateGameState("pausing");
            if (runId !== this.runId) return;

            await this.pause(n);
            if (runId !== this.runId) return;

            await this.scrambling(n);
            if (runId !== this.runId) return;

            this.enableAnswering();
            if (runId !== this.runId) return;
        }
        finally{

        }

    }
    /**
     * Updates the state of the game controller
     * @param {string} newState - The new state of the game controller. 
     */
    updateGameState(newState){
        this.state = newState
    }

    /**
     * Adds n number of buttons to the game container.
     * Creates a GameButton for each number from 1 to n, 
     * sets the button's click handler to the handleClick method of the GameController, 
     * appends the buttonElement of each button to the gameContainer of the UIController, 
     * and adds each button to the array of buttons.
     * @param {number} n - The number of buttons to add.
     */
    addButton(n){
        for(let i = 0; i < n; i++){
            const btn = new GameButton(i + 1, (tile) => this.handleClick(tile));
            this.ui.gameContainer.appendChild(btn.buttonElement);
            this.buttons.push(btn)
        }
    }

    /**
     * Waits for n seconds before resolving the promise.
     * @param {number} n - The number of seconds to wait.
     */
    async pause(n){
        await sleep(n * 1000);
    }

    /**
     * Scrambles the buttons n times by calling scramble method of the LayoutManager and waits 2 seconds between each scramble.
     * Updates the state of the game controller to "scrambling" before scrambling and sends the scrambling message to the UIController.
     * @param {number} n - The number of times to scramble the buttons.
     */
    async scrambling(n){
        this.updateGameState("scrambling");
        const { w: btnW, h: btnH } = this.layout.measure(this.buttons[0].buttonElement);
        for(let k = 0; k < n; k++){
            this.ui.messages.show(`Scrambling ${k}/${n}...`);
            this.layout.scramble(this.buttons, btnW, btnH);
        if (k < n){
            await sleep(2000);
        }
        }
    }

    /**
     * Enables answering by hiding the text on all buttons and setting them as clickable.
     * Updates the state of the game controller to "answering" and sends the answering message to the UIController.
     */
    enableAnswering(){
        this.updateGameState("answering");
        for (const b of this.buttons) {
            b.hideText();
            b.setClickable(true);
        }
    this.ui.messages.show("answering");
    }


    

    /**
     * Handles a button click when the game is in the answering state.
     * If the button clicked is the one expected, it shows the text and disables the button,
     * and if all buttons have been answered, it ends the game successfully.
     * If the button clicked is not the one expected, it shows all buttons and ends the game.
     * @param {GameButton} tile - The button that was clicked.
     */
    handleClick(tile) {
        if (this.state !== "answering") return;
        const need = this.expected[this.nextIndex];
        if (tile.id === need) {
            //Correct button clicked
            tile.showText();
            tile.setClickable(false);
            this.nextIndex++;
            if (this.nextIndex === this.n) {
                this.end(true);
         }
        } else {
        //Wrong button clicked, show all
            for (const b of this.buttons) {
                b.showText();
                b.setClickable(false);
            }
        this.end(false);
        }
    }
    
    /**
     * Ends the current game and shows the result message.
     * @param {boolean} success - Whether the game was won or lost.
     */

    end(success) {
        this.state = "ended";
        this.ui.messages.show(success ? "success" : "failure");
    }

}
