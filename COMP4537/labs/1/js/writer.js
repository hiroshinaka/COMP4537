import { Clock} from "./clock.js";
import { Note } from "./note.js";
import { NotesRepository } from "./storage.js";
import { NoteView } from "./noteView.js";
/* Disclosure: Portions of this educational lab were assisted by ChatGPT.*/
class WriterApp {
  constructor() {
    // DOM
    this.notesContainer = document.getElementById("notesContainer");
    this.addBtn = document.getElementById("addNoteBtn");
    this.backBtn = document.getElementById("backBtn");
    this.savedAt = document.getElementById("lastSaved");

    // Labels
    this.addBtn.textContent = window.MSG.BTN_ADD_NOTE;
    this.backBtn.textContent = window.MSG.BTN_BACK;

    // State
    this.repo = new NotesRepository();
    this.notes = [];
    this.dirty = false;

    // Events
    this.addBtn.addEventListener("click", () => this.addNote(""));

    this.init();
    this.startAutoSave();
  }


/**
 * Initializes the application by loading plain note data from storage, 
 * normalizing storage, rendering all notes, and resetting the "last saved at" timestamp.
 */
  init() {
    // load plain data 
    this.notes = this.repo.load().map(Note.from);
    // immediately normalize storage
    this.repo.save(this.notes.map(n => n.toPlain()));
    this.renderAll();
    this.savedAt.textContent = "";
  }

/**
 * Starts an interval to automatically save the notes to storage every 2 seconds.
 * If the notes are not dirty (i.e. they have not been modified since the last save), does nothing.
 * Otherwise, sets the save status to "Saving...", saves the notes to storage, and resets the "last saved at" timestamp.
 */
  startAutoSave() {
    setInterval(() => {
      if (!this.dirty) return;
      this.repo.save(this.notes.map(n => n.toPlain()));
      this.savedAt.textContent = `${window.MSG.LABEL_SAVED_AT}: ${Clock.formatTime(new Date())}`;
      this.dirty = false;
    }, 2000);
  }


/**
 * Adds a new note to the notes list and renders it.
 * @param {string} text - The text of the note to add.
 * If no text is provided, an empty note is added.
 */
  addNote(text = "") {
    const note = new Note(crypto.randomUUID(), text);
    this.notes.push(note);
    this.renderAll();
    this.dirty = true;
  }

/**
 * Removes a note from the notes list and triggers a re-render of all notes.
 * Saves the updated notes list to storage immediately.
 * @param {Note} note - The note to remove.
 */
  removeNote(note) {
    this.notes = this.notes.filter(x => x.id !== note.id);
    // immediate save required by spec
    this.repo.save(this.notes.map(n => n.toPlain()));
    this.savedAt.textContent = `${window.MSG.LABEL_SAVED_AT}: ${Clock.formatTime(new Date())}`;
    this.renderAll();
  }


/**
 * Renders all notes in the notes list in the notes container.
 * When a note is updated or removed, triggers a re-render of all notes.
 */
  renderAll() {
    this.notesContainer.innerHTML = "";
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

