class LayoutManager{
    constructor(){
        this.buttonContainer = document.querySelector('.button-container');
    }

    addButton(button){
        this.buttonContainer.appendChild(button.buttonElement);
    }
}