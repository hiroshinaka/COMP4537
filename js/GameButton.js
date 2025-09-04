class GameButton{
    constructor(id, onClick){
        this.id = id;
        this.isClickable = false;

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
    randomColor(){
        const h = Math.floor(Math.random() * 360);
        return `hsl(${h}, 70%, 50%)`;
    }
    setClickable(isClickable){
        this.isClickable = isClickable;
        this.buttonElement.style.pointerEvents = isClickable ? "auto" : "none";
    }

    hideText(){
        this.buttonElement.textContent = "";
    }
    showText(){
        this.buttonElement.textContent = this.id;
    }
    moveTo(x,y){
        this.buttonElement.style.left = `${x}px`;
        this.buttonElement.style.top = `${y}px`;
        this.buttonElement.style.position = "fixed";
    }
}