function Note(id, text){
    constructor(id, text);
    this.id = id;
    this.text = text || "";

    this.noteContainer = document.createElement("div");
    this.noteContainer.classList.add("note-container");
    this.noteContainer.id = `note-${id}`;

    this.noteText = document.createElement("p");
    this.noteText.classList.add("note-text");
    this.noteText.textContent = text;
    this.noteContainer.appendChild(this.noteText);

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("note-button-container");
    
    const removeBtn = createRemoveButton(() => {
        this.remove();
    if (typeof this.onRemove === "function") this.onRemove(this);
    });
    this.buttonContainer.appendChild(removeBtn);
    this.noteContainer.appendChild(this.buttonContainer);

}

