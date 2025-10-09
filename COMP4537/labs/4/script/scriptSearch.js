class SearchApp {
    constructor(){
        // attach to #app if present, otherwise body
        this.container = document.getElementById('app');
        this.createSearchBox();
        this.createSearchButton();
        this.createDefinitionBox();
        this.createNavbutton();
    }

    createSearchBox(){
        this.searchBox = document.createElement("input");
        this.searchBox.setAttribute("type", "text");
        this.searchBox.setAttribute("placeholder", msgs.search_word);
        this.container.appendChild(this.searchBox);
    }

    createSearchButton(){
        const searchButton = document.createElement("button");
        searchButton.textContent = msgs.search_button;
        searchButton.setAttribute("id", "searchButton");
        this.container.appendChild(searchButton);
        searchButton.addEventListener('click', () => this.doSearch());
    }

    createDefinitionBox(){
        this.definition = document.createElement("div");
        this.definition.setAttribute("id", "definition");
        this.container.appendChild(this.definition);
    }

    createNavbutton(){
        const navButton = document.createElement("button");
        navButton.textContent = "Go to Store Page";
        navButton.setAttribute("id", "navButton");
        this.container.appendChild(navButton);
        navButton.addEventListener('click', () => window.location.href = "store.html");
    }

    async doSearch(){
        const q = this.searchBox.value.toLowerCase().trim();
        if (!q) {
            this.definition.textContent = msgs.enter_word;
            return;
        }

        const base = window.APP_CONFIG.API_BASE;
        const url = `${base}?word=${encodeURIComponent(q)}`;
        try {
            const res = await fetch(url);
            if (res.ok) {
                const payload = await res.json();

                const word = document.createElement("h2");
                word.textContent = payload.data.word || q;
                this.definition.innerHTML = '';
                this.definition.appendChild(word);

                const def = document.createElement("p");
                def.textContent = payload.data.definition;
                this.definition.appendChild(def);

            } else if (res.status === 404) {
                this.definition.textContent = msgs.word_not_found;
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
