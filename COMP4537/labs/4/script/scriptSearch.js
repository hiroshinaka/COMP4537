class SearchApp{
    constructor(){
        let body = document.getElementsByClassName("body");
        body.appendElement("div");
        this.createSearchBox();
        this.createSearchButton();
        this.createDefinitionBox();
    }

    createSearchBox(){
        const searchBox = document.createElement("input");
        searchBox.setAttribute("type", "text");
        searchBox.setAttribute("placeholder", "Search...");
        document.getElementsByClassName("body").appendChild(searchBox);
    }
    createSearchButton(){
        const searchButton = document.createElement("button");
        searchButton.innerHTML = "Search";
        document.getElementsByClassName("body").appendChild(searchButton);
    }
    createDefinitionBox(){
        const definition = document.createElement("div");
        definition.setAttribute("id", "definition");
        document.getElementsByClassName("body").appendChild(definition);
    }
}

new SearchApp();