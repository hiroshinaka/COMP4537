const app = new WriterApp({
  container:  document.getElementById('notesContainer'),
  savedBadge: document.getElementById('savedBadge'),
  addBtn:     document.getElementById('addBtn')
});
app.init();