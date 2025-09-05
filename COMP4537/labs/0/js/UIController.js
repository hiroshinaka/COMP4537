class UIController{
    /**
     * Constructor for the UIController class.
     * Handles all the user interface setup, event listeners and messages.
     * @param {HTMLElement} container - The container element where the ui will be rendered.
     */
    constructor(container){
        //User input label element
        this.label = document.createElement("label");
        this.label.setAttribute("for", "btnCount");
        this.label.classList.add("btn-count-label");
        this.label.textContent = "How many buttons to create? ";

        //User input element
        this.input = document.createElement("input");
        this.input.type = "number";
        this.input.classList.add("button-count");
        this.input.min = 3;
        this.input.max = 7;
        this.input.id = "btnCount";

        //Go! Button element
        this.goButton = document.createElement("button");
        this.goButton.classList.add("create-buttons");
        this.goButton.textContent = "Go!";

        //create and append label, input and go button to the ui container
        this.uicontainer = document.createElement("div");
        this.uicontainer.classList.add("ui-container");
        container.appendChild(this.uicontainer);

        this.uicontainer.appendChild(this.label);
        this.uicontainer.appendChild(this.input);
        this.uicontainer.appendChild(this.goButton);

        //Game area container
        this.gameContainer = document.createElement("div");
        this.gameContainer.classList.add("game-container");
        container.appendChild(this.gameContainer);

        //Message container
        this.messageContainer = document.createElement("div");
        this.messageContainer.classList.add("message-container");
        container.appendChild(this.messageContainer);

        //Message controller to handle messages
        this.messages = new MessageController(this.messageContainer);

        //Event handler for the Go button
        this._onGo = null;

        
        this.goButton.addEventListener("click", () => {
            const n = parseInt(this.input.value, 10);
            if (!Number.isInteger(n) || n < 3 || n > 7) {
                this.messages.show("error");
                return;
            }
            this.messages.show("starting", n);
            if (typeof this._onGo === "function") {
                this._onGo(n);
            }
            });
        }


        /**
         * Sets the event handler for the Go button.
         * @param {function} handler - The function to be called when the Go button is clicked.
         * The handler will receive the user input as an argument.
         */
        
        onGo(handler) {
            this._onGo = handler; 
        }

        /**
         * Clears the game area by removing all of its elements
         */
        clearGameArea() {
            this.gameContainer.innerHTML = "";
        }


    }