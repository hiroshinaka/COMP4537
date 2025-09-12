class NoteView{
    constructor(note, { onRemove, onInput }) {
    this.note = note;
    this.onRemove = onRemove;
    this.onInput = onInput;

    // Elements
    this.root = document.createElement('div');
    this.root.className = 'note-item';
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'note-textarea';
    this.textarea.value = note.text;

    this.removeBtn = document.createElement('button');
    this.removeBtn.className = 'note-remove';
    this.removeBtn.type = 'button';
    this.removeBtn.textContent = 'Remove';

    // Wire events
    this.textarea.addEventListener('input', () => {
      this.onInput(this.note.id, this.textarea.value);
    });
    this.removeBtn.addEventListener('click', () => {
      this.onRemove(this.note.id);
    });

    // Compose
    this.root.appendChild(this.textarea);
    this.root.appendChild(this.removeBtn);
  }

  mount(parent){
    parent.appendChild(this.root);
  }

  unmount(){
    if(this.root.parentNode){
      this.root.parentNode.removeChild(this.root);
    }
  }

}