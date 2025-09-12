const STORAGE = {
  NOTES: 'lab1:notes',
  SAVED_AT: 'lab1:lastSavedAt',
  RETRIEVED_AT: 'lab1:lastRetrievedAt'
};

const Storage = {
  getNotes() {
    try {
      const raw = localStorage.getItem(STORAGE.NOTES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },
  saveNotes(arr) {
    localStorage.setItem(STORAGE.NOTES, JSON.stringify(arr));
    localStorage.setItem(STORAGE.SAVED_AT, new Date().toISOString());
  },
  getSavedAt() { return localStorage.getItem(STORAGE.SAVED_AT); },
  setRetrievedNow() { localStorage.setItem(STORAGE.RETRIEVED_AT, new Date().toISOString()); },
  getRetrievedAt() { return localStorage.getItem(STORAGE.RETRIEVED_AT); }
};

function nowHMS() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
