class StoreApp{
    constructor(){
        let body = document.getElementsByClassName("body");
        body.appendElement("div");
        this.createDefinitionForm();
        this.createAddButton();
    }

    createDefinitionForm(){
        const form = document.createElement("form");
        form.setAttribute("id", "definitionForm");
        document.getElementsByClassName("body").appendChild(form);
        const wordInput = document.createElement("input");
        wordInput.setAttribute("type", "text");
        wordInput.setAttribute("id", "word");
        wordInput.setAttribute("name", "word");
        wordInput.setAttribute("placeholder", "Word");
        form.appendChild(wordInput);
        const definitionInput = document.createElement("input");
        definitionInput.setAttribute("type", "text");
        definitionInput.setAttribute("id", "definition");
        definitionInput.setAttribute("name", "definition");
        definitionInput.setAttribute("placeholder", "Definition");
        form.appendChild(definitionInput);
    }

    createAddButton(){
        const addButton = document.createElement("button");
        addButton.innerHTML = "Add";
        document.getElementsByClassName("body").appendChild(addButton);
        addButton.addEventListener("click", createDefinition);
    }


}


function createDefinition(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("definition").innerHTML =
        this.responseText;
    }
    xhttp.open("POST", "http://localhost:3000/", true);
    xhttp.setTequestHeader("Content-type", "");
    xhttp.send();
}


new StoreApp();