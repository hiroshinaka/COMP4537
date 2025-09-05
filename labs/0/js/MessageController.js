class MessageController {
    /**
     * AI was used in the development of this project to troubleshoot, genereate improvements and debug.
     * Constructs a new MessageController
     * @param {Element} container - The container element to hold the messages.
     */
    constructor(container){
        this.container = container;
    }

    /**
     * Display a message in the message container.
     * If the message is a function, it will be called with the given args.
     * @param {string} key - The message key.
     * @param {...*} args - Arguments to be passed to the message function if it is one.
     */
    show(key, ...args){
        const msg = MESSAGES[key];
        if (typeof msg === "function"){
            this.container.textContent = msg(...args);
        } else {
            this.container.textContent = msg;
        }
    }

    /**
     * Clear the message container.
     */
    clear(){
        this.container.textContent = "";
    }
}