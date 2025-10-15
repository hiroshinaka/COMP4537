import { connection} from './dbconnection.js';
class App {
    constructor() {
        this.container = document.querySelector('.main');
        this.title = document.createElement('h1');
        this.title.textContent = msgs.title;
        this.container.appendChild(this.title);
        this.createQueryInput();
        this.createQueryButton();
        this.createDisplayArea();
    }

    createQueryInput(){
        this.queryInput = document.createElement('input');
        this.queryInput.setAttribute('type', 'text');
        this.queryInput.setAttribute('placeholder', msgs.query_input_placeholder);
        this.container.appendChild(this.queryInput);
    }
    createQueryButton(){
        this.queryButton = document.createElement('button');
        this.queryButton.textContent = msgs.btn_msg;
        this.container.appendChild(this.queryButton);
        this.queryButton.addEventListener('click', async () => this.runQuery(this.queryInput.value)); 
    }

    createDisplayArea(){
        this.displayArea = document.createElement('div');
        this.displayArea.setAttribute('id', 'display-area');
        this.container.appendChild(this.displayArea);
    }


    async runQuery(query){
        const result = await connection.query(query);
        this.displayArea.textContent = result;
    }


}

new App();