import { Clock} from "./clock.js";
import { Note } from "./note.js";
import { NotesRepository } from "./storage.js";
import { NoteView } from "./noteView.js";

class WriterApp {
  constructor() {
    // DOM
    this.notesContainer = document.getElementById("notesContainer");
    this.addBtn = document.getElementById("addNoteBtn");
    this.backBtn = document.getElementById("backBtn");
    this.savedAt = document.getElementById("lastSaved");
    this.saveStatus = document.getElementById("saveStatus");

    // Labels
    this.addBtn.textContent = window.MSG.BTN_ADD_NOTE;
    this.backBtn.textContent = window.MSG.BTN_BACK;

    // State
    this.repo = new NotesRepository();
    this.notes = [];
    this.dirty = false;

    // Events
    this.addBtn.addEventListener("click", () => this.addNote(""));
    window.addEventListener("beforeunload", () => this.maybeSave());


    this.init();
    this.startAutoSave();
  }


  setStatusSaving() { 
    this.saveStatus.textContent = window.MSG.STATUS_SAVING; 
  }


  init() {
    // load plain data 
    this.notes = this.repo.load().map(Note.from);
    // immediately normalize storage
    this.repo.save(this.notes.map(n => n.toPlain()));
    this.renderAll();
    this.savedAt.textContent = "";
  }

  startAutoSave() {
    setInterval(() => {
      if (!this.dirty) return;
      this.setStatusSaving();
      this.repo.save(this.notes.map(n => n.toPlain()));
      this.savedAt.textContent = `${window.MSG.LABEL_SAVED_AT}: ${Clock.formatTime(new Date())}`;
      this.dirty = false;
    }, 2000);
  }

  maybeSave() {
    if (this.dirty) {
      this.repo.save(this.notes.map(n => n.toPlain()));
    }
  }


  addNote(text = "") {
    const note = new Note(crypto.randomUUID(), text);
    this.notes.push(note);
    this.renderAll();
    this.dirty = true;
  }

  removeNote(note) {
    this.notes = this.notes.filter(x => x.id !== note.id);
    // immediate save required by spec
    this.setStatusSaving();
    this.repo.save(this.notes.map(n => n.toPlain()));
    this.savedAt.textContent = `${window.MSG.LABEL_SAVED_AT}: ${Clock.formatTime(new Date())}`;
    this.renderAll();
  }


  renderAll() {
    this.notesContainer.innerHTML = "";
    if (this.notes.length === 0) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = window.MSG.EMPTY_STATE;
      this.notesContainer.appendChild(empty);
      return;
    }
    this.notes.forEach(n => {
      const view = new NoteView(n, {
        onChange: () => { this.dirty = true; },
        onRemove: (note) => this.removeNote(note)
      });
      this.notesContainer.appendChild(view.render());
    });
  }
}

new WriterApp();

