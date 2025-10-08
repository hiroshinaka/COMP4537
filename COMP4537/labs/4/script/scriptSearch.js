class SearchApp {
    constructor(){
        // attach to #app if present, otherwise body
        this.container = document.getElementById('app');
        this.createSearchBox();
        this.createSearchButton();
        this.createDefinitionBox();
    }

    createSearchBox(){
        this.searchBox = document.createElement("input");
        this.searchBox.setAttribute("type", "text");
        this.searchBox.setAttribute("placeholder", msgs.searchBox);
        this.container.appendChild(this.searchBox);
    }

    createSearchButton(){
        const searchButton = document.createElement("button");
        this.container.appendChild(searchButton);
        searchButton.addEventListener('click', () => this.doSearch());
    }

    createDefinitionBox(){
        this.definition = document.createElement("div");
        this.definition.setAttribute("id", "definition");
        this.container.appendChild(this.definition);
    }

    async doSearch(){
        const q = this.searchBox.value.trim();
        if (!q) {
            this.definition.textContent = (typeof msgs !== 'undefined' && msgs.enter_word) ? msgs.enter_word : 'Please enter a word';
            return;
        }

        const base = (window.APP_CONFIG && window.APP_CONFIG.API_BASE) ? window.APP_CONFIG.API_BASE : '/api/definitions/';
        const url = `${base}?word=${encodeURIComponent(q)}`;
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                this.definition.textContent = data.definition || JSON.stringify(data);
            } else if (res.status === 404) {
                this.definition.textContent = (typeof msgs !== 'undefined' && msgs.word_not_found) ? msgs.word_not_found : 'Not found';
            } else {
                this.definition.textContent = 'Error: ' + res.status;
            }
        } catch (err) {
            this.definition.textContent = 'Network error';
            console.error(err);
        }
    }
}

new SearchApp();
