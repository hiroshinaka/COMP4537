class WriterApp{
    constructor(opts) {
    this.container = opts.container;
    this.savedBadge = opts.savedBadge;
    this.addBtn = opts.addBtn;
    this.storage = opts.storage ?? new Storage();

    this.notes = [];
    this.views = new Map(); // id -> NoteView
    this.autosaveTimer = null;
    this.dirty = false;

    // Bind handlers once
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  init() {
    // Load existing notes and render
    this.notes = this.storage.getNotes();
    this.renderAll();

    // Hook UI
    this.addBtn.addEventListener('click', this.handleAdd);

    // Start autosave every 2 seconds (only if dirty)
    this.startAutosave();

    // Show current saved time if exists
    this.refreshSavedBadge();
  }
  renderAll(){
    this.container.innerHTML = '';
    this.views.clear();
    this.notes.forEach(note => this.renderNote(note));
  }

  renderOne(note){
    const view = new NoteView(note, {
      onRemove: this.handleRemove,
      onInput: this.handleInput
    });
    view.mount(this.container);
    this.views.set(note.id, view);
  }

  handleAdd(){
    const note = Note.createNew();
    this.notes.push(note);
    this.renderOne(note);
    this.dirty = true;
  }
  
  handleRemove(id){
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx >= 0){
      this.note.splice(idx, 1);
  }

  const view = this.views.get(id);
    if(view){
      view.unmount();
      this.views.delete(id);
    }
    this.saveNow();
  }

  handleInput(id, text){
    const note = this.notes.find(n => n.id === id);
    if(note){
      note.setText = text;
      this.dirty = true;
    }
  }
  
  startAutosave(){
    if (this.autosaveTimer){
      clearInterval(this.autosaveTimer);
    }
    this.autosaveTimer = setInterval(() => {
      if (this.dirty){
        this.saveNow();
      }
    }, 2000);
  }

  saveNow(){
    const iso = this.storage.saveNotes(this.notes);
    this.dirty = false;
    this.updateSavedBadgeFromISO(iso);
  }

  
  refreshSavedBadge() {
    const iso = this.storage.getSavedAt();
    if (iso) this.updateSavedBadgeFromISO(iso);
  }

  updateSavedBadgeFromISO(iso) {
    // Display HH:MM:SS (you can add date if you want)
    const d = new Date(iso);
    const hms = `${Clock.pad(d.getHours())}:${Clock.pad(d.getMinutes())}:${Clock.pad(d.getSeconds())}`;
    this.savedBadge.textContent = `Saved at ${hms}`;
    this.savedBadge.style.display = 'block';
  }



}
