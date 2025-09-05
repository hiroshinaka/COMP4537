class UIController{
    constructor(container){

        this.label = document.createElement("label");
        this.label.setAttribute("for", "btnCount");
        this.label.classList.add("btn-count-label");
        this.label.textContent = "How many buttons to create? ";

        this.input = document.createElement("input");
        this.input.type = "number";
        this.input.classList.add("button-count");
        this.input.min = 3;
        this.input.max = 7;
        this.input.id = "btnCount";

        this.goButton = document.createElement("button");
        this.goButton.classList.add("create-buttons");
        this.goButton.textContent = "Go!";

        this.uicontainer = document.createElement("div");
        this.uicontainer.classList.add("ui-container");
        container.appendChild(this.uicontainer);

        this.uicontainer.appendChild(this.label);
        this.uicontainer.appendChild(this.input);
        this.uicontainer.appendChild(this.goButton);

        this.gameContainer = document.createElement("div");
        this.gameContainer.classList.add("game-container");
        container.appendChild(this.gameContainer);

        this.messageContainer = document.createElement("div");
        this.messageContainer.classList.add("message-container");
        container.appendChild(this.messageContainer);

        this.messages = new MessageController(this.messageContainer);

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


        onGo(handler) {
            this._onGo = handler; 
        }

        showMessage(text) {
            if (this.messageContainer) this.messageContainer.textContent = text;
        }

        clearGameArea() {
            this.gameContainer.innerHTML = "";
        }


    }