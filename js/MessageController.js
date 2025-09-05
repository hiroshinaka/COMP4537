class MessageController {
    constructor(container){
        this.container = container;
    }

    show(key, ...args){
        const msg = MESSAGES[key];
        if (typeof msg === "function"){
            this.container.textContent = msg(...args);
        } else {
            this.container.textContent = msg;
        }
    }

    clear(){
        this.container.textContent = "";
    }
}