document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('title').textContent = MSG.TITLE;
  document.getElementById('label-writer').textContent = MSG.WRITER_LABEL;
  document.getElementById('label-reader').textContent = MSG.READER_LABEL;
  document.getElementById('btn-writer').textContent = MSG.WRITER_BUTTON;
  document.getElementById('btn-reader').textContent = MSG.READER_BUTTON;

  document.getElementById('btn-writer').onclick = () => location.href = './writer.html';
  document.getElementById('btn-reader').onclick = () => location.href = './reader.html';
});
