// scriptStore.js — renders a simple form and POSTs JSON to APP_CONFIG.API_BASE
class StoreApp {
    constructor() {
        this.container = document.getElementById('app') || document.body;
        this.createDefinitionForm();
        this.createNavbutton();
    }

    createDefinitionForm() {
        const form = document.createElement('form');
        form.id = 'definitionForm';
        this.container.appendChild(form);

        const wordInput = document.createElement('input');
        wordInput.type = 'text';
        wordInput.id = 'word';
        wordInput.name = 'word';
        wordInput.pattern = "[A-Za-z]";
        wordInput.placeholder = (typeof msgs !== 'undefined' && msgs.enter_word) ? msgs.enter_word : 'Word';
        form.appendChild(wordInput);

        const definitionInput = document.createElement('input');
        definitionInput.type = 'text';
        definitionInput.id = 'definitionInput';
        definitionInput.name = 'definition';
        definitionInput.placeholder = (typeof msgs !== 'undefined' && msgs.enter_definition) ? msgs.enter_definition : 'Definition';
        form.appendChild(definitionInput);

        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.textContent = (typeof msgs !== 'undefined' && msgs.add_button) ? msgs.add_button : 'Add';
        form.appendChild(addButton);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createDefinition();
        });
    }
    createNavbutton(){
        const navButton = document.createElement("button");
        navButton.textContent = "Go to Search Page";
        navButton.setAttribute("id", "navButton");
        this.container.appendChild(navButton);
        navButton.addEventListener('click', () => window.location.href = "search.html");
    }

    async createDefinition() {
        const word = document.getElementById('word').value.toLowerCase().trim();
        const definition = document.getElementById('definitionInput').value.toLowerCase().trim();

        if (!word || !definition) {
            alert((typeof msgs !== 'undefined' && msgs.both_required) ? msgs.both_required : "Both 'word' and 'definition' are required.");
            return;
        }

        const url = window.APP_CONFIG.API_BASE;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'
                 },
                body: JSON.stringify({ word, definition })
            });

            if (res.ok) {
                const payload = await res.json();
                alert('Added: ' + payload.data.word);
            } else {
                const err = await res.json().catch(() => ({}));
                alert('Error: ' + (err.error || res.status));
            }
        } catch (err) {
            console.error(err);
            alert('Network error');
        }
    }
}

new StoreApp();
