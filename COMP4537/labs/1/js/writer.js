const notesContainer = document.getElementById('notes');
const addBtn = document.getElementById('btn-add');
const savedBadge = document.getElementById('saved-badge');
const backBtn = document.getElementById('btn-back');

// i18n text
document.addEventListener('DOMContentLoaded', () => {
  addBtn.textContent = MSG.ADD_NOTE;
  backBtn.textContent = MSG.BACK;
});

let notes = []; // array of Note instances

function loadNotes() {
  const data = Storage.getNotes();
  notes = data.map(n => {
    const note = new Note(n.id, n.text);
    wire(note);
    note.mount(notesContainer);
    return note;
  });
}

function wire(note) {
  note.onRemove = (n) => {
    notes = notes.filter(x => x !== n);
    saveNow(); // immediate save on remove
  };
  note.onChange = () => {
    // we rely on autosave every 2s; no immediate save on each keystroke
  };
}

function addNote() {
  const n = new Note(Date.now().toString(), "");
  wire(n);
  notes.push(n);
  n.mount(notesContainer);
}

function saveNow() {
  const payload = notes.map(n => n.toJSON());
  Storage.saveNotes(payload);
  savedBadge.textContent = `${MSG.SAVED_AT} ${nowHMS()}`;
}

addBtn.addEventListener('click', addNote);

// initial load
loadNotes();
saveNow(); // establish initial timestamp

// autosave every 2s
setInterval(saveNow, 2000);
