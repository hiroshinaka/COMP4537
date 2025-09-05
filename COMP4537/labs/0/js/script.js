/**
 * AI was used in the development of this project to troubleshoot, generate improvements and debug.
 * Main script to initialize the game.
 * Selects body element to contain the game and ui.
 * Set up ui controller and game controller.
 */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.body; // or a specific div
  const ui = new UIController(container);
  new GameController(ui);
});