class GameButton{
    /**
     * Creates a new GameButton.
     * @param {number} id - The id of the button.
     * @param {function} onClick - The function to be called when the button is clicked.
     */
    constructor(id, onClick){
        this.id = id;
        this.isClickable = false;

        //Button element and styles
        this.buttonElement = document.createElement("button");
        this.buttonElement.style.width = "10em";
        this.buttonElement.style.height = "5em";
        this.buttonElement.style.display = "inline-block";
        this.buttonElement.style.backgroundColor = this.randomColor();

        this.buttonElement.textContent = id;
        this.buttonElement.addEventListener("click", () => {
            if (this.isClickable && typeof onClick === "function") onClick(this);
        });
    }

    /**
     * Returns a random color as a string in HSL format.
     * The saturation and lightness are fixed at 50% and 50% respectively.
     * @returns {string} A random color as a string in HSL format.
     */
    randomColor(){
        const h = Math.floor(Math.random() * 360);
        return `hsl(${h}, 50%, 50%)`;
    }

    /**
     * Sets the button's clickability.
     * @param {boolean} isClickable - Whether the button is clickable or not.
     */
    setClickable(isClickable){
        this.isClickable = isClickable;
        this.buttonElement.style.pointerEvents = isClickable ? "auto" : "none";
    }

    /**
     * Hides the text on the button.
     */
    hideText(){
        this.buttonElement.textContent = "";
    }

    
    /**
     * Shows the text on the button.
     */
    showText(){
        this.buttonElement.textContent = this.id;
    }

    
    /**
     * Moves the button to the given coordinates (x, y) and sets its position to fixed.
     * @param {number} x - The x coordinate of the button.
     * @param {number} y - The y coordinate of the button.
     */
    moveTo(x,y){
        this.buttonElement.style.left = `${x}px`;
        this.buttonElement.style.top = `${y}px`;
        this.buttonElement.style.position = "fixed";
    }
}