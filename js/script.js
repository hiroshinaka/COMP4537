document.addEventListener("DOMContentLoaded", () => {
  const container = document.body; // or a specific div
  const ui = new UIController(container);
  new GameController(ui); // wiring done in constructor via ui.onGo(...)
});