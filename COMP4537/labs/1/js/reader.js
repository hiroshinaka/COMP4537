import {Clock} from './clock.js';
import {Note} from './note.js';
import {NotesRepository} from './storage.js';
/* Disclosure: Portions of this educational lab were assisted by ChatGPT.*/
class ReaderApp {
  constructor() {
    this.repo = new NotesRepository();

    this.container = document.getElementById("readNotes");
    this.backBtn = document.getElementById("backBtn");
    this.lastUpdated = document.getElementById("lastUpdated");
    this.backBtn.textContent = window.MSG.BTN_BACK;

    
    this.render = this.render.bind(this);
    this.render();

    // Poll every 2s
    this.timer = setInterval(this.render, 2000);

    // React instantly to writer changes in another tab
    window.addEventListener("storage", (e) => {
      if (e.key === NotesRepository.key()) this.render();
    });
  }

  render() {
    const arr = this.repo.load().map(Note.from);
    this.container.innerHTML = "";
      for (const n of arr) {
        const div = document.createElement("div");
        div.className = "read-note";
        div.textContent = n.text;
        this.container.appendChild(div);
      }  
    this.lastUpdated.textContent = `${window.MSG.LABEL_RETRIEVED_AT}: ${Clock.formatTime(new Date())}`;
  }
}

new ReaderApp();