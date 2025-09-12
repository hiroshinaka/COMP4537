function createRemoveButton(onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Remove';
  button.className = 'remove-button';
  button.addEventListener('click', onClick);
  return button;
}const notesList = document.getElementById('notes');
const retrievedBadge = document.getElementById('retrieved-badge');
const backBtnR = document.getElementById('btn-back');

document.addEventListener('DOMContentLoaded', () => {
  backBtnR.textContent = MSG.BACK;
});

function render() {
  const arr = Storage.getNotes();
  notesList.innerHTML = '';
  for (const n of arr) {
    const el = document.createElement('article');
    el.className = 'note';
    const ta = document.createElement('textarea');
    ta.value = n.text || '';
    ta.disabled = true;
    el.appendChild(ta);
    notesList.appendChild(el);
  }
  Storage.setRetrievedNow();
  retrievedBadge.textContent = `${MSG.RETRIEVED_AT} ${nowHMS()}`;
}

render(); // initial
setInterval(render, 2000); // poll every 2s

// Live update if another tab writes
window.addEventListener('storage', (e) => {
  if (e.key === 'lab1:notes' || e.key === 'lab1:lastSavedAt') {
    render();
  }
});
