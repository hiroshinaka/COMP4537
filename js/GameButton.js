class GameButton{
    constructor(){
        this.buttonElement = document.createElement("button");
        this.buttonElement.style.width = "10em";
        this.buttonElement.style.height = "5em";
        this.buttonElement.style.position = "absolute";
        this.buttonElement.style.display = "none";
        this.buttonElement.style.backgroundColor = 
        this.isClickable = false;
        document.body.appendChild(this.buttonElement);
    }
    setClickable(isClickable){
        this.isClickable = isClickable;
        this.buttonElement.style.pointerEvents = isClickable ? "auto" : "none";
    }

    hideText(){
        this.buttonElement.textContent = "";
    }
}