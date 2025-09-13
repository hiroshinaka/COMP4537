document.addEventListener("DOMContentLoaded", () => {
  const writer = document.querySelector('a[href="./writer.html"]');
  const reader = document.querySelector('a[href="./reader.html"]');
  if(writer) {
    writer.textContent = window.MSG.BTN_WRITER;
  }
  if(reader) {
    reader.textContent = window.MSG.BTN_READER;
  }
});
